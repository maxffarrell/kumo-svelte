<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Check } from 'phosphor-svelte';
  import { getComboboxContext, normalizeComboboxItem, type ComboboxItem } from './context';
  import { cn } from '$lib/utils/cn';

  export interface Props {
    children?: Snippet;
    class?: string;
    value: ComboboxItem;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, value, disabled, ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.Item');
  const item = $derived.by(() => {
    const normalized = normalizeComboboxItem(value);
    return { ...normalized, disabled: disabled ?? normalized.disabled };
  });
  const selected = $derived(context.isSelected(item));
</script>

<button
  type="button"
  disabled={item.disabled}
  data-kumo-component="Combobox"
  data-kumo-part="item"
  class={cn(
    'group mx-1.5 grid w-[calc(100%-0.75rem)] grid-cols-[1fr_16px] gap-2 rounded px-2 py-1.5 text-left text-base text-kumo-default outline-none',
    'cursor-pointer hover:bg-kumo-tint focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-kumo-subtle disabled:opacity-60 disabled:hover:bg-transparent',
    className
  )}
  onclick={() => context.select(item)}
  {...rest}
>
  <span class="col-start-1 min-w-0 truncate">{@render children?.()}</span>
  {#if selected}
    <Check class="col-start-2 size-4 self-center text-kumo-default" aria-hidden="true" />
  {/if}
</button>
