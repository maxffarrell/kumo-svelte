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
  import { Text } from '$lib/components/text';

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

  <div class="flex flex-col items-center gap-2.5">
    {#if description}
      <Text variant="heading" size="lg" as="h2">{title}</Text>
      <Text
        variant="secondary"
        size="base"
        DANGEROUS_className="max-w-140 text-center text-balance leading-normal"
      >{description}</Text>
    {:else}
      <Text variant="secondary" size="base" as="h2">{title}</Text>
    {/if}
  </div>

  {#if commandLine}
    <div
      class={cn(
        'relative inline-flex h-10 max-w-8/10 transform-gpu items-center gap-2 rounded-lg border border-white bg-kumo-overlay pr-2 pl-3 font-mono shadow-xs ring ring-kumo-line'
      )}
    >
      <span class="inline-flex min-w-0 items-baseline gap-2">
        <span class="text-kumo-subtle select-none">$</span>
        <span class="no-scrollbar overflow-scroll text-base whitespace-nowrap">{commandLine}</span>
      </span>
      <Button
        class="text-kumo-subtle"
        size="sm"
        variant="ghost"
        shape="square"
        aria-label="Copy command"
        onclick={copyCommand}
      >
        {#if emptyStateCopied}
          <Check class="size-4 animate-bounce-in text-kumo-success" />
        {:else}
          <Copy class="size-4" />
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
