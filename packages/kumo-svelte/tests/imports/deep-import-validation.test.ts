import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '../..');
const distRoot = join(packageRoot, 'dist');
const componentsRoot = join(packageRoot, 'src/lib/components');

async function discoverComponentIndexes() {
  const entries = await readdir(componentsRoot, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(componentsRoot, name, 'index.ts')))
    .sort();
}

describe('deep import validation', () => {
  it('keeps every component index covered by the wildcard component export', async () => {
    const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf-8')) as {
      exports: Record<string, unknown>;
    };
    const components = await discoverComponentIndexes();

    expect(packageJson.exports['./components/*']).toEqual({
      types: './dist/components/*/index.d.ts',
      svelte: './dist/components/*/index.js',
      default: './dist/components/*/index.js'
    });

    expect(components).toEqual(expect.arrayContaining(['code-highlighted', 'link', 'select', 'tooltip']));
  });

  it('emits representative built component deep paths when dist is present', async () => {
    if (!existsSync(distRoot)) return;

    for (const component of ['code-highlighted', 'link', 'select', 'tooltip']) {
      expect(existsSync(join(distRoot, 'components', component, 'index.js'))).toBe(true);
      expect(existsSync(join(distRoot, 'components', component, 'index.d.ts'))).toBe(true);
    }
  });
});
