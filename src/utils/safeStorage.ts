/** Browser storage guard: never erase malformed user data during reads. */
export class SafeStorage {
  private static readonly protectedKeys = new Set<string>();
  private static readonly confirmedOverwrites = new Map<string, string | null>();

  static getJSON<T>(key: string, fallback: T, validator?: (val: unknown) => boolean): { data: T; repaired: boolean } {
    if (typeof window === 'undefined') return { data: fallback, repaired: false };
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        this.protectedKeys.delete(key);
        this.confirmedOverwrites.delete(key);
        return { data: fallback, repaired: false };
      }
      const parsed: unknown = JSON.parse(raw);
      if (validator && !validator(parsed)) {
        // Render a safe in-memory view without overwriting the original value.
        this.protectedKeys.add(key);
        this.confirmedOverwrites.delete(key);
        console.warn(`[SafeStorage] Registro inválido en '${key}'; se conserva para recuperación.`);
        return { data: fallback, repaired: false };
      }
      this.protectedKeys.delete(key);
      this.confirmedOverwrites.delete(key);
      return { data: parsed as T, repaired: false };
    } catch {
      // A malformed JSON record or SecurityError must never be auto-erased.
      this.protectedKeys.add(key);
      this.confirmedOverwrites.delete(key);
      console.warn(`[SafeStorage] No se pudo leer '${key}'; se conserva el dato original.`);
      return { data: fallback, repaired: false };
    }
  }

  static hasProtectedData(): boolean {
    return this.protectedKeys.size > 0;
  }

  static allowOverwriteAfterUserConfirmation(key: string): void {
    // Confirmation is only meaningful for a record previously identified as
    // unsafe. The exemption is consumed after one successful write.
    if (!this.protectedKeys.has(key)) return;
    try {
      // Bind the approval to the exact data the user saw. A later change to
      // the same key must not inherit an earlier approval.
      const raw = localStorage.getItem(key);
      this.confirmedOverwrites.set(key, raw);
      this.protectedKeys.delete(key);
    } catch {
      // Keep the record protected if the current value cannot be verified.
    }
  }

  static setJSON(key: string, value: unknown): boolean {
    if (typeof window === 'undefined' || this.protectedKeys.has(key)) return false;
    let serialized: string | undefined;
    try {
      serialized = JSON.stringify(value);
    } catch {
      return false;
    }
    // JSON.stringify(undefined/function) does not produce a JSON document.
    if (typeof serialized !== 'string') return false;

    let current: string | null;
    try {
      current = localStorage.getItem(key);
    } catch {
      // A denied read must never be followed by a blind overwrite.
      return false;
    }
    if (current !== null) {
      try {
        JSON.parse(current);
      } catch {
        if (!this.confirmedOverwrites.has(key) || this.confirmedOverwrites.get(key) !== current) {
          this.confirmedOverwrites.delete(key);
          this.protectedKeys.add(key);
          console.warn(`[SafeStorage] Registro inválido en '${key}'; escritura cancelada.`);
          return false;
        }
      }
    }

    try {
      localStorage.setItem(key, serialized);
      this.confirmedOverwrites.delete(key);
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
