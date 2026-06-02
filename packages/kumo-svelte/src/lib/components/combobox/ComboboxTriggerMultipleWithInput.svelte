<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getComboboxContext, inputStyles, type ComboboxInputSide, type ComboboxSize } from './context';

  export interface Props {
    children?: Snippet<[any]>;
    class?: string;
    placeholder?: string;
    inputSide?: ComboboxInputSide;
    value?: unknown[];
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    placeholder,
    inputSide = 'right',
    value,
    ...rest
  }: Props = $props();

  const context = getComboboxContext('Combobox.TriggerMultipleWithInput');
  const selectedValues = $derived(value ?? (Array.isArray(context.value) ? context.value : []));
  const sizeToMinHeight: Record<ComboboxSize, string> = {
    xs: 'min-h-5',
    sm: 'min-h-6.5',
    base: 'min-h-9',
    lg: 'min-h-10'
  };
</script>

<div
  class={cn(
    inputStyles[context.size],
    'flex h-auto flex-col gap-1 border-0 bg-kumo-control px-1.5 py-1 text-kumo-default shadow-xs ring ring-kumo-line outline-none',
    sizeToMinHeight[context.size],
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    className
  )}
  data-disabled={context.disabled || undefined}
  {...rest}
>
  {#if inputSide === 'top'}
    <input
      class="w-full border-0 bg-inherit px-2 py-1 outline-none placeholder:text-kumo-muted"
      {placeholder}
      value={context.query}
      disabled={context.disabled}
      oninput={(event) => {
        context.query = (event.currentTarget as HTMLInputElement).value;
        context.open = true;
      }}
      onfocus={() => (context.open = true)}
    />
  {/if}
  <div class="flex flex-1 flex-wrap items-center gap-1.5">
    {#each selectedValues as selected (typeof selected === 'object' && selected && 'value' in selected ? String(selected.value) : String(selected))}
      {@render children?.(selected)}
    {/each}
    {#if inputSide === 'right'}
      <input
        class="min-w-[100px] flex-1 border-0 bg-inherit px-2 py-1 outline-none placeholder:text-kumo-muted"
        {placeholder}
        value={context.query}
        disabled={context.disabled}
        oninput={(event) => {
          context.query = (event.currentTarget as HTMLInputElement).value;
          context.open = true;
        }}
        onfocus={() => (context.open = true)}
      />
    {/if}
  </div>
</div>
