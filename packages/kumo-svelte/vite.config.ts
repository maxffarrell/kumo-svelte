import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { kumoRegistryPlugin } from './src/lib/docs/vite-plugin-kumo-registry';

const packageJson = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf-8')) as {
  version?: string;
};
const buildDate = new Date().toISOString();

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1600,
    rolldownOptions: {
      checks: {
        pluginTimings: false
      }
    }
  },
  define: {
    __KUMO_VERSION__: JSON.stringify(packageJson.version ?? 'dev'),
    __DOCS_VERSION__: JSON.stringify(packageJson.version ?? 'dev'),
    __BUILD_DATE__: JSON.stringify(buildDate)
  },
  plugins: [kumoRegistryPlugin(), tailwindcss(), sveltekit()],
  resolve: process.env.VITEST
    ? {
        conditions: ['browser']
      }
    : undefined
});
