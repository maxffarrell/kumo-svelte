import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const guards = [
  { file: 'scripts/check-node.mjs', accepts24: false },
  { file: 'packages/kumo-svelte/src/command-line/check-node.ts', accepts24: true },
];

for (const { file, accepts24 } of guards) {
  const source = readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8').replace(/export\s*\{\s*\};?/, '');
  const check = (version: string) => runInNewContext(source, { process: { versions: { node: version } } });
  for (const version of ['22.23.4', '24.22.0', '24.21.99', '26.12.0', '26.11.99', '27.0.0', '26.12.1-rc.1']) {
    test(`${file} rejects unsupported Node ${version}`, () => {
      assert.throws(() => check(version), /CVE-2026-111497/);
    });
  }
  for (const version of ['26.12.1', '26.12.2', '26.13.0']) {
    test(`${file} accepts patched Node ${version}`, () => assert.doesNotThrow(() => check(version)));
  }
  for (const version of ['24.22.1', '24.23.0']) {
    test(`${file} ${accepts24 ? 'accepts' : 'rejects'} Node ${version}`, () => {
      if (accepts24) assert.doesNotThrow(() => check(version));
      else assert.throws(() => check(version), /CVE-2026-111497/);
    });
  }
}
