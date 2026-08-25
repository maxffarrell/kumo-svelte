<script lang="ts">
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import type { Snippet } from 'svelte';
  import X from 'phosphor-svelte/lib/X';
  import { cn } from '$lib/utils/cn';
  import { embeddedInputStyles, getComboboxContext, iconSizes, inputStyles, type ComboboxSize } from './context';
  import { Combobox as ComboboxPrimitive } from 'bits-ui';

  export interface Props {
    class?: string;
    placeholder?: string;
    size?: ComboboxSize;
    clearLabel?: string;
    showOptionsLabel?: string;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    [key: string]: unknown;
  }

  let {
    class: className,
    placeholder,
    size,
    clearLabel = 'Clear selection',
    showOptionsLabel = 'Show options',
    child,
    ...rest
  }: Props = $props();

  const context = getComboboxContext('Combobox.TriggerInput');
  const resolvedSize = $derived(size ?? context.size);
  const hasValue = $derived(context.multiple ? Array.isArray(context.value) && context.value.length > 0 : Boolean(context.value));

  const iconPadding: Record<ComboboxSize, string> = {
    xs: 'pr-7',
    sm: 'pr-9',
    base: 'pr-12',
    lg: 'pr-14'
  };

  const clearRight: Record<ComboboxSize, string> = {
    xs: 'right-5',
    sm: 'right-6',
    base: 'right-8',
    lg: 'right-9'
  };

  const caretRight: Record<ComboboxSize, string> = {
    xs: 'right-1',
    sm: 'right-1.5',
    base: 'right-2',
    lg: 'right-3'
  };
</script>

<div
  class={cn(
    'relative inline-block w-full',
    'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
    className
  )}
>
  <ComboboxPrimitive.Input
    {child}
    class={cn(
      inputStyles[resolvedSize],
      'w-full border-0 bg-kumo-control text-kumo-default shadow-xs ring ring-kumo-line outline-none',
      'placeholder:text-kumo-muted disabled:cursor-not-allowed disabled:text-kumo-disabled',
      context.invalid
        ? '!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]'
        : 'focus:ring-kumo-focus/50 focus:ring-[1.5px]',
      iconPadding[resolvedSize]
    )}
    {placeholder}
    aria-invalid={context.invalid || undefined}
    {...rest}
  />

  <button
    type="button"
    aria-label={clearLabel}
    data-kumo-component="Combobox"
    data-kumo-part="clear"
    class={cn(
      'absolute top-1/2 flex -translate-y-1/2 cursor-pointer bg-transparent p-0 text-kumo-default',
      'disabled:pointer-events-none disabled:opacity-0',
      clearRight[resolvedSize]
    )}
    disabled={context.disabled || !hasValue}
    onclick={() => {
      context.value = context.multiple ? [] : null;
      context.query = '';
    }}
  >
    <X size={iconSizes[resolvedSize]} />
  </button>

  <ComboboxPrimitive.Trigger
    aria-label={showOptionsLabel}
    data-kumo-component="Combobox"
    data-kumo-part="trigger"
    class={cn(
      'absolute top-1/2 m-0 flex -translate-y-1/2 cursor-pointer items-center justify-center bg-transparent p-0 text-kumo-subtle',
      caretRight[resolvedSize]
    )}
    disabled={context.disabled}
  >
    <CaretDown size={iconSizes[resolvedSize]} class="fill-current" />
  </ComboboxPrimitive.Trigger>
</div>
