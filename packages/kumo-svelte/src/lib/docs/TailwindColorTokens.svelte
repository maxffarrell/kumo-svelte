<script lang="ts">
  import { onMount } from 'svelte';

  type Token = {
    name: string;
    global?: boolean;
  };

  type TokenGroup = {
    title: string;
    tokens?: Token[];
    groups?: TokenGroup[];
  };

  const tokenGroups: TokenGroup[] = [
    {
      title: 'Text Colors',
      tokens: [
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
      ]
    },
    {
      title: 'Surface, State & Theme Colors',
      tokens: [
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
      ]
    },
    {
      title: 'Component Colors',
      groups: [
        {
          title: 'Badge',
          tokens: [
            { name: '--text-color-kumo-badge-orange-subtle' },
            { name: '--text-color-kumo-badge-teal-subtle' },
            { name: '--text-color-kumo-badge-neutral-subtle' },
            { name: '--text-color-kumo-badge-inverted' },
            { name: '--color-kumo-badge-red' },
            { name: '--color-kumo-badge-orange' },
            { name: '--color-kumo-badge-purple' },
            { name: '--color-kumo-badge-teal' },
            { name: '--color-kumo-badge-blue' },
            { name: '--color-kumo-badge-neutral' },
            { name: '--color-kumo-badge-inverted' }
          ]
        },
        {
          title: 'Banner',
          tokens: [{ name: '--color-kumo-banner-info' }, { name: '--color-kumo-banner-warning' }]
        }
      ]
    }
  ];

  const groupCount = (group: TokenGroup): number =>
    (group.tokens?.length ?? 0) + (group.groups?.reduce((count, child) => count + groupCount(child), 0) ?? 0);

  const tokenCount = tokenGroups.reduce((count, group) => count + groupCount(group), 0);

  let tokenValues = $state<Record<string, { light: string; dark: string }>>({});

  const formatValue = (value: string | undefined) => value?.trim() || ' ';

  onMount(() => {
    const nextValues: Record<string, { light: string; dark: string }> = {};

    document.querySelectorAll<HTMLElement>('[data-token-card]').forEach((card) => {
      const token = card.dataset.token;

      if (!token) {
        return;
      }

      const light = card.querySelector<HTMLElement>('[data-token-mode="light"]');
      const dark = card.querySelector<HTMLElement>('[data-token-mode="dark"]');

      nextValues[token] = {
        light: light ? getComputedStyle(light).getPropertyValue(token) : '',
        dark: dark ? getComputedStyle(dark).getPropertyValue(token) : ''
      };
    });

    tokenValues = nextValues;
  });
</script>

{#snippet tokenGrid(tokens: Token[])}
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2">
    {#each tokens as token}
      <div
        data-token-card
        data-token={token.name}
        class="flex min-w-0 items-center gap-3 rounded-md border border-kumo-fill bg-kumo-base px-3 py-2 text-xs"
      >
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-mono text-xs font-medium break-normal">{token.name}</span>
            {#if token.global}
              <span class="rounded-full bg-kumo-tint px-2 py-0.5 text-[10px] font-medium text-kumo-subtle">
                global
              </span>
            {/if}
          </div>

          <div
            data-theme="kumo"
            data-mode="light"
            data-token-mode="light"
            class="flex min-w-0 items-start gap-2"
          >
            <span
              class="inline-flex h-8 w-8 shrink-0 rounded border border-kumo-fill"
              style:background={`var(${token.name})`}
            ></span>
            <div class="flex min-w-0 flex-col text-xs text-kumo-default">
              <span class="text-[10px] tracking-wide uppercase opacity-70">Light</span>
              <span class="text-[10px] leading-tight break-normal opacity-60">
                {formatValue(tokenValues[token.name]?.light)}
              </span>
            </div>
          </div>

          <div
            data-theme="kumo"
            data-mode="dark"
            data-token-mode="dark"
            class="flex min-w-0 items-start gap-2"
          >
            <span
              class="inline-flex h-8 w-8 shrink-0 rounded border border-kumo-fill"
              style:background={`var(${token.name})`}
            ></span>
            <div class="flex min-w-0 flex-col text-xs text-kumo-default">
              <span class="text-[10px] tracking-wide uppercase opacity-70">Dark</span>
              <span class="text-[10px] leading-tight break-normal opacity-60">
                {formatValue(tokenValues[token.name]?.dark)}
              </span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/snippet}

<section class="not-prose my-8">
  <div class="flex flex-col gap-6 text-kumo-default">
    <div>
      <h2 class="text-2xl font-semibold tracking-normal text-kumo-strong">Colors</h2>
      <p class="mt-2 text-sm text-kumo-subtle">Displaying {tokenCount} tokens</p>
    </div>

    {#each tokenGroups as group}
      <section class="space-y-3">
        <h3 class="text-lg font-semibold tracking-normal text-kumo-strong">
          {group.title} ({groupCount(group)})
        </h3>

        {#if group.tokens}
          {@render tokenGrid(group.tokens)}
        {/if}

        {#each group.groups ?? [] as child}
          <section class="space-y-3 pt-3">
            <h4 class="text-base font-semibold tracking-normal text-kumo-strong">
              {child.title} ({groupCount(child)})
            </h4>

            {#if child.tokens}
              {@render tokenGrid(child.tokens)}
            {/if}
          </section>
        {/each}
      </section>
    {/each}
  </div>
</section>
