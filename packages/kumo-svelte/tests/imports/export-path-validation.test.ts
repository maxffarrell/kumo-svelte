import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '../..');
const distRoot = join(packageRoot, 'dist');
const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf-8')) as {
  exports: Record<string, unknown>;
};

const isBuilt = existsSync(join(distRoot, 'index.js'));

async function discoverBuiltComponents() {
  const componentsRoot = join(distRoot, 'components');
  if (!existsSync(componentsRoot)) return [];

  const entries = await readdir(componentsRoot, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

describe.skipIf(!isBuilt)('export path validation', () => {
  it('points root package exports at built files', () => {
    expect(existsSync(join(distRoot, 'index.js'))).toBe(true);
    expect(existsSync(join(distRoot, 'index.d.ts'))).toBe(true);
    expect(existsSync(join(distRoot, 'styles.css'))).toBe(true);
    expect(existsSync(join(packageRoot, 'ai/component-registry.json'))).toBe(true);
  });

  it('builds every source component index exposed by the wildcard component export', async () => {
    const builtComponents = await discoverBuiltComponents();

    expect(packageJson.exports).toHaveProperty('./components/*');
    expect(builtComponents).toEqual(expect.arrayContaining(['button', 'pagination', 'sidebar']));

    for (const component of builtComponents) {
      expect(existsSync(join(distRoot, 'components', component, 'index.js'))).toBe(true);
      expect(existsSync(join(distRoot, 'components', component, 'index.d.ts'))).toBe(true);
    }
  });

  it('does not emit nested node_modules into dist', () => {
    expect(existsSync(join(distRoot, 'node_modules'))).toBe(false);
  });
});
