declare module 'virtual:kumo-registry' {
  import type { ComponentRegistry } from '#lib/docs/component-registry.js';

  export const kumoRegistryMarkdown: string;
  export const kumoRegistryJson: ComponentRegistry;
}
