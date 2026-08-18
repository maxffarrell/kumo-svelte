import adapter from '@sveltejs/adapter-cloudflare';
import { mdsx } from 'mdsx';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsxConfig } from './mdsx.config.js';

/** @returns {import('svelte/compiler').PreprocessorGroup} */
/**
 * Resolve demos at page compilation so SSR can render them immediately.
 * Imports are injected into each page instead of eagerly loading every demo globally.
 */
function componentExamples() {
  return {
    name: 'inject-component-example-imports',
    /** @param {{ content: string, filename?: string }} input */
    markup: ({ content, filename }) => {
      if (!filename?.endsWith('.md') || !content.includes('<ComponentExample')) return;

      const demos = new Set();
      const transformed = content.replace(
        /(<ComponentExample\b[^>]*?)\s+demo=(['"])([^'"]+)\2/g,
        /** @param {string} match @param {string} openingTag @param {string} quote @param {string} demo */
        (match, openingTag, quote, demo) => {
          demos.add(demo);
          return `${openingTag} component={${demo}} demo=${quote}${demo}${quote}`;
        }
      );

      if (demos.size === 0) return;

      const importMatch = transformed.match(/^import .*ComponentExample.*$/m);
      if (!importMatch || importMatch.index === undefined) return;

      const imports = [...demos]
        .map((demo) => `import ${demo} from '$lib/docs/demo-snippets/${demo}.svelte';`)
        .join('\n');

      return {
        code:
          transformed.slice(0, importMatch.index) +
          imports +
          '\n' +
          transformed.slice(importMatch.index)
      };
    }
  };
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsx(mdsxConfig), componentExamples(), vitePreprocess()],
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
