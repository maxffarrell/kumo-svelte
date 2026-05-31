import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, it } from 'node:test';
import { distDir } from '../imports/test-utils.ts';

interface BannedAPI {
  name: string;
  pattern: RegExp;
}

const bannedApis: BannedAPI[] = [
  { name: 'Array.prototype.toSorted()', pattern: /\.toSorted\(/ },
  { name: 'Array.prototype.toReversed()', pattern: /\.toReversed\(/ },
  { name: 'Array.prototype.toSpliced()', pattern: /\.toSpliced\(/ },
  { name: 'Array.prototype.findLast()', pattern: /\.findLast\(/ },
  { name: 'Array.prototype.findLastIndex()', pattern: /\.findLastIndex\(/ },
  { name: 'Array.prototype.with()', pattern: /(?:[\]\)\w])\.with\(\s*/ },
  { name: 'structuredClone()', pattern: /\bstructuredClone\(/ },
  { name: 'Array.fromAsync()', pattern: /\bArray\.fromAsync\(/ },
  { name: 'Object.groupBy()', pattern: /\bObject\.groupBy\(/ },
  { name: 'Map.groupBy()', pattern: /\bMap\.groupBy\(/ }
];

function collectJsFiles(dir: string): string[] {
  const results: string[] = [];

  function walk(currentDir: string) {
    for (const entry of readdirSync(currentDir)) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) walk(fullPath);
      else if (entry.endsWith('.js') && !entry.endsWith('.js.map')) results.push(fullPath);
    }
  }

  walk(dir);
  return results;
}

describe('browser compatibility', () => {
  it('does not contain banned ES2023+ APIs in dist JS files', () => {
    const violations: string[] = [];

    for (const filePath of collectJsFiles(distDir)) {
      const relPath = relative(distDir, filePath);
      const lines = readFileSync(filePath, 'utf-8').split('\n');

      lines.forEach((line, index) => {
        for (const banned of bannedApis) {
          if (banned.pattern.test(line)) {
            violations.push(`${banned.name} in ${relPath}:${index + 1}`);
          }
        }
      });
    }

    assert.deepEqual(violations, []);
  });

  it('scans a meaningful number of JS files', () => {
    assert.ok(collectJsFiles(distDir).length > 50);
  });
});
