import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildLocalDataBackup, LOCAL_DATA_KEYS } from '../src/utils/localDataBackup.ts';

describe('local private data backup', () => {
  it('preserves exact CV, appointments and progress without sending or modifying them', () => {
    const values: Record<string, string> = {
      ma_progress: '{"totalXP":72}',
      ma_cv: '{"fullName":"María & João"}',
      ma_apts: '[{"notes":"passport"}]',
      ma_saved_res: '["res-1"]',
    };
    const reads: string[] = [];
    const storage = { getItem: (key: string) => { reads.push(key); return values[key] ?? null; } };
    const result = JSON.parse(buildLocalDataBackup(storage, '2026-10-23T07:00:00.000Z'));
    assert.equal(result.version, 1);
    assert.equal(result.format, 'myopenhands-local-data');
    assert.equal(result.exportedAt, '2026-10-23T07:00:00.000Z');
    assert.deepEqual(reads, [...LOCAL_DATA_KEYS]);
    assert.deepEqual(result.entries, values);
  });

  it('preserves malformed JSON verbatim rather than silently replacing user data', () => {
    const result = JSON.parse(buildLocalDataBackup({ getItem: key => key === 'ma_cv' ? '{invalid' : null }));
    assert.equal(result.entries.ma_cv, '{invalid');
    assert.equal(result.entries.ma_apts, null);
  });

  it('fails closed when browser storage access is blocked', () => {
    assert.throws(() => buildLocalDataBackup({ getItem() { throw new Error('SecurityError'); } }), /SecurityError/);
  });

  it('fails closed for non-string values from an invalid storage adapter', () => {
    assert.throws(() => buildLocalDataBackup({ getItem: () => 42 as unknown as string }), /Invalid storage value/);
  });
});
