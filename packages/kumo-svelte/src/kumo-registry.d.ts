declare module 'virtual:kumo-registry' {
  import type { ComponentRegistry } from '#lib/docs/component-registry.js';

  export const kumoRegistryMarkdown: string;
  export const kumoRegistryJson: ComponentRegistry;
}

declare module 'virtual:kumo-registry-search' {
  export const registrySearchEntries: {
    name: string;
    category: string;
    description: string;
    type: 'component' | 'block';
  }[];
}
