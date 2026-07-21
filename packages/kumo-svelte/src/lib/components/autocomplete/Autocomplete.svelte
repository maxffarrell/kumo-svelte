<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import Field from '$lib/components/field/Field.svelte';
  import { cn } from '$lib/utils/cn';
  import {
    normalizeAutocompleteItem,
    setAutocompleteContext,
    type AutocompleteItem,
    type AutocompleteSize,
    type AutocompleteValue,
    type NormalizedAutocompleteItem
  } from './context';
  import { createKumoFilter } from '../filter';
  import { Combobox as ComboboxPrimitive } from 'bits-ui';

  type FieldError = string | { message?: string; match?: boolean };

  export interface Props {
    children?: Snippet;
    class?: string;
    items?: AutocompleteItem[];
    value?: AutocompleteValue;
    defaultValue?: AutocompleteValue;
    open?: boolean;
    disabled?: boolean;
    size?: AutocompleteSize;
    label?: string | Snippet;
    labelTooltip?: string | Snippet;
    description?: string | Snippet;
    error?: FieldError;
    required?: boolean;
    filter?: ((item: AutocompleteItem, query: string) => boolean) | null;
    onValueChange?: (value: AutocompleteValue) => void;
    onOpenChange?: (open: boolean) => void;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    items = [],
    defaultValue,
    value = $bindable(defaultValue ?? ''),
    open = $bindable(false),
    disabled = false,
    size = 'base',
    label,
    labelTooltip,
    description,
    error,
    required,
    filter,
    onValueChange,
    onOpenChange,
    ...rest
  }: Props = $props();

  let query = $state(Array.isArray(value) ? value.join(', ') : String(value ?? ''));
  let hasTypedSinceFocus = $state(false);
  let rootElement: HTMLDivElement;
  const { contains } = createKumoFilter();

  const normalizedItems = $derived(items.map(normalizeAutocompleteItem));
  const errorMessage = $derived(
    typeof error === 'string' ? error : error?.match === false ? undefined : error?.message
  );
  const filteredItems = $derived.by<NormalizedAutocompleteItem[]>(() => {
    const term = query.trim().toLowerCase();
    if (!term) return normalizedItems;
    if (filter === null) return normalizedItems;

    return normalizedItems.filter((item) => {
      if (filter) return filter(item.raw, query);
      return contains(item.label, term) || contains(String(item.value), term);
    });
  });

  const serializedOptions = $derived(
    normalizedItems.map((item, index) => ({
      ...item,
      serializedValue: `kumo-autocomplete:${index}`
    }))
  );

  function serializeSelectedValue(selectionValue: unknown) {
    const option = serializedOptions.find((entry) => valuesEqual(entry.value, selectionValue as AutocompleteValue));
    if (option) return option.serializedValue;
    return typeof selectionValue === 'string' || typeof selectionValue === 'number' ? String(selectionValue) : undefined;
  }

  function deserializePrimitiveValue(primitiveValue: string) {
    const option = serializedOptions.find((entry) => entry.serializedValue === primitiveValue);
    return option ? option.value : primitiveValue;
  }

  const primitiveValue = $derived.by(() => {
    if (Array.isArray(value)) {
      return value.map(serializeSelectedValue).filter((v): v is string => v !== undefined);
    }
    const val = serializeSelectedValue(value);
    return val !== undefined ? val : '';
  });

  function handleSingleValueChange(nextValue: string | undefined) {
    if (nextValue === undefined) return;
    const deserialized = deserializePrimitiveValue(nextValue);
    value = deserialized;
    const option = serializedOptions.find((entry) => entry.serializedValue === nextValue);
    if (option) {
      query = option.label;
    }
    open = false;
    onValueChange?.(deserialized);
    onOpenChange?.(false);
  }

  function handleMultipleValueChange(nextValue: string[]) {
    const deserialized = nextValue.map(deserializePrimitiveValue).map(String);
    value = deserialized;
    onValueChange?.(deserialized);
  }

  $effect(() => {
    if (!open) {
      if (Array.isArray(value)) {
        query = value.join(', ');
      } else {
        const option = serializedOptions.find((entry) => entry.value === value);
        query = option ? option.label : String(value ?? '');
      }
    }
  });

  function valuesEqual(itemValue: string | number, selectedValue: AutocompleteValue) {
    if (Array.isArray(selectedValue)) return selectedValue.some((selected) => itemValue === selected);
    return itemValue === selectedValue;
  }

  function isSelected(item: NormalizedAutocompleteItem) {
    return valuesEqual(item.value, value);
  }

  function select(item: NormalizedAutocompleteItem) {
    if (item.disabled) return;
    value = item.value;
    query = item.label;
    open = false;
    onValueChange?.(item.value);
    onOpenChange?.(false);
  }

  onMount(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootElement?.contains(event.target as Node)) {
        hasTypedSinceFocus = false;
        open = false;
        onOpenChange?.(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  });

  setAutocompleteContext({
    get items() {
      return normalizedItems;
    },
    get filteredItems() {
      return filteredItems;
    },
    get query() {
      return query;
    },
    set query(nextQuery: string) {
      query = nextQuery;
      value = nextQuery;
      onValueChange?.(nextQuery);
    },
    get value() {
      return value;
    },
    set value(nextValue: AutocompleteValue) {
      value = nextValue;
      onValueChange?.(nextValue);
    },
    get open() {
      return open;
    },
    set open(nextOpen: boolean) {
      open = nextOpen;
      onOpenChange?.(nextOpen);
    },
    get hasTypedSinceFocus() {
      return hasTypedSinceFocus;
    },
    get size() {
      return size;
    },
    get invalid() {
      return Boolean(errorMessage);
    },
    markInputTyped() {
      hasTypedSinceFocus = true;
    },
    resetInputInteraction() {
      hasTypedSinceFocus = false;
      open = false;
      onOpenChange?.(false);
    },
    isSelected,
    select,
    serializeValue(itemValue: unknown): string {
      const option = serializedOptions.find((entry) => entry.value === itemValue);
      return option?.serializedValue ?? String(itemValue ?? '');
    }
  });
</script>

{#snippet control()}
  <div bind:this={rootElement} class={cn('relative w-full', className)} {...rest}>
    {#if Array.isArray(value)}
      <ComboboxPrimitive.Root
        type="multiple"
        value={Array.isArray(primitiveValue) ? primitiveValue : []}
        onValueChange={handleMultipleValueChange}
        bind:open={open}
        disabled={disabled}
        inputValue={query}
      >
        {@render children?.()}
      </ComboboxPrimitive.Root>
    {:else}
      <ComboboxPrimitive.Root
        type="single"
        value={Array.isArray(primitiveValue) ? (primitiveValue[0] ?? '') : primitiveValue}
        onValueChange={handleSingleValueChange}
        bind:open={open}
        disabled={disabled}
        inputValue={query}
      >
        {@render children?.()}
      </ComboboxPrimitive.Root>
    {/if}
  </div>
{/snippet}

{#if label || description || errorMessage}
  <Field {label} {labelTooltip} {description} error={errorMessage} {required}>
    {@render control()}
  </Field>
{:else}
  {@render control()}
{/if}
