<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getComboboxContext } from './context';
  import { cn } from '#lib/utils/cn.js';

  export interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.Empty');
</script>

{#if context.filteredItems.length === 0}
  <div
    class={cn('mx-1.5 shrink-0 px-4 py-2 text-[0.925rem] leading-4 text-kumo-subtle empty:m-0 empty:p-0', className)}
    {...rest}
  >
    {#if children}
      {@render children()}
    {:else}
      No labels found.
    {/if}
  </div>
{/if}
