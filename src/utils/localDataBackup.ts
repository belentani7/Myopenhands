/**
 * Create an offline, lossless backup of the private browser data that may be
 * affected by a reset. The JSON contains personal information: never upload it.
 * Even malformed values are preserved verbatim so they can be recovered later.
 */
export const LOCAL_DATA_KEYS = ['ma_progress', 'ma_cv', 'ma_apts', 'ma_saved_res'] as const;
export type LocalDataKey = (typeof LOCAL_DATA_KEYS)[number];

export function buildLocalDataBackup(
  storage: Pick<Storage, 'getItem'>,
  exportedAt = new Date().toISOString(),
): string {
  const entries: Record<string, string | null> = {};
  for (const key of LOCAL_DATA_KEYS) {
    // Deliberately propagate SecurityError / unavailable storage. A reset must
    // never proceed when the backup cannot read every protected key.
    const value = storage.getItem(key);
    if (value !== null && typeof value !== 'string') {
      throw new TypeError(`Invalid storage value for ${key}`);
    }
    entries[key] = value;
  }
  return JSON.stringify({
    format: 'myopenhands-local-data',
    version: 1,
    exportedAt,
    entries,
  }, null, 2);
}

/** Validate an exported local backup without interpreting or losing malformed values. */
export function parseLocalDataBackup(text: string): Record<LocalDataKey, string | null> {
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Invalid backup document');
  }
  const document = parsed as Record<string, unknown>;
  if (document.format !== 'myopenhands-local-data' || document.version !== 1 ||
      typeof document.entries !== 'object' || document.entries === null ||
      Array.isArray(document.entries)) {
    throw new Error('Unsupported local backup format');
  }
  const entries = document.entries as Record<string, unknown>;
  const restored = {} as Record<LocalDataKey, string | null>;
  for (const key of LOCAL_DATA_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(entries, key) ||
        (entries[key] !== null && typeof entries[key] !== 'string')) {
      throw new Error('Incomplete or invalid backup entry');
    }
    restored[key] = entries[key] as string | null;
  }
  return restored;
}

/**
 * Commit a confirmed local import/reset. Pre-read every target before writing,
 * and attempt rollback if a browser storage operation fails partway through.
 * This cannot guarantee rollback when storage itself remains unavailable;
 * callers must keep the user's downloaded backup as the recovery source.
 */
export function applyLocalDataEntries(
  storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>,
  entries: Partial<Record<LocalDataKey | 'ma_lang', string | null>>,
): void {
  const updates = Object.entries(entries);
  const allowed = new Set<string>([...LOCAL_DATA_KEYS, 'ma_lang']);
  if (updates.length === 0) throw new Error('No hay datos para restaurar');
  for (const [key, value] of updates) {
    if (!allowed.has(key) || (value !== null && typeof value !== 'string')) {
      throw new TypeError(`Entrada de almacenamiento inválida: ${key}`);
    }
  }

  const previous = new Map<string, string | null>();
  try {
    for (const [key] of updates) {
      const original = storage.getItem(key);
      if (original !== null && typeof original !== 'string') {
        throw new TypeError(`Valor de almacenamiento inválido: ${key}`);
      }
      previous.set(key, original);
    }
  } catch {
    throw new Error('No se pudo restaurar el almacenamiento: lectura bloqueada');
  }

  const attempted: string[] = [];
  try {
    for (const [key, value] of updates) {
      attempted.push(key);
      if (value === null) storage.removeItem(key);
      else storage.setItem(key, value);
    }
  } catch {
    let rollbackFailed = false;
    for (const key of attempted.reverse()) {
      try {
        const original = previous.get(key) ?? null;
        if (original === null) storage.removeItem(key);
        else storage.setItem(key, original);
      } catch {
        rollbackFailed = true;
      }
    }
    throw new Error(rollbackFailed
      ? 'No se pudo restaurar el almacenamiento: reversión incompleta'
      : 'No se pudo restaurar el almacenamiento');
  }
}
