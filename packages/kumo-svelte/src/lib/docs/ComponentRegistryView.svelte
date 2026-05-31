<script lang="ts">
  import { kumoRegistryJson } from 'virtual:kumo-registry';

  interface PropInfo {
    type?: string;
    optional?: boolean;
    required?: boolean;
    values?: string[];
    descriptions?: Record<string, string>;
    default?: string;
    description?: string;
  }

  interface SubComponent {
    description?: string;
    props?: Record<string, PropInfo>;
    renderElement?: string;
  }

  interface ComponentInfo {
    name: string;
    type?: string;
    category: string;
    description: string;
    importPath?: string;
    sourceFile?: string;
    props?: Record<string, PropInfo> | PropInfo[];
    examples?: string[];
    colors?: string[];
    subComponents?: Record<string, SubComponent>;
  }

  interface BlockInfo {
    name: string;
    type?: string;
    category: string;
    description: string;
    files?: string[];
    dependencies?: string[];
  }

  interface ComponentRegistry {
    version: string;
    components: Record<string, ComponentInfo>;
    blocks?: Record<string, BlockInfo>;
    search?: {
      byName?: string[];
      byCategory?: Record<string, string[]>;
      byType?: Record<string, string[]>;
    };
  }

  const registry = kumoRegistryJson as ComponentRegistry;

  let expandedComponent = $state<string | null>(null);
  let selectedCategory = $state<string | null>(null);

  const components = $derived(
    Object.values(registry.components).sort((a, b) => a.name.localeCompare(b.name))
  );

  const categories = $derived(
    Object.keys(
      registry.search?.byCategory ??
        components.reduce<Record<string, string[]>>((groups, component) => {
          groups[component.category] ??= [];
          groups[component.category].push(component.name);
          return groups;
        }, {})
    ).sort()
  );

  const filteredComponents = $derived(
    selectedCategory
      ? components.filter((component) => component.category === selectedCategory)
      : components
  );

  function propEntries(props: ComponentInfo['props']): Array<[string, PropInfo]> {
    if (!props) return [];
    if (Array.isArray(props)) {
      return props.map((prop, index) => [`prop${index + 1}`, prop]);
    }
    return Object.entries(props);
  }

  function variantProps(component: ComponentInfo): Array<[string, PropInfo]> {
    return propEntries(component.props).filter(([, prop]) => prop.values && prop.values.length > 0);
  }

  function importPath(component: ComponentInfo): string {
    if (component.importPath) return component.importPath;
    if (component.sourceFile) return `kumo-svelte/${component.sourceFile}`;
    return 'kumo-svelte';
  }

  function toggleComponent(name: string) {
    expandedComponent = expandedComponent === name ? null : name;
  }
</script>

<div class="not-prose flex flex-col gap-6">
  <div class="flex flex-wrap gap-4 text-sm">
    <div class="rounded-lg border border-kumo-hairline bg-kumo-base px-4 py-2">
      <span class="font-semibold text-kumo-default">{components.length}</span>
      <span class="ml-1 text-kumo-subtle">components</span>
    </div>
    <div class="rounded-lg border border-kumo-hairline bg-kumo-base px-4 py-2">
      <span class="font-semibold text-kumo-default">{categories.length}</span>
      <span class="ml-1 text-kumo-subtle">categories</span>
    </div>
    <div class="rounded-lg border border-kumo-hairline bg-kumo-base px-4 py-2">
      <span class="text-kumo-subtle">v</span>
      <span class="font-semibold text-kumo-default">{registry.version}</span>
    </div>
  </div>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      onclick={() => (selectedCategory = null)}
      class={[
        'rounded-full px-3 py-1 text-sm transition-colors',
        selectedCategory === null
          ? 'bg-kumo-brand text-white'
          : 'bg-kumo-overlay text-kumo-default hover:bg-kumo-recessed'
      ]}
    >
      All
    </button>
    {#each categories as category}
      <button
        type="button"
        onclick={() => (selectedCategory = category)}
        class={[
          'rounded-full px-3 py-1 text-sm transition-colors',
          selectedCategory === category
            ? 'bg-kumo-brand text-white'
            : 'bg-kumo-overlay text-kumo-default hover:bg-kumo-recessed'
        ]}
      >
        {category}
      </button>
    {/each}
  </div>

  <div class="space-y-2">
    {#each filteredComponents as component (component.name)}
      <div class="rounded-lg border border-kumo-hairline bg-kumo-base">
        <button
          type="button"
          onclick={() => toggleComponent(component.name)}
          class="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-kumo-overlay"
        >
          <div>
            <h3 class="font-semibold text-kumo-default">{component.name}</h3>
            <p class="mt-1 text-sm text-kumo-subtle">{component.description}</p>
          </div>
          <span class="ml-4 text-kumo-subtle">{expandedComponent === component.name ? '-' : '+'}</span>
        </button>

        {#if expandedComponent === component.name}
          <div class="border-t border-kumo-hairline p-4">
            <div class="mb-4">
              <h4 class="mb-2 text-xs font-medium text-kumo-subtle uppercase">Import</h4>
              <code class="block rounded bg-kumo-overlay p-2 text-xs">
                import {'{'} {component.name} {'}'} from "{importPath(component)}";
              </code>
            </div>

            {#if variantProps(component).length > 0}
              <div class="mb-4">
                <h4 class="mb-2 text-xs font-medium text-kumo-subtle uppercase">Variants</h4>
                <div class="space-y-2">
                  {#each variantProps(component) as [propName, prop] (propName)}
                    <div>
                      <span class="font-mono text-sm text-kumo-default">{propName}</span>
                      {#if prop.default}
                        <span class="ml-2 text-xs text-kumo-subtle">(default: {prop.default})</span>
                      {/if}
                      <div class="mt-1 flex flex-wrap gap-1">
                        {#each prop.values ?? [] as value}
                          <span class="rounded bg-kumo-overlay px-2 py-0.5 text-xs text-kumo-default">
                            {value}
                          </span>
                        {/each}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            {#if component.subComponents && Object.keys(component.subComponents).length > 0}
              <div class="mb-4">
                <h4 class="mb-2 text-xs font-medium text-kumo-subtle uppercase">Sub-components</h4>
                <div class="flex flex-wrap gap-1">
                  {#each Object.keys(component.subComponents) as subName}
                    <span class="rounded bg-kumo-overlay px-2 py-0.5 text-xs text-kumo-default">
                      {component.name}.{subName}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}

            {#if component.colors && component.colors.length > 0}
              <div>
                <h4 class="mb-2 text-xs font-medium text-kumo-subtle uppercase">Semantic Tokens</h4>
                <div class="flex flex-wrap gap-1">
                  {#each component.colors as color}
                    <span class="rounded bg-kumo-overlay px-2 py-0.5 text-xs text-kumo-default">
                      {color}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
