<script lang="ts">
  import type { Snippet } from 'svelte';
  import { X } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';
  import { getComboboxContext } from './context';

  export interface Props {
    children?: Snippet;
    class?: string;
    value?: unknown;
    removeLabel?: string;
    [key: string]: unknown;
  }

  let { children, class: className, value, removeLabel = 'Remove', ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.Chip');
</script>

<span
  class={cn(
    'flex h-6 items-center gap-2.5 rounded-sm bg-kumo-overlay pl-2 pr-[3px] text-sm ring-1 ring-kumo-hairline',
    className
  )}
  {...rest}
>
  {@render children?.()}
  <button
    type="button"
    aria-label={removeLabel}
    data-kumo-component="Combobox"
    data-kumo-part="chip-remove"
    class="flex cursor-pointer rounded-md bg-transparent p-1 hover:bg-kumo-fill-hover"
    onclick={() => context.remove(value)}
  >
    <X size={10} />
  </button>
</span>
