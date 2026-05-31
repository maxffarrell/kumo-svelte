import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { assertExportTarget, discoverComponents, distDir, readPackageJson } from '../imports/test-utils.ts';

describe('export path validation', () => {
  const packageJson = readPackageJson();

  it('main, primitives, and style exports point to built files', () => {
    const mainExport = assertExportTarget(packageJson.exports['.'], '.');
    const primitivesExport = assertExportTarget(packageJson.exports['./primitives'], './primitives');
    const stylesExport = assertExportTarget(packageJson.exports['./styles.css'], './styles.css');

    for (const exportConfig of [mainExport, primitivesExport, stylesExport]) {
      for (const key of ['types', 'svelte', 'default']) {
        if (!exportConfig[key]) continue;
        assert.equal(existsSync(join(distDir, '..', exportConfig[key].replace(/^\.\//, ''))), true, exportConfig[key]);
      }
    }
  });

  it('component wildcard export resolves to built index files for every component', () => {
    for (const componentName of discoverComponents()) {
      assert.equal(existsSync(join(distDir, 'components', componentName, 'index.js')), true);
      assert.equal(existsSync(join(distDir, 'components', componentName, 'index.d.ts')), true);
    }
  });

  it('does not emit nested node_modules into dist', () => {
    assert.equal(existsSync(join(distDir, 'node_modules')), false);
  });
});
