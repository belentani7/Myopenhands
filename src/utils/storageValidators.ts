/** Pure shape guards for private browser records; invalid values stay untouched. */
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function isUserProgressRecord(value: unknown): boolean {
  return isRecord(value) &&
    typeof value.totalXP === 'number' && Number.isFinite(value.totalXP) &&
    Array.isArray(value.completedLessons) &&
    value.completedLessons.every((lesson: unknown) => typeof lesson === 'string');
}

export function isCVRecord(value: unknown): boolean {
  return isRecord(value) && typeof value.fullName === 'string' &&
    Array.isArray(value.experience) && Array.isArray(value.skills);
}
