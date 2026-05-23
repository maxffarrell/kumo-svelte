<script lang="ts">
  import type { Snippet } from 'svelte';
  import { CaretUpDown, Check } from 'phosphor-svelte';
  import { Select as SelectPrimitive } from 'bits-ui';
  import Field from '$lib/components/field/Field.svelte';
  import Loader from '$lib/components/loader/Loader.svelte';
  import { cn } from '$lib/utils/cn';

  type Size = 'xs' | 'sm' | 'base' | 'lg';
  type Value = string | string[];

  interface Option {
    label: string;
    value: string;
    disabled?: boolean;
  }

  type ItemDescriptor = string | { label: string; disabled?: boolean };
  type Items = Record<string, ItemDescriptor> | Option[];

  interface Props {
    class?: string;
    options?: Option[];
    items?: Items;
    value?: Value;
    defaultValue?: Value;
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    multiple?: boolean;
    size?: Size;
    label?: string;
    hideLabel?: boolean;
    labelTooltip?: string;
    description?: string;
    error?: string | { message?: string };
    name?: string;
    required?: boolean;
    children?: Snippet;
    renderValue?: (value: Value) => unknown;
    container?: HTMLElement | string;
    [key: string]: unknown;
  }

  let {
    class: className,
    options = [],
    items,
    defaultValue,
    value = $bindable(defaultValue ?? ''),
    placeholder = 'Select...',
    disabled = false,
    loading = false,
    multiple = false,
    size = 'base',
    label,
    hideLabel = false,
    labelTooltip,
    description,
    error,
    name,
    required = false,
    children,
    renderValue,
    container,
    ...rest
  }: Props = $props();

  const sizes: Record<Size, string> = {
    xs: 'h-5 rounded-sm px-1.5 text-xs',
    sm: 'h-6.5 rounded-md px-2 text-xs',
    base: 'h-9 rounded-lg px-3 text-base',
    lg: 'h-10 rounded-lg px-4 text-base'
  };

  const iconSizes: Record<Size, string> = {
    xs: 'size-3',
    sm: 'size-3.5',
    base: 'size-4',
    lg: 'size-[18px]'
  };

  const normalizedOptions = $derived.by<Option[]>(() => {
    if (items) {
      if (Array.isArray(items)) return items;

      return Object.entries(items)
        .filter(([, item]) => item !== null && item !== undefined)
        .map(([value, item]) => {
          if (typeof item === 'object') {
            return { value, label: item.label, disabled: item.disabled };
          }

          return { value, label: item };
        });
    }

    return options;
  });

  const selectItems = $derived(normalizedOptions.map(({ value, label, disabled }) => ({ value, label, disabled })));
  const errorMessage = $derived(typeof error === 'string' ? error : error?.message);
  const isDisabled = $derived(disabled || loading);
  const selectedLabels = $derived.by(() => {
    if (Array.isArray(value)) {
      return value
        .map((selectedValue) => normalizedOptions.find((option) => option.value === selectedValue)?.label ?? selectedValue)
        .join(', ');
    }

    return normalizedOptions.find((option) => option.value === value)?.label ?? value;
  });

  function displayValue(selectionValue: Value) {
    if (renderValue) return renderValue(selectionValue);
    return selectedLabels || placeholder;
  }
</script>

{#snippet selectContent()}
  <SelectPrimitive.Trigger
      class={cn(
        'inline-flex w-full items-center justify-between gap-2 bg-kumo-base text-left font-normal text-kumo-default shadow-xs outline-none ring ring-kumo-line transition focus:opacity-100 focus:ring-2 focus:ring-kumo-focus/50 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50 *:in-focus:opacity-100',
        sizes[size],
        !value || (Array.isArray(value) && value.length === 0) ? 'text-kumo-placeholder' : undefined,
        errorMessage ? 'ring-kumo-danger! focus:ring-kumo-danger/50!' : undefined,
        className
      )}
      aria-label={rest['aria-label'] as string | undefined}
      aria-invalid={Boolean(errorMessage) || undefined}
    >
      {#if loading}
        <span class="inline-flex min-w-0 flex-1 items-center">
          <Loader size="sm" class="w-32" />
        </span>
      {:else}
        <SelectPrimitive.Value class="min-w-0 flex-1 truncate data-[placeholder]:text-kumo-placeholder" {placeholder}>
          {#snippet children({ selection, placeholder })}
            <span class={cn('block truncate', !selectedLabels && 'text-kumo-placeholder')}>
              {#if selection.type === 'multiple'}
                {displayValue(selection.selected.map((item) => item.value))}
              {:else if selection.selected}
                {displayValue(selection.selected.value)}
              {:else}
                {placeholder}
              {/if}
            </span>
          {/snippet}
        </SelectPrimitive.Value>
      {/if}
      <CaretUpDown class={cn('shrink-0 text-kumo-subtle', iconSizes[size])} aria-hidden="true" />
    </SelectPrimitive.Trigger>

    <SelectPrimitive.Portal to={container}>
      <SelectPrimitive.Content
        class={cn(
          'z-50 flex max-h-[var(--bits-select-content-available-height)] min-w-[calc(var(--bits-select-anchor-width)+3px)] flex-col overflow-hidden rounded-lg bg-kumo-base py-1.5 text-base text-kumo-default shadow-lg ring ring-kumo-line outline-none'
        )}
        preventScroll
        sideOffset={4}
      >
        <SelectPrimitive.Viewport class="min-h-0 flex-1 overflow-y-auto overscroll-none scroll-pb-2 scroll-pt-2">
          {#if children}
            {@render children()}
          {:else}
            {#each normalizedOptions as option (option.value)}
              <SelectPrimitive.Item
                value={option.value}
                label={option.label}
                disabled={option.disabled}
                class={cn(
                  'group mx-1.5 flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1.5 text-base outline-none',
                  'focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:ring-inset',
                  'data-[highlighted]:bg-kumo-tint',
                  'data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
                )}
              >
                {#snippet children({ selected })}
                  <span class="min-w-0 truncate">{option.label}</span>
                  {#if selected}
                    <Check class="size-4 shrink-0 text-kumo-default" aria-hidden="true" />
                  {/if}
                {/snippet}
              </SelectPrimitive.Item>
            {/each}
          {/if}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
{/snippet}

<Field
  class={cn(!label || hideLabel ? 'contents' : undefined)}
  label={!hideLabel ? label : undefined}
  {description}
  error={errorMessage}
  {required}
>
  {#if label && hideLabel}
    <span class="sr-only">{label}</span>
  {/if}

  {#if labelTooltip && !hideLabel}
    <span class="sr-only">{labelTooltip}</span>
  {/if}

  {#if multiple}
    <SelectPrimitive.Root
      type="multiple"
      value={Array.isArray(value) ? value : []}
      onValueChange={(nextValue) => (value = nextValue)}
      items={selectItems}
      disabled={isDisabled}
      {name}
      {required}
      {...rest}
    >
      {@render (selectContent as Snippet)()}
    </SelectPrimitive.Root>
  {:else}
    <SelectPrimitive.Root
      type="single"
      value={Array.isArray(value) ? (value[0] ?? '') : value}
      onValueChange={(nextValue) => (value = nextValue)}
      items={selectItems}
      disabled={isDisabled}
      {name}
      {required}
      {...rest}
    >
      {@render (selectContent as Snippet)()}
    </SelectPrimitive.Root>
  {/if}
</Field>
