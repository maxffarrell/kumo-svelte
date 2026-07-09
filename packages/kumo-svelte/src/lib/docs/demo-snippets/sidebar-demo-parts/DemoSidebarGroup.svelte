<script lang="ts">
  import type { Snippet } from 'svelte';
  import CaretRight from 'phosphor-svelte/lib/CaretRight';
  import { cn } from '$lib/utils/cn';

  interface Props {
    label: string;
    collapsible?: boolean;
    open?: boolean;
    onToggle?: () => void;
    children?: Snippet;
  }

  let { label, collapsible = false, open = true, onToggle, children }: Props = $props();
</script>

<div class="flex min-w-0 flex-col gap-1 py-1">
  {#if collapsible}
    <button
      class="group/group-label flex w-full cursor-pointer items-center px-3 py-1 text-xs font-medium text-kumo-subtle group-data-[state=collapsed]/sidebar:hidden"
      onclick={onToggle}
    >
      <span class="flex-1 truncate text-left">{label}</span>
      <CaretRight class={cn('ml-auto size-3 shrink-0 text-kumo-subtle transition-transform duration-200', open && 'rotate-90')} />
    </button>
  {:else if label}
    <div class="truncate px-3 py-1 text-xs font-medium text-kumo-subtle group-data-[state=collapsed]/sidebar:hidden">{label}</div>
  {/if}
  {#if open}
    <ul class="m-0 flex min-w-0 list-none flex-col gap-0.5 p-0">
      {@render children?.()}
    </ul>
  {/if}
</div>
