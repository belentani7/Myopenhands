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
