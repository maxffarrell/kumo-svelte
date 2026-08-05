<script lang="ts">
  import type { ItemSnippet } from './context';
  import { getComboboxContext } from './context';
  import { cn } from '$lib/utils/cn';
  import { Combobox as ComboboxPrimitive } from 'bits-ui';

  export interface Props {
    children?: ItemSnippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.List');
</script>

<ComboboxPrimitive.Viewport
  class={cn('min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-pb-2 scroll-pt-2', className)}
  {...rest}
>
  {#if children}
    {#each context.filteredItems as item (item.label)}
      {@render children(item.raw)}
    {/each}
  {/if}
</ComboboxPrimitive.Viewport>
