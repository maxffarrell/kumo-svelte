<script lang="ts">
  import type { ItemSnippet } from './context';
  import { getComboboxGroupContext } from './context';
  import { cn } from '#lib/utils/cn.js';

  export interface Props {
    children?: ItemSnippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
  const context = getComboboxGroupContext();
</script>

<div class={cn('contents', className)} {...rest}>
  {#each context?.items ?? [] as item (item.label)}
    {@render children?.(item.raw)}
  {/each}
</div>
