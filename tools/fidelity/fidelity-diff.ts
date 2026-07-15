#!/usr/bin/env tsx
/**
 * Fidelity diff: compares the Tailwind class vocabulary used by each Svelte
 * component against the upstream Cloudflare Kumo React source, flagging drift.
 *
 * The Tailwind class strings should be copied verbatim from upstream. Class
 * *order* does not affect rendering, so we compare the SET of class tokens
 * (including variant prefixes like `hover:` and `data-[state=open]:`). A class
 * present upstream but missing in the Svelte port is a likely visual-fidelity
 * regression (e.g. a dropped hover/open state). A class present in Svelte but
 * not upstream is either an intentional Bits-UI adaptation or accidental drift.
 *
 * Usage:
 *   tsx tools/fidelity/fidelity-diff.ts [--component <name>] [--json] [--out <file>]
 *                                       [--fail-on-missing] [--quiet]
 *
 * The upstream Kumo checkout is located via (in order):
 *   1. $KUMO_UPSTREAM
 *   2. <repo>/../kumo-upstream-ref
 *   3. <repo>/../kumo
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..', '..');
const svelteComponentsRoot = join(repoRoot, 'packages/kumo-svelte/src/lib/components');

// ---------------------------------------------------------------------------
// Upstream <component-dir> -> Svelte <component-dir(s)> mapping.
// Iterate over upstream (source of truth). Svelte may split one upstream
// component into multiple files/dirs; map the combined Svelte dirs.
// ---------------------------------------------------------------------------
const UPSTREAM_TO_SVELTE: Record<string, string[]> = {
  code: ['code', 'code-highlighted'],
  input: ['input', 'input-area'],
  dropdown: ['dropdown-menu'],
  menubar: ['menu-bar'],
  toast: ['toasty'],
};

// Components where a class vocabulary difference is expected (different
// underlying primitive / no direct primitive, or a deliberate documented
// deviation). Still reported, but excluded from the strict --fail-on-missing
// gate.
// - toolbar: intentionally uses a thicker, always-on brand focus ring
//   (incl. `focus-within`) instead of upstream's subtle default + brand-on-
//   keyboard-only pattern, to fix double-focus/overlap issues with grouped
//   controls (see toolbar input-group/active-highlight fixes).
const SOFT_GATE = new Set(['toast', 'chart', 'flow', 'toolbar']);

interface Args {
  component?: string;
  json: boolean;
  out?: string;
  failOnMissing: boolean;
  quiet: boolean;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { json: false, failOnMissing: false, quiet: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--component' || a === '-c') args.component = argv[++i];
    else if (a === '--json') args.json = true;
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--fail-on-missing') args.failOnMissing = true;
    else if (a === '--quiet') args.quiet = true;
  }
  return args;
}

function resolveUpstream(): string {
  const candidates = [
    process.env.KUMO_UPSTREAM,
    join(repoRoot, '..', 'kumo-upstream-ref'),
    join(repoRoot, '..', 'kumo'),
  ].filter(Boolean) as string[];
  for (const c of candidates) {
    if (existsSync(join(c, 'packages/kumo/src/components'))) {
      return join(c, 'packages/kumo/src/components');
    }
  }
  throw new Error(
    'Could not locate upstream Cloudflare Kumo checkout. Set $KUMO_UPSTREAM or clone:\n' +
      '  git clone https://github.com/cloudflare/kumo.git ../kumo-upstream-ref',
  );
}

// ---------------------------------------------------------------------------
// String-literal extraction + Tailwind class classification.
// ---------------------------------------------------------------------------
function extractStringLiterals(source: string): string[] {
  const out: string[] = [];
  const n = source.length;
  let i = 0;
  while (i < n) {
    const ch = source[i];
    if (ch === '/' && source[i + 1] === '/') {
      while (i < n && source[i] !== '\n') i++;
      continue;
    }
    if (ch === '/' && source[i + 1] === '*') {
      i += 2;
      while (i < n && !(source[i] === '*' && source[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      i++;
      let buf = '';
      while (i < n) {
        const c = source[i];
        if (c === '\\') {
          buf += source[i + 1] ?? '';
          i += 2;
          continue;
        }
        if (c === quote) {
          i++;
          break;
        }
        // Drop template interpolations so `${expr}` doesn't pollute tokens.
        if (quote === '`' && c === '$' && source[i + 1] === '{') {
          let depth = 1;
          i += 2;
          while (i < n && depth > 0) {
            if (source[i] === '{') depth++;
            else if (source[i] === '}') depth--;
            i++;
          }
          buf += ' ';
          continue;
        }
        buf += c;
        i++;
      }
      out.push(buf);
      continue;
    }
    i++;
  }
  return out;
}

const VARIANT_PREFIX = /^([a-z][a-z0-9-]*(\[[^\]]*\])?:)+/;

function looksLikeTailwind(token: string): boolean {
  let t = token.replace(/^!/, '');
  t = t.replace(VARIANT_PREFIX, '');
  if (!t) return false;
  if (/^-?[a-z][a-z0-9]*(-[a-z0-9.]+)*(\/[0-9.]+)?(\[[^\]]*\])?$/.test(t)) return true;
  if (/^[a-z][a-z0-9-]*\[[^\]]*\]$/.test(t)) return true;
  return false;
}

function isClassLike(s: string): boolean {
  if (s.includes('kumo-')) return true;
  const toks = s.trim().split(/\s+/).filter(Boolean);
  if (toks.length === 0) return false;
  const tw = toks.filter(looksLikeTailwind);
  if (tw.length / toks.length < 0.7) return false;
  // Require a genuine Tailwind signal to avoid matching prose / identifiers.
  return toks.some((t) => /[:[/]/.test(t) || /[a-z]-[a-z0-9]/.test(t.replace(/^!/, '')));
}

function collectImportSpecifiers(src: string): Set<string> {
  const specs = new Set<string>();
  for (const m of src.matchAll(/(?:import|export)[^'"`]*?from\s*['"`]([^'"`]+)['"`]/g)) specs.add(m[1]);
  for (const m of src.matchAll(/(?:import|require)\s*\(?\s*['"`]([^'"`]+)['"`]/g)) specs.add(m[1]);
  return specs;
}

// Bare `data-*`/`aria-*` attribute NAMES (no bracket value, no variant colon)
// are not Tailwind utilities; real data-variants look like `data-[state=open]:`.
function isAttributeName(token: string): boolean {
  return /^(data|aria)-[a-z][a-z-]*$/.test(token) && !token.includes('[') && !token.includes(':');
}

// Svelte's `style:--custom-prop={expr}` directive sets a CSS custom property
// without ever writing its name as a string literal, unlike React's
// `style={{ "--custom-prop": expr }}`. Pull the property name out separately
// so cross-framework diffs don't flag it as missing.
function collectStyleDirectiveProps(src: string): Set<string> {
  const tokens = new Set<string>();
  for (const m of src.matchAll(/\bstyle:(--[a-z0-9-]+)=/gi)) tokens.add(m[1]);
  return tokens;
}

function collectClassTokens(files: string[]): Set<string> {
  const tokens = new Set<string>();
  for (const file of files) {
    const src = readFileSync(file, 'utf-8');
    const importSpecs = collectImportSpecifiers(src);
    for (const lit of extractStringLiterals(src)) {
      if (importSpecs.has(lit)) continue;
      if (!isClassLike(lit)) continue;
      for (const tok of lit.trim().split(/\s+/)) {
        if (!tok || isAttributeName(tok)) continue;
        tokens.add(tok);
      }
    }
    for (const tok of collectStyleDirectiveProps(src)) tokens.add(tok);
  }
  return tokens;
}

function walkSourceFiles(dir: string, exts: string[], excludeRe: RegExp): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const entry of readdirSync(cur)) {
      const full = join(cur, entry);
      const st = statSync(full);
      if (st.isDirectory()) {
        stack.push(full);
      } else if (exts.some((e) => entry.endsWith(e)) && !excludeRe.test(entry)) {
        out.push(full);
      }
    }
  }
  return out;
}

interface ComponentReport {
  component: string;
  svelteDirs: string[];
  upstreamClassCount: number;
  svelteClassCount: number;
  missingInSvelte: string[];
  extraInSvelte: string[];
  softGate: boolean;
}

function diffComponent(upstreamRoot: string, upstreamName: string): ComponentReport | null {
  const upstreamDir = join(upstreamRoot, upstreamName);
  if (!statSync(upstreamDir).isDirectory()) return null;

  const upstreamFiles = walkSourceFiles(upstreamDir, ['.tsx', '.ts'], /\.(test|stories|spec)\./);
  const svelteDirs = UPSTREAM_TO_SVELTE[upstreamName] ?? [upstreamName];
  const svelteFiles = svelteDirs.flatMap((d) =>
    walkSourceFiles(join(svelteComponentsRoot, d), ['.svelte', '.ts'], /\.(test|spec)\.|TestHost|Test\.svelte/),
  );

  if (svelteFiles.length === 0) return null;

  const upstream = collectClassTokens(upstreamFiles);
  const svelte = collectClassTokens(svelteFiles);

  const missingInSvelte = [...upstream].filter((t) => !svelte.has(t)).sort();
  const extraInSvelte = [...svelte].filter((t) => !upstream.has(t)).sort();

  return {
    component: upstreamName,
    svelteDirs,
    upstreamClassCount: upstream.size,
    svelteClassCount: svelte.size,
    missingInSvelte,
    extraInSvelte,
    softGate: SOFT_GATE.has(upstreamName),
  };
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const upstreamRoot = resolveUpstream();

  const upstreamNames = readdirSync(upstreamRoot)
    .filter((n) => statSync(join(upstreamRoot, n)).isDirectory())
    .filter((n) => !args.component || n === args.component || (UPSTREAM_TO_SVELTE[n] ?? [n]).includes(args.component))
    .sort();

  const reports: ComponentReport[] = [];
  for (const name of upstreamNames) {
    const r = diffComponent(upstreamRoot, name);
    if (r) reports.push(r);
  }

  const totalMissing = reports.reduce((s, r) => s + (r.softGate ? 0 : r.missingInSvelte.length), 0);

  if (args.out) {
    mkdirSync(dirname(join(repoRoot, args.out)), { recursive: true });
    writeFileSync(join(repoRoot, args.out), JSON.stringify(reports, null, 2));
  }

  if (args.json) {
    process.stdout.write(JSON.stringify(reports, null, 2) + '\n');
  } else if (!args.quiet) {
    printHumanReport(reports);
  }

  if (args.failOnMissing && totalMissing > 0) {
    console.error(`\nFidelity gate FAILED: ${totalMissing} upstream class(es) missing in Svelte (excluding soft-gated components).`);
    process.exit(1);
  }
}

function printHumanReport(reports: ComponentReport[]): void {
  const sorted = [...reports].sort((a, b) => b.missingInSvelte.length - a.missingInSvelte.length);
  let cleanCount = 0;

  for (const r of sorted) {
    if (r.missingInSvelte.length === 0 && r.extraInSvelte.length === 0) {
      cleanCount++;
      continue;
    }
    const tag = r.softGate ? ' (soft-gate)' : '';
    console.log(`\n● ${r.component}${tag}  [svelte: ${r.svelteDirs.join(', ')}]`);
    console.log(`  upstream classes: ${r.upstreamClassCount} | svelte classes: ${r.svelteClassCount}`);
    if (r.missingInSvelte.length) {
      console.log(`  MISSING in svelte (${r.missingInSvelte.length}):`);
      for (const t of r.missingInSvelte) console.log(`    - ${t}`);
    }
    if (r.extraInSvelte.length) {
      console.log(`  extra in svelte (${r.extraInSvelte.length}):`);
      for (const t of r.extraInSvelte) console.log(`    + ${t}`);
    }
  }

  const totalMissing = reports.reduce((s, r) => s + r.missingInSvelte.length, 0);
  const totalMissingHard = reports.reduce((s, r) => s + (r.softGate ? 0 : r.missingInSvelte.length), 0);
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Components checked: ${reports.length}  |  clean: ${cleanCount}`);
  console.log(`Total missing classes: ${totalMissing}  (hard-gated: ${totalMissingHard})`);
  console.log(`Upstream ref: ${relative(repoRoot, resolveUpstream())}`);
}

main();
