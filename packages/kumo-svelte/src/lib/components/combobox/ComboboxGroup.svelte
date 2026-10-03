<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';
  import { normalizeComboboxItem, setComboboxGroupContext, type ComboboxItem } from './context';

  export interface Props {
    children?: Snippet;
    class?: string;
    items?: ComboboxItem[];
    [key: string]: unknown;
  }

  let { children, class: className, items = [], ...rest }: Props = $props();
  const normalizedItems = $derived(items.map(normalizeComboboxItem));

  setComboboxGroupContext({
    get items() {
      return normalizedItems;
    }
  });
</script>

<div class={cn('mt-2 border-t border-kumo-hairline pt-2 first:mt-0 first:border-t-0 first:pt-0', className)} {...rest}>
  {@render children?.()}
</div>
