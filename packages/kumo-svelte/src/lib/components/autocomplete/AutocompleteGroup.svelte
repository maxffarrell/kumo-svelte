<script lang="ts">
  import type { Snippet } from 'svelte';
  import {
    normalizeAutocompleteItem,
    setAutocompleteGroupContext,
    type AutocompleteItem
  } from './context';
  import { cn } from '#lib/utils/cn.js';

  export interface Props {
    children?: Snippet;
    class?: string;
    items?: AutocompleteItem[];
    [key: string]: unknown;
  }

  let { children, class: className, items = [], ...rest }: Props = $props();
  const normalizedItems = $derived(items.map(normalizeAutocompleteItem));

  setAutocompleteGroupContext({
    get items() {
      return normalizedItems;
    }
  });
</script>

<div
  class={cn('mt-2 border-t border-kumo-line pt-2 first:mt-0 first:border-t-0 first:pt-0', className)}
  {...rest}
>
  {@render children?.()}
</div>
