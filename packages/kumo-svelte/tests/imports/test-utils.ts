import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const packageRoot = join(__dirname, "../..");
export const componentsDir = join(packageRoot, "src/lib/components");
export const distDir = join(packageRoot, "dist");

export interface PackageJson {
  exports: Record<string, unknown>;
  files?: string[];
  name?: string;
  repository?: unknown;
  sideEffects?: unknown;
  type?: string;
  version?: string;
}

export function readPackageJson(): PackageJson {
  return JSON.parse(
    readFileSync(join(packageRoot, "package.json"), "utf-8"),
  ) as PackageJson;
}

export function discoverComponents(): string[] {
  return readdirSync(componentsDir)
    .filter((entry) => statSync(join(componentsDir, entry)).isDirectory())
    .sort();
}

export function getComponentExportConfig(packageJson = readPackageJson()) {
  const directExports = Object.keys(packageJson.exports ?? {})
    .map((exportPath) => exportPath.match(/^\.\/components\/([^*].+)$/)?.[1])
    .filter((component): component is string => Boolean(component));

  return {
    directExports: directExports.sort(),
    wildcardExport: packageJson.exports?.["./components/*"] as
      | { default?: string; svelte?: string; types?: string }
      | undefined,
  };
}

function parseExportedNames(source: string): string[] {
  const names = new Set<string>();

  for (const match of source.matchAll(/export\s+\{([^}]+)\}/g)) {
    for (const specifier of match[1].split(",")) {
      const cleaned = specifier
        .trim()
        .replace(/\s+as\s+/g, " ")
        .split(/\s+/)
        .at(-1);

      if (cleaned) names.add(cleaned);
    }
  }

  for (const match of source.matchAll(
    /export\s+\*\s+as\s+([A-Za-z_$][\w$]*)/g,
  )) {
    names.add(match[1]);
  }

  return [...names].sort();
}

export function getSourceMainEntryExports(): string[] {
  return parseExportedNames(
    readFileSync(join(packageRoot, "src/lib/index.ts"), "utf-8"),
  );
}

export function getBuiltMainEntryExports(): string[] {
  return parseExportedNames(readFileSync(join(distDir, "index.js"), "utf-8"));
}

export function assertComponentBuildOutput(componentName: string) {
  const sourceEntry = join(componentsDir, componentName, "index.ts");
  const builtEntry = join(distDir, "components", componentName, "index.js");
  const builtTypes = join(distDir, "components", componentName, "index.d.ts");

  assert.equal(
    existsSync(sourceEntry),
    true,
    `${componentName} should have a source index.ts`,
  );
  assert.equal(
    existsSync(builtEntry),
    true,
    `${componentName} should have a built JS index`,
  );
  assert.equal(
    existsSync(builtTypes),
    true,
    `${componentName} should have a built type index`,
  );
  assert.ok(
    parseExportedNames(readFileSync(sourceEntry, "utf-8")).length > 0,
    `${componentName} should export source symbols`,
  );
  assert.ok(
    parseExportedNames(readFileSync(builtEntry, "utf-8")).length > 0,
    `${componentName} should export built symbols`,
  );
}

export function assertExportTarget(config: unknown, key: string) {
  assert.ok(
    config && typeof config === "object",
    `Expected export config for ${key}`,
  );
  return config as Record<string, string>;
}
