/** Browser storage guard: never erase malformed user data during reads. */
export class SafeStorage {
  private static readonly protectedKeys = new Set<string>();

  static getJSON<T>(key: string, fallback: T, validator?: (val: unknown) => boolean): { data: T; repaired: boolean } {
    if (typeof window === 'undefined') return { data: fallback, repaired: false };
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        this.protectedKeys.delete(key);
        return { data: fallback, repaired: false };
      }
      const parsed: unknown = JSON.parse(raw);
      if (validator && !validator(parsed)) {
        // Render a safe in-memory view without overwriting the original value.
        this.protectedKeys.add(key);
        console.warn(`[SafeStorage] Registro inválido en '${key}'; se conserva para recuperación.`);
        return { data: this.deepRepair(parsed, fallback), repaired: false };
      }
      this.protectedKeys.delete(key);
      return { data: parsed as T, repaired: false };
    } catch {
      // A malformed JSON record or SecurityError must never be auto-erased.
      this.protectedKeys.add(key);
      console.warn(`[SafeStorage] No se pudo leer '${key}'; se conserva el dato original.`);
      return { data: fallback, repaired: false };
    }
  }

  static allowOverwriteAfterUserConfirmation(key: string): void {
    this.protectedKeys.delete(key);
  }

  static setJSON(key: string, value: unknown): boolean {
    if (typeof window === 'undefined' || this.protectedKeys.has(key)) return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      console.warn(`[SafeStorage] No se pudo guardar '${key}'.`);
      return false;
    }
  }

  // Deep merges corrupt or partial object with fallback schema
  static deepRepair<T>(partial: any, fallback: T): T {
    if (partial === null || typeof partial !== 'object') {
      return fallback;
    }
    if (Array.isArray(fallback)) {
      return Array.isArray(partial) ? (partial as unknown as T) : fallback;
    }
    const result: any = { ...fallback };
    for (const key of Object.keys(fallback as any)) {
      if (partial[key] !== undefined && partial[key] !== null) {
        if (typeof (fallback as any)[key] === 'object' && !Array.isArray((fallback as any)[key])) {
          result[key] = this.deepRepair(partial[key], (fallback as any)[key]);
        } else {
          result[key] = partial[key];
        }
      }
    }
    return result as T;
  }
}
