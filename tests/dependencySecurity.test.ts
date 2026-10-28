import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));

describe('Vite security baseline and reproducible dependency lock', () => {
  it('pins both declared Vite entries to the patched 6.4.x line', () => {
    assert.equal(pkg.dependencies.vite, '^6.4.5');
    assert.equal(pkg.devDependencies.vite, '^6.4.5');
    assert.equal(lock.packages[''].dependencies.vite, pkg.dependencies.vite);
    assert.equal(lock.packages[''].devDependencies.vite, pkg.devDependencies.vite);
  });

  it('locks a patched Vite release with an integrity digest', () => {
    const vite = lock.packages['node_modules/vite'];
    assert.equal(vite.version, '6.4.5');
    assert.equal(vite.resolved, 'https://registry.npmjs.org/vite/-/vite-6.4.5.tgz');
    assert.match(vite.integrity, /^sha512-[A-Za-z0-9+/]+={0,2}$/);
  });

  it('locks patched body-parser for Express 4 compressed request handling', () => {
    const parser = lock.packages['node_modules/body-parser'];
    assert.equal(parser.version, '1.20.9');
    assert.equal(parser.resolved, 'https://registry.npmjs.org/body-parser/-/body-parser-1.20.9.tgz');
    assert.match(parser.integrity, /^sha512-[A-Za-z0-9+/]+={0,2}$/);
  });

  it('locks qs 6.16.1 to avoid unsafe comma-format coercion', () => {
    const qs = lock.packages['node_modules/qs'];
    assert.equal(qs.version, '6.16.1');
    assert.equal(qs.resolved, 'https://registry.npmjs.org/qs/-/qs-6.16.1.tgz');
    assert.match(qs.integrity, /^sha512-[A-Za-z0-9+/]+={0,2}$/);
  });

  it('does not retain a nested vulnerable Vite 6.x installation', () => {
    for (const [path, entry] of Object.entries(lock.packages as Record<string, { version: string }>)) {
      if (path === 'node_modules/vite' || path.endsWith('/node_modules/vite')) {
        const parts = entry.version.split('.').map(Number);
        assert.ok(parts[0] !== 6 || parts[1] > 4 || (parts[1] === 4 && parts[2] >= 4),
          `Vite version ${entry.version} in ${path} predates the security fix`);
      }
    }
  });
});
