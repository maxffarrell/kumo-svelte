import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  distDir,
  getBuiltMainEntryExports,
  getSourceMainEntryExports,
  packageRoot,
} from "./test-utils.ts";

describe("main entry point imports", () => {
  it("builds the package main entry files", () => {
    assert.equal(existsSync(join(packageRoot, "src/lib/index.ts")), true);
    assert.equal(existsSync(join(distDir, "index.js")), true);
    assert.equal(existsSync(join(distDir, "index.d.ts")), true);
  });

  it("keeps source and built main entry exports aligned", () => {
    assert.deepEqual(getBuiltMainEntryExports(), getSourceMainEntryExports());
  });
});
