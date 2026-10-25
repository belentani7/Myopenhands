import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SafeStorage } from '../src/utils/safeStorage.ts';

function withStorage(initial: Record<string, string>, fn: (values: Map<string, string>) => void) {
  const values = new Map(Object.entries(initial));
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const oldStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {} });
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => { values.set(key, value); },
    },
  });
  try {
    fn(values);
  } finally {
    for (const key of Object.keys(initial)) SafeStorage.allowOverwriteAfterUserConfirmation(key);
    if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow);
    else Reflect.deleteProperty(globalThis, 'window');
    if (oldStorage) Object.defineProperty(globalThis, 'localStorage', oldStorage);
    else Reflect.deleteProperty(globalThis, 'localStorage');
  }
}

describe('SafeStorage never destroys invalid local records on read', () => {
  it('preserves malformed CV JSON even when the app attempts to persist fallback', () => {
    withStorage({ ma_cv: '{PRIVATE_BROKEN_CV' }, (values) => {
      const fallback = { fullName: '', experience: [] };
      const result = SafeStorage.getJSON('ma_cv', fallback);
      assert.deepEqual(result.data, fallback);
      assert.equal(result.repaired, false);
      assert.equal(SafeStorage.setJSON('ma_cv', fallback), false);
      assert.equal(values.get('ma_cv'), '{PRIVATE_BROKEN_CV');
    });
  });

  it('preserves schema-invalid progress rather than rewriting user history', () => {
    const original = '{"totalXP":"not a number","completedLessons":[]}';
    withStorage({ ma_progress: original }, (values) => {
      const fallback = { totalXP: 0, completedLessons: [] };
      const result = SafeStorage.getJSON('ma_progress', fallback,
        (val) => typeof val === 'object' && val !== null &&
          typeof (val as { totalXP?: unknown }).totalXP === 'number');
      assert.deepEqual(result.data, fallback);
      assert.equal(SafeStorage.setJSON('ma_progress', fallback), false);
      assert.equal(values.get('ma_progress'), original);
    });
  });

  it('permits replacement only after explicit user confirmation', () => {
    withStorage({ ma_apts: '{invalid' }, (values) => {
      SafeStorage.getJSON('ma_apts', []);
      assert.equal(SafeStorage.setJSON('ma_apts', []), false);
      SafeStorage.allowOverwriteAfterUserConfirmation('ma_apts');
      assert.equal(SafeStorage.setJSON('ma_apts', []), true);
      assert.equal(values.get('ma_apts'), '[]');
    });
  });

  it('does not block valid records or newly initialized storage', () => {
    withStorage({ ma_saved_res: '["res-1"]' }, (values) => {
      const valid = SafeStorage.getJSON('ma_saved_res', [], Array.isArray);
      assert.deepEqual(valid.data, ['res-1']);
      assert.equal(SafeStorage.setJSON('ma_saved_res', ['res-2']), true);
      assert.equal(values.get('ma_saved_res'), '["res-2"]');
    });
  });
});
