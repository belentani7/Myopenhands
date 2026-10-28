import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isUserProgressRecord, isCVRecord } from '../src/utils/storageValidators.ts';

describe('private record validators', () => {
  it('accepts valid progress and CV records', () => {
    assert.equal(isUserProgressRecord({ totalXP: 42, completedLessons: ['l1'] }), true);
    assert.equal(isCVRecord({ fullName: 'María', experience: [], skills: [] }), true);
  });
  it('rejects null, primitives and arrays without throwing', () => {
    for (const value of [null, undefined, 0, 'text', [], true]) {
      assert.equal(isUserProgressRecord(value), false);
      assert.equal(isCVRecord(value), false);
    }
  });
  it('rejects invalid XP and lesson identifiers', () => {
    assert.equal(isUserProgressRecord({ totalXP: '42', completedLessons: [] }), false);
    assert.equal(isUserProgressRecord({ totalXP: Infinity, completedLessons: [] }), false);
    assert.equal(isUserProgressRecord({ totalXP: 3, completedLessons: [null] }), false);
  });
  it('rejects CV data without a string name or expected arrays', () => {
    assert.equal(isCVRecord({ fullName: 10, experience: [], skills: [] }), false);
    assert.equal(isCVRecord({ fullName: 'M', experience: {}, skills: [] }), false);
    assert.equal(isCVRecord({ fullName: 'M', experience: [], skills: null }), false);
  });
});
