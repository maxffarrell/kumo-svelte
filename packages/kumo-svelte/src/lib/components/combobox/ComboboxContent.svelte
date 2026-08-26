<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getComboboxContext } from './context';
  import { cn } from '$lib/utils/cn';
  import { Combobox as ComboboxPrimitive } from 'bits-ui';

  type ComboboxContentAlign = 'start' | 'center' | 'end';
  type ComboboxContentSide = 'top' | 'right' | 'bottom' | 'left';
  type Offset = number | string;

  export interface Props {
    children?: Snippet;
    class?: string;
    align?: ComboboxContentAlign;
    alignOffset?: Offset;
    side?: ComboboxContentSide;
    sideOffset?: Offset;
    customAnchor?: ComboboxPrimitive.ContentProps['customAnchor'];
    strategy?: ComboboxPrimitive.ContentProps['strategy'];
    avoidCollisions?: ComboboxPrimitive.ContentProps['avoidCollisions'];
    collisionBoundary?: ComboboxPrimitive.ContentProps['collisionBoundary'];
    collisionPadding?: ComboboxPrimitive.ContentProps['collisionPadding'];
    sticky?: ComboboxPrimitive.ContentProps['sticky'];
    hideWhenDetached?: ComboboxPrimitive.ContentProps['hideWhenDetached'];
    updatePositionStrategy?: ComboboxPrimitive.ContentProps['updatePositionStrategy'];
    container?: HTMLElement | string;
    style?: string;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    align = 'start',
    alignOffset = 0,
    side = 'bottom',
    sideOffset = 4,
    container,
    style,
    ...rest
  }: Props = $props();
  const context = getComboboxContext('Combobox.Content');

  function toNumberOffset(val: Offset): number {
    if (typeof val === 'number') return val;
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  }
</script>

{#if context.open}
  <ComboboxPrimitive.Portal to={container}>
    <ComboboxPrimitive.Content
      class={cn(
        'z-50 flex max-h-[min(24rem,calc(100vh-8rem))] min-w-[calc(var(--bits-select-anchor-width)+3px)] flex-col overflow-hidden rounded-lg bg-kumo-base py-1.5 text-base text-kumo-default shadow-lg ring ring-kumo-line outline-none',
        className
      )}
      side={side}
      sideOffset={toNumberOffset(sideOffset)}
      align={align}
      alignOffset={toNumberOffset(alignOffset)}
      style={style}
      {...rest}
    >
      {@render children?.()}
    </ComboboxPrimitive.Content>
  </ComboboxPrimitive.Portal>
{/if}
