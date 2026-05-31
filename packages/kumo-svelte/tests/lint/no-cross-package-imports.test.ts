import assert from "node:assert/strict";
import { describe, it } from "node:test";

const packageDirs = new Set(["kumo-svelte"]);
const crossPackagePattern = /^((?:\.\.\/)+)([a-z0-9-]+)\//;

function getCrossPackageImport(importPath: string): string | null {
  if (!importPath || !importPath.startsWith("..")) return null;

  const match = importPath.match(crossPackagePattern);
  if (!match) return null;

  const traversal = match[1];
  const packageDir = match[2];
  const levelsUp = (traversal.match(/\.\.\//g) || []).length;

  if (levelsUp < 2) return null;
  if (packageDirs.has(packageDir)) return packageDir;

  return null;
}

describe("no-cross-package-imports", () => {
  it("detects imports that walk into another package directory", () => {
    assert.equal(
      getCrossPackageImport("../../kumo-svelte/src/lib"),
      "kumo-svelte",
    );
    assert.equal(
      getCrossPackageImport("../../../kumo-svelte/src/lib"),
      "kumo-svelte",
    );
  });

  it("ignores local imports and package imports", () => {
    assert.equal(getCrossPackageImport("../kumo-svelte/src/lib"), null);
    assert.equal(getCrossPackageImport("./kumo-svelte/src/lib"), null);
    assert.equal(getCrossPackageImport("../../components/button"), null);
    assert.equal(getCrossPackageImport("kumo-svelte"), null);
    assert.equal(getCrossPackageImport("svelte"), null);
    assert.equal(getCrossPackageImport(""), null);
  });
});
