<script lang="ts">
  import type { Component } from 'svelte';

  interface Props {
    demo: string;
  }

  let { demo }: Props = $props();

  const demoModules = import.meta.glob('./demo-snippets/**/*.svelte', {
    import: 'default'
  }) as Record<string, () => Promise<Component>>;

  const demos = new Map(
    Object.entries(demoModules).map(([path, loader]) => {
      const name = path.split('/').pop()?.replace(/\.svelte$/, '') ?? '';
      return [name, loader] as const;
    })
  );

  const DemoComponent = $derived(demos.get(demo)?.());
</script>

{#if DemoComponent}
  {#await DemoComponent}
    <p class="text-sm text-kumo-subtle">Loading example...</p>
  {:then Component}
    <Component />
  {:catch}
    <p class="text-sm text-kumo-subtle">Demo failed to load: {demo}</p>
  {/await}
{:else}
  <p class="text-sm text-kumo-subtle">Demo not available: {demo}</p>
{/if}
