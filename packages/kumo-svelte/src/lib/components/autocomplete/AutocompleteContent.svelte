<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getAutocompleteContext } from './context';
  import { cn } from '$lib/utils/cn';
  import { Combobox as ComboboxPrimitive } from 'bits-ui';

  type AutocompleteContentAlign = 'start' | 'center' | 'end';
  type AutocompleteContentSide = 'top' | 'right' | 'bottom' | 'left';
  type Offset = number | string;

  export interface Props {
    children?: Snippet;
    class?: string;
    align?: AutocompleteContentAlign;
    alignOffset?: Offset;
    side?: AutocompleteContentSide;
    sideOffset?: Offset;
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
    style,
    ...rest
  }: Props = $props();
  const context = getAutocompleteContext('Autocomplete.Content');

  function toNumberOffset(val: Offset): number {
    if (typeof val === 'number') return val;
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  }
</script>

{#if context.open && context.hasTypedSinceFocus && context.filteredItems.length}
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Content
      class={cn(
        'z-50 flex max-h-[min(24rem,calc(100vh-8rem))] min-w-[calc(var(--bits-select-anchor-width)+3px)] flex-col overflow-hidden rounded-lg bg-kumo-control py-1.5 text-kumo-default shadow-lg ring ring-kumo-line outline-none',
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
