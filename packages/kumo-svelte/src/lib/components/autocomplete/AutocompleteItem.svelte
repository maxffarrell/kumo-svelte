<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Check } from 'phosphor-svelte';
  import { getAutocompleteContext, normalizeAutocompleteItem, type AutocompleteItem } from './context';
  import { cn } from '$lib/utils/cn';

  export interface Props {
    children?: Snippet;
    class?: string;
    value: AutocompleteItem;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, value, disabled, ...rest }: Props = $props();
  const context = getAutocompleteContext('Autocomplete.Item');
  const item = $derived.by(() => {
    const normalized = normalizeAutocompleteItem(value);
    return { ...normalized, disabled: disabled ?? normalized.disabled };
  });
</script>

<button
  type="button"
  disabled={item.disabled}
  data-kumo-component="Autocomplete"
  data-kumo-part="item"
  class={cn(
    'group mx-1.5 grid w-[calc(100%-0.75rem)] cursor-pointer grid-cols-[1fr_16px] gap-2 rounded px-2 py-1.5 text-left text-base outline-none',
    'hover:bg-kumo-overlay focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    context.isSelected(item) && 'font-medium',
    className
  )}
  onclick={() => context.select(item)}
  {...rest}
>
  <span class="col-start-1 min-w-0 truncate">{@render children?.()}</span>
  {#if context.isSelected(item)}
    <Check class="col-start-2 size-3.5 self-center text-kumo-default" aria-hidden="true" />
  {/if}
</button>
