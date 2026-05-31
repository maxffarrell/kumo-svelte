import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  componentsDir,
  discoverComponents,
  getComponentExportConfig,
  readPackageJson,
} from "./test-utils.ts";

describe("package.json validation", () => {
  const packageJson = readPackageJson();
  const allComponents = discoverComponents();
  const { directExports, wildcardExport } =
    getComponentExportConfig(packageJson);

  it("uses a wildcard component export for every source component directory", () => {
    assert.ok(wildcardExport, "Missing ./components/* export");
    assert.equal(wildcardExport.types, "./dist/components/*/index.d.ts");
    assert.equal(wildcardExport.svelte, "./dist/components/*/index.js");
    assert.equal(wildcardExport.default, "./dist/components/*/index.js");
  });

  it("does not keep stale direct component exports beside the wildcard export", () => {
    assert.deepEqual(directExports, []);
  });

  it("has an index.ts for every component directory", () => {
    const missingIndexes = allComponents.filter(
      (componentName) =>
        !existsSync(join(componentsDir, componentName, "index.ts")),
    );

    assert.deepEqual(missingIndexes, []);
  });

  it("has required package metadata and public exports", () => {
    assert.equal(packageJson.type, "module");
    assert.equal(packageJson.name, "kumo-svelte");
    assert.ok(packageJson.version);
    assert.ok(packageJson.repository);
    assert.ok(packageJson.sideEffects);
    assert.ok(packageJson.files?.includes("dist"));
    assert.ok(packageJson.exports["."]);
    assert.ok(packageJson.exports["./styles.css"]);
    assert.ok(packageJson.exports["./primitives"]);
  });
});
