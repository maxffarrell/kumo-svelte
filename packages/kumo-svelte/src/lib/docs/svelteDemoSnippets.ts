const demoSources = import.meta.glob('./demo-snippets/**/*.svelte', {
  query: '?raw',
  import: 'default'
}) as Record<string, () => Promise<string>>;

export function normalizeSvelteDemoSnippet(demo: string, source: string) {
  let snippet = source.replace(/^\n+|\n+$/g, '');
  if (demo.startsWith('Table')) {
    snippet = snippet
      .replace(/\n\s*import \{ emailRows \} from '\.\/table-demo-data';/, '')
      .replaceAll('emailRows', 'emailData');
  }
  return snippet;
}

const snippets = new Map(
  Object.entries(demoSources).map(([path, loadSource]) => {
    const demo = path.split('/').pop()?.replace(/\.svelte$/, '') ?? '';
    return [demo, async () => normalizeSvelteDemoSnippet(demo, await loadSource())] as const;
  })
);

export async function getSvelteDemoSnippet(demo: string) {
  return (await snippets.get(demo)?.()) ?? '';
}
