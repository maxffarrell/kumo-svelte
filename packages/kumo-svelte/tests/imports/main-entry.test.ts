import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '../..');

describe('main entry point exports', () => {
  it('exports representative public components from the source entry', async () => {
    const source = await readFile(join(packageRoot, 'src/lib/index.ts'), 'utf-8');

    expect(source).toContain('Button');
    expect(source).toContain('Sidebar');
    expect(source).toContain('Pagination');
    expect(source).toContain('TimeseriesChart');
  });

  it('keeps built package entry export names aligned with source when dist is present', async () => {
    const distEntry = join(packageRoot, 'dist/index.js');
    if (!existsSync(distEntry)) return;

    const source = await readFile(join(packageRoot, 'src/lib/index.ts'), 'utf-8');
    const built = await readFile(distEntry, 'utf-8');

    for (const exportName of ['Button', 'Sidebar', 'Pagination', 'TimeseriesChart']) {
      expect(source).toContain(exportName);
      expect(built).toContain(exportName);
    }
  });

  it('keeps the package registry export addressable', async () => {
    const registry = JSON.parse(await readFile(join(packageRoot, 'ai/component-registry.json'), 'utf-8'));
    expect(registry).toBeDefined();
  });
});
