interface ParsedImport {
  fullMatch: string;
  imports: string;
  path: string;
  startIndex: number;
  endIndex: number;
  isTypeOnlyImport: boolean;
}

const PACKAGE_NAME = 'kumo-svelte';

function parseImports(content: string): ParsedImport[] {
  const importRegex = /import\s+(type\s+)?{([^}]+)}\s+from\s+["']([^"']+)["'];?/g;
  const imports: ParsedImport[] = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    imports.push({
      fullMatch: match[0],
      imports: match[2],
      path: match[3],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      isTypeOnlyImport: match[1] !== undefined
    });
  }

  return imports;
}

function shouldTransformToKumo(path: string): boolean {
  if (path.startsWith('#lib/components/') || path.startsWith('#lib/utils/') ||
      path.startsWith('$lib/components/') || path.startsWith('$lib/utils/')) {
    return true;
  }

  if (!path.startsWith('../')) {
    return false;
  }

  return path.includes('/components/') || path.includes('/utils/');
}

function parseImportItems(
  imports: string,
  isTypeOnlyImport: boolean
): { valueImports: string[]; typeImports: string[] } {
  const items = imports
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const valueImports: string[] = [];
  const typeImports: string[] = [];

  for (const item of items) {
    if (isTypeOnlyImport || item.startsWith('type ')) {
      const typeName = item.startsWith('type ') ? item.slice(5).trim() : item;
      typeImports.push(typeName);
    } else {
      valueImports.push(item);
    }
  }

  return { valueImports, typeImports };
}

function buildConsolidatedImport(valueImports: string[], typeImports: string[]): string {
  const parts = [...valueImports, ...typeImports.map((item) => `type ${item}`)];
  return `import { ${parts.join(', ')} } from '${PACKAGE_NAME}';`;
}

function transformImportSegment(content: string): string {
  const parsedImports = parseImports(content);
  const kumoImports = parsedImports.filter((item) => shouldTransformToKumo(item.path));

  if (kumoImports.length === 0) {
    return content;
  }

  const valueImports: string[] = [];
  const typeImports: string[] = [];

  for (const item of kumoImports) {
    const parsed = parseImportItems(item.imports, item.isTypeOnlyImport);
    valueImports.push(...parsed.valueImports);
    typeImports.push(...parsed.typeImports);
  }

  const consolidatedImport = buildConsolidatedImport(valueImports, typeImports);
  let result = content;
  const sortedKumoImports = [...kumoImports].sort((a, b) => b.startIndex - a.startIndex);

  for (let i = 0; i < sortedKumoImports.length; i++) {
    const item = sortedKumoImports[i];

    if (i === sortedKumoImports.length - 1) {
      result = result.slice(0, item.startIndex) + consolidatedImport + result.slice(item.endIndex);
      continue;
    }

    let startIndex = item.startIndex;
    if (startIndex > 0 && result[startIndex - 1] === '\n') {
      startIndex--;
    }

    result = result.slice(0, startIndex) + result.slice(item.endIndex);
  }

  return result;
}

export function transformImports(content: string): string {
  if (!content.includes('<script')) {
    return transformImportSegment(content);
  }

  return content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, (scriptBlock) => transformImportSegment(scriptBlock));
}
