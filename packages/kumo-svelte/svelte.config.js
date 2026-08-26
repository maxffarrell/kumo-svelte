import adapter from '@sveltejs/adapter-cloudflare';
import MagicString from 'magic-string';
import { mdsx } from 'mdsx';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsxConfig } from './mdsx.config.js';

/**
 * Resolve demos at page compilation so SSR can render them immediately.
 * Imports are injected into each page instead of eagerly loading every demo globally.
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
function componentExamples() {
  return {
    name: 'inject-component-example-imports',
    /** @param {{ content: string, filename?: string }} input */
    markup: ({ content, filename }) => {
      if (!filename?.endsWith('.md') || !content.includes('<ComponentExample')) return;

      const ms = new MagicString(content);
      const demos = new Set();
      const sourceDemos = new Set();
      const results = content.matchAll(/<ComponentExample\b[^>]*?\s+demo=(['"])([^'"]+)\1/g);

      for (const result of results) {
        const [, , demo] = result;
        if (demo === undefined || result.index === undefined) continue;

        demos.add(demo);
        const tagEnd = content.indexOf('>', result.index);
        const hasCode = tagEnd !== -1 && /\scode\s*=/.test(content.slice(result.index, tagEnd));
        if (!hasCode) sourceDemos.add(demo);
        ms.appendRight(
          result.index + '<ComponentExample'.length,
          ` component={${demo}}${hasCode ? '' : ` code={${demo}Source}`}`
        );
      }

      if (demos.size === 0) return;

      const importMatch = content.match(/^import .*ComponentExample.*$/m);
      if (!importMatch || importMatch.index === undefined) return;

      const imports = [...demos]
        .flatMap((demo) => {
          const imports = [`import ${demo} from '$lib/docs/demo-snippets/${demo}.svelte';`];
          if (sourceDemos.has(demo)) {
            imports.push(`import ${demo}Source from '$lib/docs/demo-snippets/${demo}.svelte?raw';`);
          }
          return imports;
        })
        .join('\n');

      ms.appendLeft(importMatch.index, `${imports}\n`);
      return { code: ms.toString(), map: ms.generateMap() };
    }
  };
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsx(mdsxConfig), componentExamples(), vitePreprocess()],
  compilerOptions: {
    experimental: {
      async: true
    }
  },
  kit: {
    alias: {
      'kumo-svelte': './src/lib/index.ts',
      'kumo-svelte/*': './src/lib/*'
    },
    adapter: adapter(),
    prerender: {
      entries: ['*']
    }
  },
  vitePlugin: {
    inspector: true
  }
};

export default config;
