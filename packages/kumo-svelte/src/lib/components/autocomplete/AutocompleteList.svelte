<script lang="ts">
  import type { ItemSnippet } from './context';
  import { getAutocompleteContext } from './context';
  import { cn } from '$lib/utils/cn';
  import { Combobox as ComboboxPrimitive } from 'bits-ui';

  export interface Props {
    children?: ItemSnippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
  const context = getAutocompleteContext('Autocomplete.List');
</script>

<ComboboxPrimitive.Viewport
  class={cn('min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-pb-2 scroll-pt-2', className)}
  role="listbox"
  {...rest}
>
  {#each context.filteredItems as item (item.value)}
    {@render children?.(item.raw)}
  {/each}
</ComboboxPrimitive.Viewport>
