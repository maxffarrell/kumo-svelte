import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ComponentRegistry } from './component-registry.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const VIRTUAL_MODULE_ID = 'virtual:kumo-registry';
const SEARCH_MODULE_ID = 'virtual:kumo-registry-search';
const resolvedId = (id: string) => `\0${id}`;

export function kumoRegistryPlugin() {
  const registryFiles = {
    markdown: resolve(__dirname, '../../../ai/component-registry.md'),
    json: resolve(__dirname, '../../../ai/component-registry.json')
  };

  return {
    name: 'vite-plugin-kumo-registry',

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID || id === SEARCH_MODULE_ID) {
        return resolvedId(id);
      }
    },

    async load(id: string) {
      if (id === resolvedId(SEARCH_MODULE_ID)) {
        const registry = JSON.parse(await readFile(registryFiles.json, 'utf8')) as ComponentRegistry;
        const entries = [
          ...Object.values(registry.components).map(({ name, category, description }) => ({
            name, category, description, type: 'component'
          })),
          ...Object.values(registry.blocks ?? {}).map(({ name, category, description }) => ({
            name, category, description, type: 'block'
          }))
        ];
        return `export const registrySearchEntries = ${JSON.stringify(entries)};`;
      }
      if (id !== resolvedId(VIRTUAL_MODULE_ID)) return;

      const [markdown, json] = await Promise.all([
        readFile(registryFiles.markdown, 'utf8').catch(() => ''),
        readFile(registryFiles.json, 'utf8')
      ]);

      return `
export const kumoRegistryMarkdown = ${JSON.stringify(markdown)};
export const kumoRegistryJson = ${json};
`;
    },

    configureServer(server: {
      watcher: {
        add: (paths: string[]) => void;
        on: (event: string, callback: (file: string) => void) => void;
      };
      moduleGraph: {
        getModuleById: (id: string) => unknown;
        invalidateModule: (mod: unknown) => void;
      };
      ws: { send: (message: { type: string }) => void };
    }) {
      const registryFilePaths = Object.values(registryFiles);

      server.watcher.add(registryFilePaths);

      server.watcher.on('change', (file: string) => {
        if (registryFilePaths.some((registryFile) => file.endsWith(registryFile.split('/').pop()!))) {
          const modules = [VIRTUAL_MODULE_ID, SEARCH_MODULE_ID]
            .map((id) => server.moduleGraph.getModuleById(resolvedId(id)))
            .filter(Boolean);
          for (const mod of modules) server.moduleGraph.invalidateModule(mod);
          if (modules.length) server.ws.send({ type: 'full-reload' });
        }
      });
    }
  };
}
