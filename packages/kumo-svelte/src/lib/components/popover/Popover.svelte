<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import PopoverContent from './PopoverContent.svelte';
  import PopoverDescription from './PopoverDescription.svelte';
  import PopoverTitle from './PopoverTitle.svelte';

  interface Props {
    trigger?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
    class?: string;
    open?: boolean;
    title?: string;
    description?: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    alignOffset?: number;
    openOnHover?: boolean;
    delay?: number;
    [key: string]: unknown;
  }

  let {
    trigger,
    children,
    class: className,
    open = $bindable(false),
    title,
    description,
    side = 'bottom',
    align = 'center',
    sideOffset = 0,
    alignOffset = 0,
    openOnHover = false,
    delay = 700,
    ...rest
  }: Props = $props();

  let contentClass = $derived(cn('min-w-48', className));
</script>

{#snippet triggerChild({ props }: { props: Record<string, unknown> })}
  {@render trigger?.(props)}
{/snippet}

<PopoverPrimitive.Root bind:open {...rest}>
  {#if trigger}
    <PopoverPrimitive.Trigger openOnHover={openOnHover} openDelay={delay} child={triggerChild} />
    <PopoverContent class={contentClass} {side} {align} {sideOffset} {alignOffset}>
      {#if title}<PopoverTitle>{title}</PopoverTitle>{/if}
      {#if description}<PopoverDescription>{description}</PopoverDescription>{/if}
      {@render children?.()}
    </PopoverContent>
  {:else}
    {@render children?.()}
  {/if}
</PopoverPrimitive.Root>
