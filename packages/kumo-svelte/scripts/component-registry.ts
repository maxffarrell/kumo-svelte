import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

type PropRow = {
  prop: string;
  type: string;
  required?: boolean;
  default?: string;
  description?: string;
};

type RegistryProp = {
  type: string;
  optional: boolean;
  required?: boolean;
  values?: string[];
  default?: string;
  description?: string;
};

type RegistryComponent = {
  name: string;
  type: 'component';
  category: string;
  description: string;
  importPath: string;
  sourceFile: string;
  props: Record<string, RegistryProp>;
  colors: string[];
  subComponents?: Record<
    string,
    { description: string; props: Record<string, RegistryProp> }
  >;
};

type Registry = {
  version: string;
  components: Record<string, RegistryComponent>;
  blocks: Record<string, unknown>;
  search: {
    byName: string[];
    byCategory: Record<string, string[]>;
    byType: {
      component: string[];
      block: string[];
    };
  };
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, '..');
const componentRoutesDir = join(packageRoot, 'src/routes/components');
const propsDataDir = join(packageRoot, 'src/lib/docs/props-data');
const componentsDir = join(packageRoot, 'src/lib/components');
const outputDir = join(packageRoot, 'ai');

const categoryByName: Record<string, string> = {
  Button: 'Action',
  Toolbar: 'Action',
  Link: 'Action',
  Badge: 'Display',
  ClipboardText: 'Display',
  Code: 'Display',
  CodeHighlighted: 'Display',
  Flow: 'Display',
  Meter: 'Display',
  SkeletonLine: 'Feedback',
  Banner: 'Feedback',
  Empty: 'Feedback',
  Loader: 'Feedback',
  Toast: 'Feedback',
  Toasty: 'Feedback',
  Autocomplete: 'Input',
  Checkbox: 'Input',
  Combobox: 'Input',
  DatePicker: 'Input',
  Input: 'Input',
  InputArea: 'Input',
  InputGroup: 'Input',
  Label: 'Input',
  Radio: 'Input',
  Select: 'Input',
  SensitiveInput: 'Input',
  Grid: 'Layout',
  LayerCard: 'Layout',
  Surface: 'Layout',
  Breadcrumbs: 'Navigation',
  CommandPalette: 'Navigation',
  MenuBar: 'Navigation',
  Pagination: 'Navigation',
  Sidebar: 'Navigation',
  TableOfContents: 'Navigation',
  Tabs: 'Navigation',
  Dialog: 'Overlay',
  DropdownMenu: 'Overlay',
  Popover: 'Overlay',
  Tooltip: 'Overlay',
  CloudflareLogo: 'Other',
  Table: 'Other',
  Text: 'Other'
};

const displayNameByRoute: Record<string, string> = {
  'clipboard-text': 'ClipboardText',
  'cloudflare-logo': 'CloudflareLogo',
  'code-highlighted': 'Code',
  'command-palette': 'CommandPalette',
  'date-picker': 'DatePicker',
  dropdown: 'DropdownMenu',
  'input-area': 'InputArea',
  'input-group': 'InputGroup',
  'layer-card': 'LayerCard',
  'menu-bar': 'MenuBar',
  'sensitive-input': 'SensitiveInput',
  'skeleton-line': 'SkeletonLine',
  'table-of-contents': 'TableOfContents'
};

function titleCaseRoute(route: string) {
  return route
    .split('-')
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join('');
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  const data: Record<string, string> = {};
  if (!match) return data;

  for (const line of match[1].split('\n')) {
    const field = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (field) data[field[1]] = field[2];
  }

  return data;
}

function normalizeDefault(value: string | undefined) {
  if (!value) return undefined;
  return value.replace(/^"|"$/g, '');
}

function enumValues(type: string) {
  const values = [...type.matchAll(/'([^']+)'|"([^"]+)"/g)].map(
    (match) => match[1] ?? match[2]
  );
  return values.length > 0 ? values : undefined;
}

function propType(row: PropRow) {
  return enumValues(row.type) ? 'enum' : row.type;
}

function propRowsToRegistry(rows: PropRow[]): Record<string, RegistryProp> {
  return Object.fromEntries(
    rows.map((row) => [
      row.prop,
      {
        type: propType(row),
        optional: row.required !== true,
        required: row.required === true ? true : undefined,
        values: enumValues(row.type),
        default: normalizeDefault(row.default),
        description: row.description
      }
    ])
  );
}

async function loadPropRows(componentName: string) {
  const file = join(propsDataDir, `${componentName}.ts`);
  if (!existsSync(file)) return [];
  const mod = await import(pathToFileURL(file).href);
  return (mod.default ?? []) as PropRow[];
}

async function loadSubComponents(componentName: string) {
  const entries: RegistryComponent['subComponents'] = {};
  const prefix = `${componentName}__`;

  for (const file of readdirSync(propsDataDir)) {
    if (!file.startsWith(prefix) || !file.endsWith('.ts')) continue;
    const subName = basename(file, '.ts').slice(prefix.length);
    const rows = await loadPropRows(`${componentName}__${subName}`);
    entries[subName] = {
      description: `${componentName}.${subName}`,
      props: propRowsToRegistry(rows)
    };
  }

  return Object.keys(entries).length > 0 ? entries : undefined;
}

function componentColors(sourceFile: string) {
  const componentPath = join(
    componentsDir,
    sourceFile.replace(/^components\//, '')
  );
  const files = existsSync(componentPath)
    ? readdirSync(componentPath)
        .filter((file) => file.endsWith('.svelte') || file.endsWith('.ts'))
        .map((file) => join(componentPath, file))
    : [];
  const colors = new Set<string>();

  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(
      /\b(?:bg|text|border|ring|fill|stroke)-kumo-[a-z-]+/g
    )) {
      colors.add(match[0]);
    }
  }

  return [...colors].sort();
}

async function buildRegistry() {
  const components: Record<string, RegistryComponent> = {};

  for (const route of readdirSync(componentRoutesDir).sort()) {
    const page = join(componentRoutesDir, route, '+page.md');
    if (!existsSync(page)) continue;

    const source = readFileSync(page, 'utf8');
    const frontmatter = parseFrontmatter(source);
    const name =
      displayNameByRoute[route] ?? frontmatter.title ?? titleCaseRoute(route);
    const sourceFile = frontmatter.sourceFile ?? `components/${route}`;
    const props = propRowsToRegistry(await loadPropRows(name));

    components[name] = {
      name,
      type: 'component',
      category: categoryByName[name] ?? 'Other',
      description: frontmatter.description ?? `${name} component`,
      importPath: `kumo-svelte/${sourceFile}`,
      sourceFile,
      props,
      colors: componentColors(sourceFile),
      subComponents: await loadSubComponents(name)
    };
  }

  const byCategory: Record<string, string[]> = {};
  for (const component of Object.values(components)) {
    byCategory[component.category] ??= [];
    byCategory[component.category].push(component.name);
  }

  for (const names of Object.values(byCategory)) names.sort();

  const byName = Object.keys(components).sort();
  const packageJson = JSON.parse(
    readFileSync(join(packageRoot, 'package.json'), 'utf8')
  ) as { version?: string };

  const previousRegistryPath = join(outputDir, 'component-registry.json');
  const previous = existsSync(previousRegistryPath)
    ? (JSON.parse(
        readFileSync(previousRegistryPath, 'utf8')
      ) as Partial<Registry>)
    : {};

  const registry: Registry = {
    version: packageJson.version ?? previous.version ?? '0.0.0',
    components: Object.fromEntries(
      Object.entries(components).sort(([a], [b]) => a.localeCompare(b))
    ),
    blocks: previous.blocks ?? {},
    search: {
      byName,
      byCategory: Object.fromEntries(
        Object.entries(byCategory).sort(([a], [b]) => a.localeCompare(b))
      ),
      byType: {
        component: byName,
        block: Object.keys(previous.blocks ?? {}).sort()
      }
    }
  };

  writeFileSync(previousRegistryPath, `${JSON.stringify(registry, null, 2)}\n`);
  writeFileSync(
    join(outputDir, 'component-registry.md'),
    [
      '# Kumo Svelte Component Registry',
      '',
      `Version: ${registry.version}`,
      '',
      ...byName.map((name) => {
        const component = registry.components[name]!;
        const relativeSource = relative(
          packageRoot,
          join(packageRoot, component.sourceFile)
        );
        return `## ${name}\n\n${component.description}\n\n- Category: ${component.category}\n- Import: \`import { ${name} } from "${component.importPath}";\`\n- Source: \`${relativeSource}\`\n`;
      })
    ].join('\n')
  );

  console.log(
    `Generated ${byName.length} components in ai/component-registry.json`
  );
}

await buildRegistry();
