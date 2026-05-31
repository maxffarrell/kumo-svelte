import { describe, it } from "node:test";
import {
  assertComponentBuildOutput,
  discoverComponents,
} from "./test-utils.ts";

describe("deep component imports", () => {
  for (const componentName of discoverComponents()) {
    it(`builds dist/components/${componentName}/index.js`, () => {
      assertComponentBuildOutput(componentName);
    });
  }
});
