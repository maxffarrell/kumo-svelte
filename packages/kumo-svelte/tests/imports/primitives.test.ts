import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  assertExportTarget,
  distDir,
  packageRoot,
  readPackageJson,
} from "./test-utils.ts";

describe("primitives export", () => {
  const packageJson = readPackageJson();

  it("has a primitives export in package.json", () => {
    const primitivesExport = assertExportTarget(
      packageJson.exports["./primitives"],
      "./primitives",
    );

    assert.equal(primitivesExport.types, "./dist/primitives.d.ts");
    assert.equal(primitivesExport.svelte, "./dist/primitives.js");
    assert.equal(primitivesExport.default, "./dist/primitives.js");
  });

  it("has source and dist primitive entry files", () => {
    assert.equal(existsSync(join(packageRoot, "src/lib/primitives.ts")), true);
    assert.equal(existsSync(join(distDir, "primitives.js")), true);
    assert.equal(existsSync(join(distDir, "primitives.d.ts")), true);
  });

  it("builds a primitives entry that re-exports bits-ui", () => {
    const built = readFileSync(join(distDir, "primitives.js"), "utf-8");

    assert.match(built, /from\s+['"]bits-ui['"]/);
  });

  it("re-exports bits-ui primitives from source", () => {
    const source = readFileSync(
      join(packageRoot, "src/lib/primitives.ts"),
      "utf-8",
    );

    assert.match(source, /export \* from 'bits-ui';/);
  });
});
