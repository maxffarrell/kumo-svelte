import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '../..');
const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf-8')) as {
  name: string;
  type: string;
  files: string[];
  exports: Record<string, unknown>;
};

async function discoverComponents() {
  const componentsRoot = join(packageRoot, 'src/lib/components');
  const entries = await readdir(componentsRoot, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(componentsRoot, name, 'index.ts')))
    .sort();
}

describe('package.json validation', () => {
  it('is configured as the Svelte package entry point', () => {
    expect(packageJson.name).toBe('kumo-svelte');
    expect(packageJson.type).toBe('module');
    expect(packageJson.files).toEqual(expect.arrayContaining(['dist', 'src']));
    expect(packageJson.exports).toHaveProperty('.');
    expect(packageJson.exports).toHaveProperty('./components/*');
    expect(packageJson.exports).toHaveProperty('./styles.css');
    expect(packageJson.exports).toHaveProperty('./ai/component-registry.json');
  });

  it('keeps wildcard component exports aligned with component indexes', async () => {
    const components = await discoverComponents();
    expect(components).toContain('button');
    expect(components).toContain('sidebar');
    expect(components).toContain('pagination');

    const componentExport = packageJson.exports['./components/*'];
    expect(componentExport).toEqual({
      types: './dist/components/*/index.d.ts',
      svelte: './dist/components/*/index.js',
      default: './dist/components/*/index.js'
    });
  });

  it('does not publish per-component exports that can drift from the wildcard source of truth', () => {
    const explicitComponentExports = Object.keys(packageJson.exports).filter((key) =>
      key.startsWith('./components/') && key !== './components/*'
    );

    expect(explicitComponentExports).toEqual([]);
  });
});
