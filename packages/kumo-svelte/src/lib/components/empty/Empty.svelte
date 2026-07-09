<script module lang="ts">
  import { cn } from '$lib/utils/cn';
  import { resolveVariant } from '$lib/utils/variants';

  export const KUMO_EMPTY_VARIANTS = {
    size: {
      sm: {
        classes: 'px-6 py-8 gap-4',
        description: 'Compact empty state for smaller containers'
      },
      base: {
        classes: 'px-10 py-16 gap-6',
        description: 'Default empty state size'
      },
      lg: {
        classes: 'px-12 py-20 gap-8',
        description: 'Large empty state for prominent placement'
      }
    }
  } as const;

  export const KUMO_EMPTY_DEFAULT_VARIANTS = {
    size: 'base'
  } as const;

  export type KumoEmptySize = keyof typeof KUMO_EMPTY_VARIANTS.size;

  export interface KumoEmptyVariantsProps {
    size?: KumoEmptySize;
  }

  export function emptyVariants({
    size = KUMO_EMPTY_DEFAULT_VARIANTS.size
  }: KumoEmptyVariantsProps = {}) {
    return cn(
      'flex w-full flex-col items-center rounded-xl border border-kumo-fill bg-kumo-control text-kumo-default',
      resolveVariant(KUMO_EMPTY_VARIANTS, { size }, KUMO_EMPTY_DEFAULT_VARIANTS)
    );
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import Check from 'phosphor-svelte/lib/Check';
  import Copy from 'phosphor-svelte/lib/Copy';
  import { Button } from '$lib/components/button';

  interface Props extends KumoEmptyVariantsProps {
    children?: Snippet;
    contents?: Snippet;
    class?: string;
    icon?: Snippet;
    title: string;
    description?: string;
    commandLine?: string;
    [key: string]: unknown;
  }

  let {
    children,
    contents,
    class: className,
    icon,
    title,
    description,
    commandLine,
    size = 'base',
    ...rest
  }: Props = $props();

  let emptyStateCopied = $state(false);
  const classes = $derived(cn(emptyVariants({ size }), className));

  async function copyCommand() {
    if (!commandLine) return;

    emptyStateCopied = true;
    setTimeout(() => {
      emptyStateCopied = false;
    }, 1000);
    await navigator.clipboard.writeText(commandLine);
  }
</script>

<div class={classes} {...rest}>
  {#if icon}
    {@render icon()}
  {/if}

  <h2 class="text-2xl font-semibold">{title}</h2>

  {#if description}
    <p class="max-w-140 text-center text-kumo-subtle">{description}</p>
  {/if}

  {#if commandLine}
    <div
      class={cn(
        'group/cmd relative inline-flex h-10 max-w-8/10 transform-gpu items-center gap-2 rounded-lg font-mono shadow-sm',
        'bg-kumo-overlay pr-2 pl-3',
        'transition-all duration-300 hover:border-kumo-interact/80 hover:shadow-md',
        'border border-kumo-fill/60'
      )}
    >
      <span class="text-xs text-kumo-inactive select-none">$</span>
      <span class="no-scrollbar min-w-0 overflow-x-auto overflow-y-hidden text-base whitespace-nowrap text-kumo-brand">
        {commandLine}
      </span>
      <Button
        class="group"
        size="sm"
        variant="ghost"
        shape="square"
        aria-label="Copy command"
        onclick={copyCommand}
      >
        {#if emptyStateCopied}
          <Check class="size-4 animate-bounce-in text-kumo-success" />
        {:else}
          <Copy class="size-4 text-kumo-inactive group-hover:text-kumo-brand" />
        {/if}
      </Button>
    </div>
  {/if}

  {#if contents}
    {@render contents()}
  {:else}
    {@render children?.()}
  {/if}
</div>
