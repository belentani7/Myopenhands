import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
const commands = [...workflow.matchAll(/^\s*- run: (.+)$/gm)].map((match) => match[1].trim());

describe('CI does not report success when quality gates fail', () => {
  it('uses Node 22+ to run the TypeScript tests', () => {
    assert.match(workflow, /node-version:\s*['"]22['"]/);
  });

  it('installs dependencies reproducibly without a fallback', () => {
    assert.deepEqual(commands[0], 'npm ci');
  });

  it('blocks high severity dependency advisories before running quality gates', () => {
    assert.equal(commands[1], 'npm audit --audit-level=high');
  });

  it('runs lint, tests and build as required failing steps', () => {
    assert.deepEqual(commands, ['npm ci', 'npm audit --audit-level=high', 'npm run lint', 'npm test', 'npm run build']);
    assert.doesNotMatch(workflow, /\|\|\s*true|--if-present/);
  });
});
