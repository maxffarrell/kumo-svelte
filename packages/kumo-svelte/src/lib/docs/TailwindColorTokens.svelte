<script lang="ts">
  import { onMount } from 'svelte';

  type Token = {
    name: string;
    tokenType?: 'semantic' | 'global';
  };

  type TokenGroup = {
    title: string;
    tokens: Token[];
  };

  const textColors: Token[] = [
    { name: '--text-color-kumo-default' },
    { name: '--text-color-kumo-inverse' },
    { name: '--text-color-kumo-strong' },
    { name: '--text-color-kumo-subtle' },
    { name: '--text-color-kumo-inactive' },
    { name: '--text-color-kumo-placeholder' },
    { name: '--text-color-kumo-brand' },
    { name: '--text-color-kumo-link' },
    { name: '--text-color-kumo-info' },
    { name: '--text-color-kumo-success' },
    { name: '--text-color-kumo-danger' },
    { name: '--text-color-kumo-warning' }
  ];

  const colors: Token[] = [
    { name: '--color-kumo-canvas' },
    { name: '--color-kumo-elevated' },
    { name: '--color-kumo-recessed' },
    { name: '--color-kumo-base' },
    { name: '--color-kumo-tint' },
    { name: '--color-kumo-contrast' },
    { name: '--color-kumo-overlay' },
    { name: '--color-kumo-control' },
    { name: '--color-kumo-interact' },
    { name: '--color-kumo-fill' },
    { name: '--color-kumo-fill-hover' },
    { name: '--color-kumo-brand' },
    { name: '--color-kumo-brand-hover' },
    { name: '--color-kumo-line' },
    { name: '--color-kumo-hairline' },
    { name: '--color-kumo-focus' },
    { name: '--color-kumo-shadow-edge' },
    { name: '--color-kumo-shadow-drop' },
    { name: '--color-kumo-tip-shadow' },
    { name: '--color-kumo-tip-stroke' },
    { name: '--color-kumo-info-tint' },
    { name: '--color-kumo-info' },
    { name: '--color-kumo-warning-tint' },
    { name: '--color-kumo-warning' },
    { name: '--color-kumo-danger-tint' },
    { name: '--color-kumo-danger' },
    { name: '--color-kumo-success-tint' },
    { name: '--color-kumo-success' }
  ];

  const componentGroups: TokenGroup[] = [
    {
      title: 'Banner',
      tokens: [{ name: '--color-kumo-banner-info' }, { name: '--color-kumo-banner-warning' }]
    },
    {
      title: 'Badge',
      tokens: [
        { name: '--text-color-kumo-badge-orange-subtle' },
        { name: '--text-color-kumo-badge-teal-subtle' },
        { name: '--text-color-kumo-badge-neutral-subtle' },
        { name: '--text-color-kumo-badge-inverted' },
        { name: '--color-kumo-badge-red' },
        { name: '--color-kumo-badge-orange' },
        { name: '--color-kumo-badge-orange-subtle' },
        { name: '--color-kumo-badge-purple' },
        { name: '--color-kumo-badge-green' },
        { name: '--color-kumo-badge-teal' },
        { name: '--color-kumo-badge-teal-subtle' },
        { name: '--color-kumo-badge-blue' },
        { name: '--color-kumo-badge-neutral' },
        { name: '--color-kumo-badge-inverted' }
      ]
    }
  ];

  const componentTokenCount = componentGroups.reduce((sum, group) => sum + group.tokens.length, 0);
  const tokenCount = textColors.length + colors.length + componentTokenCount;
  let theme = $state('kumo');

  onMount(() => {
    const updateTheme = () => {
      theme = document.documentElement.getAttribute('data-theme') ?? document.body.getAttribute('data-theme') ?? 'kumo';
    };
    const observer = new MutationObserver(updateTheme);

    updateTheme();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  });
</script>

{#snippet colorSwatch(label: string, token: string, mode: 'light' | 'dark')}
  <div data-mode={mode} class="flex min-w-0 items-start gap-2">
    <span
      class="inline-flex size-8 shrink-0 rounded border border-kumo-fill"
      style:background={token === '--color-kumo-tip-stroke' ? `var(${token}, transparent)` : `var(${token})`}
    ></span>
    <div class="flex min-w-0 flex-col text-xs text-kumo-default">
      <span class="text-[10px] uppercase opacity-70">{label}</span>
      <span class="text-[10px] leading-tight break-normal opacity-60">var({token})</span>
    </div>
  </div>
{/snippet}

{#snippet tokenGrid(tokens: Token[])}
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
    {#each tokens as token}
      <div
        class={[
          'flex min-w-0 items-center gap-3 rounded-md border bg-kumo-base px-3 py-2 text-xs',
          token.tokenType === 'global' ? 'border-kumo-info ring-1 ring-kumo-info/30' : 'border-kumo-fill'
        ]}
      >
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-mono text-xs font-medium break-normal">{token.name}</span>
            {#if token.tokenType === 'global'}
              <span class="rounded bg-kumo-info/20 px-1.5 py-0.5 text-[10px] font-medium text-kumo-link">global</span>
            {/if}
          </div>
          {@render colorSwatch('Light', token.name, 'light')}
          {@render colorSwatch('Dark', token.name, 'dark')}
        </div>
      </div>
    {/each}
  </div>
{/snippet}

<div class="not-prose flex flex-col gap-6 text-kumo-default">
  <div class="flex flex-col gap-1">
    <h2 class="m-0 text-2xl font-semibold tracking-normal text-kumo-strong">Colors</h2>
    <div class="text-sm text-kumo-default">
      Displaying {tokenCount} tokens
      {#if theme !== 'kumo'}
        <span class="ml-1">for <code class="rounded bg-kumo-brand p-1 text-white">{theme}</code></span>
      {/if}
    </div>
  </div>

  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold tracking-normal text-kumo-strong">Text Colors ({textColors.length})</h2>
    {@render tokenGrid(textColors)}
  </section>

  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold tracking-normal text-kumo-strong">Surface, State & Theme Colors ({colors.length})</h2>
    {@render tokenGrid(colors)}
  </section>

  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold tracking-normal text-kumo-strong">Component Colors ({componentTokenCount})</h2>
    {#each componentGroups as group}
      <div class="flex flex-col gap-3">
        <h3 class="m-0 text-xs font-semibold tracking-normal text-kumo-subtle">{group.title} ({group.tokens.length})</h3>
        {@render tokenGrid(group.tokens)}
      </div>
    {/each}
  </section>
</div>
