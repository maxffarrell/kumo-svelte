<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import DemoRenderer from './DemoRenderer.svelte';
  import CodeBlock from './CodeBlock.svelte';
  import { getSvelteDemoSnippet, normalizeSvelteDemoSnippet } from './svelteDemoSnippets';

  interface Props {
    children?: Snippet;
    component?: Component;
    code?: string;
    demo?: string;
    lang?: string;
    vrSection?: string;
    vrTitle?: string;
  }

  let { children, code: codeProp, component, demo, lang = 'svelte', vrTitle }: Props = $props();
  const code = $derived(
    codeProp !== undefined
      ? normalizeSvelteDemoSnippet(demo ?? '', codeProp)
      : demo
        ? getSvelteDemoSnippet(demo)
        : ''
  );
</script>

{#await code then exampleCode}
  <div class="not-prose overflow-hidden rounded-lg">
    <div
      class={[
        'flex min-h-[120px] items-center justify-center border border-kumo-hairline bg-kumo-canvas p-6',
        exampleCode ? 'rounded-t-lg' : 'rounded-lg'
      ]}
    >
      {#if component}
        {@const DemoComponent = component}
        <DemoComponent />
      {:else if demo}
        <DemoRenderer {demo} />
      {:else if children}
        {@render children()}
      {:else}
        <p class="text-sm text-kumo-subtle">{vrTitle ?? demo ?? 'Example'}</p>
      {/if}
    </div>
    {#if exampleCode}
      <div class="component-example-code">
        <CodeBlock code={exampleCode} {lang} />
      </div>
    {/if}
  </div>
{/await}

<style>
  .component-example-code :global(pre.shiki) {
    border-top: 0;
    border-radius: 0;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    margin: 0;
  }
</style>
