/**
 * Create an offline, lossless backup of the private browser data that may be
 * affected by a reset. The JSON contains personal information: never upload it.
 * Even malformed values are preserved verbatim so they can be recovered later.
 */
export const LOCAL_DATA_KEYS = ['ma_progress', 'ma_cv', 'ma_apts', 'ma_saved_res'] as const;

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
export function parseLocalDataBackup(text: string): Record<(typeof LOCAL_DATA_KEYS)[number], string | null> {
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
  const restored = {} as Record<(typeof LOCAL_DATA_KEYS)[number], string | null>;
  for (const key of LOCAL_DATA_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(entries, key) ||
        (entries[key] !== null && typeof entries[key] !== 'string')) {
      throw new Error('Incomplete or invalid backup entry');
    }
    restored[key] = entries[key] as string | null;
  }
  return restored;
}
