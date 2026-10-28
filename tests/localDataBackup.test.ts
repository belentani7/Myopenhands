import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildLocalDataBackup, parseLocalDataBackup, LOCAL_DATA_KEYS, applyLocalDataEntries } from '../src/utils/localDataBackup.ts';

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
  it('restores exact raw values including malformed CV JSON', () => {
    const backup = buildLocalDataBackup({ getItem: key => key === 'ma_cv' ? '{broken CV' : null }, '2026-10-25T00:00:00Z');
    const entries = parseLocalDataBackup(backup);
    assert.equal(entries.ma_cv, '{broken CV');
    assert.equal(entries.ma_apts, null);
    assert.deepEqual(Object.keys(entries), [...LOCAL_DATA_KEYS]);
  });

  it('rejects missing, invalid and unsupported backup records', () => {
    const valid = JSON.parse(buildLocalDataBackup({ getItem: () => null }));
    delete valid.entries.ma_cv;
    assert.throws(() => parseLocalDataBackup(JSON.stringify(valid)), /Incomplete/);
    valid.entries.ma_cv = 42;
    assert.throws(() => parseLocalDataBackup(JSON.stringify(valid)), /Incomplete/);
    valid.entries.ma_cv = null;
    valid.version = 99;
    assert.throws(() => parseLocalDataBackup(JSON.stringify(valid)), /Unsupported/);
    assert.throws(() => parseLocalDataBackup('[]'), /Invalid backup/);
  });

});

function memoryStorage(initial: Record<string, string>, fail?: (operation: string, key: string) => void) {
  const values = new Map(Object.entries(initial));
  const storage = {
    getItem(key: string) { fail?.('get', key); return values.get(key) ?? null; },
    setItem(key: string, value: string) { fail?.('set', key); values.set(key, value); },
    removeItem(key: string) { fail?.('remove', key); values.delete(key); },
  };
  return { values, storage };
}

describe('confirmed local import and reset are not silently partial', () => {
  it('restores every raw backup entry including malformed records and null removals', () => {
    const { values, storage } = memoryStorage({ ma_cv: 'old', ma_apts: 'old', ma_progress: 'old' });
    applyLocalDataEntries(storage, { ma_progress: '{new', ma_cv: '{malformed', ma_apts: null, ma_saved_res: '["r"]' });
    assert.deepEqual(Object.fromEntries(values), { ma_cv: '{malformed', ma_progress: '{new', ma_saved_res: '["r"]' });
  });
  it('rolls back earlier writes when a later write exceeds quota', () => {
    const { values, storage } = memoryStorage({ ma_progress: 'original', ma_cv: 'private' }, (op, key) => {
      if (op === 'set' && key === 'ma_cv') throw new Error('QuotaExceededError');
    });
    assert.throws(() => applyLocalDataEntries(storage, { ma_progress: 'new', ma_cv: 'replacement' }), /No se pudo restaurar/);
    assert.equal(values.get('ma_progress'), 'original');
    assert.equal(values.get('ma_cv'), 'private');
  });
  it('does not write anything when any protected key cannot be read', () => {
    let writes = 0;
    const { values, storage } = memoryStorage({ ma_progress: 'private' }, (op, key) => {
      if (op === 'get' && key === 'ma_cv') throw new Error('SecurityError');
      if (op !== 'get') writes++;
    });
    assert.throws(() => applyLocalDataEntries(storage, { ma_progress: 'new', ma_cv: 'new' }), /lectura bloqueada/);
    assert.equal(writes, 0);
    assert.equal(values.get('ma_progress'), 'private');
  });
  it('rejects unrecognized keys and invalid values before touching storage', () => {
    let calls = 0;
    const { storage } = memoryStorage({}, () => { calls++; });
    assert.throws(() => applyLocalDataEntries(storage, { ma_cv: 17 as unknown as string }), /inválida/);
    assert.throws(() => applyLocalDataEntries(storage, { unknown: 'bad' } as never), /inválida/);
    assert.equal(calls, 0);
  });
  it('reports incomplete rollback when browser storage stays unavailable', () => {
    const { values, storage } = memoryStorage({ ma_progress: 'original', ma_cv: 'private' }, (op, key) => {
      if (op === 'set' && key === 'ma_cv') throw new Error('QuotaExceededError');
      if (op === 'set' && key === 'ma_progress' && values.get(key) === 'new') throw new Error('StorageBlocked');
    });
    assert.throws(() => applyLocalDataEntries(storage, { ma_progress: 'new', ma_cv: 'replacement' }), /reversión incompleta/);
    assert.equal(values.get('ma_progress'), 'new');
    assert.equal(values.get('ma_cv'), 'private');
  });
});
