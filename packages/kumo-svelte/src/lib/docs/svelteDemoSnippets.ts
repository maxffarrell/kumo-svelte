const demoSources = import.meta.glob('./demo-snippets/**/*.svelte', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

const snippets = new Map(
  Object.entries(demoSources).map(([path, source]) => {
    const demo = path.split('/').pop()?.replace(/\.svelte$/, '') ?? '';
    let snippet = source.replace(/^\n+|\n+$/g, '');
    if (demo.startsWith('Table')) {
      snippet = snippet
        .replace(/\n\s*import \{ emailRows \} from '\.\/table-demo-data';/, '')
        .replaceAll('emailRows', 'emailData');
    }
    return [demo, snippet] as const;
  })
);

export function getSvelteDemoSnippet(demo: string) {
  return snippets.get(demo) ?? '';
}
