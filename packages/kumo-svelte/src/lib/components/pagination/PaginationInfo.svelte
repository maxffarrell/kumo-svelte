<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';
  import { getPaginationContext } from './context';

  interface RenderProps {
    page: number;
    perPage?: number;
    totalCount?: number;
    pageShowingRange: string;
  }

  interface Props {
    children?: Snippet<[RenderProps]>;
    class?: string;
    text?: (props: RenderProps) => unknown;
    [key: string]: unknown;
  }

  let { children, class: className, text, ...rest }: Props = $props();
  const context = getPaginationContext();
  const renderProps = $derived({
    page: context.page,
    perPage: context.perPage,
    totalCount: context.totalCount,
    pageShowingRange: context.pageShowingRange
  });
  const customText = $derived(text?.(renderProps));
</script>

<div data-slot="pagination-info" class={cn('text-sm text-kumo-subtle', className)} {...rest}>
  {#if children}
    {@render children(renderProps)}
  {:else if text}
    {customText}
  {:else if context.totalCount && context.totalCount > 0}
    Showing <span class="tabular-nums">{context.pageShowingRange}</span> of <span class="tabular-nums">{context.totalCount}</span>
  {/if}
</div>
