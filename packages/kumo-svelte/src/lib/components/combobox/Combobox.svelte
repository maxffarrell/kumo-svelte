<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import Field from '$lib/components/field/Field.svelte';
  import { cn } from '$lib/utils/cn';
  import {
    normalizeComboboxItem,
    setComboboxContext,
    type ComboboxItem,
    type ComboboxSize,
    type NormalizedComboboxItem
  } from './context';
  import { createKumoFilter } from '../filter';

  type FieldError = string | { message?: string; match?: boolean };

  export interface Props {
    children?: Snippet;
    class?: string;
    items?: ComboboxItem[];
    options?: ComboboxItem[];
    value?: unknown;
    defaultValue?: unknown;
    open?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    size?: ComboboxSize;
    label?: string | Snippet;
    labelTooltip?: string | Snippet;
    description?: string | Snippet;
    error?: FieldError;
    required?: boolean;
    filter?: ((item: ComboboxItem, query: string) => boolean) | null;
    isItemEqualToValue?: (item: unknown, value: unknown) => boolean;
    onValueChange?: (value: unknown) => void;
    onOpenChange?: (open: boolean) => void;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    items,
    options = [],
    defaultValue,
    value = $bindable(defaultValue),
    open = $bindable(false),
    multiple = false,
    disabled = false,
    size = 'base',
    label,
    labelTooltip,
    description,
    error,
    required,
    filter,
    isItemEqualToValue,
    onValueChange,
    onOpenChange,
    ...rest
  }: Props = $props();

  let query = $state('');
  let rootElement: HTMLDivElement | null = $state(null);
  const { contains } = createKumoFilter();

  const sourceItems = $derived(items ?? options);
  const normalizedItems = $derived(sourceItems.map(normalizeComboboxItem));
  const errorMessage = $derived(
    typeof error === 'string' ? error : error?.match === false ? undefined : error?.message
  );
  const filteredItems = $derived.by<NormalizedComboboxItem[]>(() => {
    const term = query.trim().toLowerCase();
    if (!term) return normalizedItems;
    if (filter === null) return normalizedItems;

    return normalizedItems.filter((item) => {
      if (filter) return filter(item.raw, query);
      return contains(item.label, term) || contains(String(item.value), term);
    });
  });

  function valuesEqual(itemValue: unknown, selectedValue: unknown) {
    if (isItemEqualToValue) return isItemEqualToValue(itemValue, selectedValue);
    if (
      itemValue &&
      selectedValue &&
      typeof itemValue === 'object' &&
      typeof selectedValue === 'object' &&
      'value' in itemValue &&
      'value' in selectedValue
    ) {
      return (itemValue as { value: unknown }).value === (selectedValue as { value: unknown }).value;
    }
    if (itemValue && typeof itemValue === 'object' && 'value' in itemValue) {
      return (itemValue as { value: unknown }).value === selectedValue;
    }
    if (selectedValue && typeof selectedValue === 'object' && 'value' in selectedValue) {
      return itemValue === (selectedValue as { value: unknown }).value;
    }
    return itemValue === selectedValue;
  }

  function isSelected(item: NormalizedComboboxItem) {
    if (multiple) {
      return Array.isArray(value) && value.some((selected) => valuesEqual(item.value, selected));
    }

    return valuesEqual(item.value, value);
  }

  function labelFor(selection: unknown) {
    return normalizedItems.find((item) => valuesEqual(item.value, selection))?.label ?? String(selection ?? '');
  }

  function emit(nextValue: unknown) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function select(item: NormalizedComboboxItem) {
    if (item.disabled || disabled) return;

    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const exists = current.some((selected) => valuesEqual(item.value, selected));
      emit(exists ? current.filter((selected) => !valuesEqual(item.value, selected)) : [...current, item.value]);
      query = '';
      return;
    }

    emit(item.value);
    query = '';
    open = false;
    onOpenChange?.(false);
  }

  function remove(itemValue: unknown) {
    if (!Array.isArray(value)) return;
    emit(value.filter((selected) => !valuesEqual(itemValue, selected)));
  }

  function close() {
    if (!open) return;
    open = false;
    query = '';
    onOpenChange?.(false);
  }

  function handleDocumentPointerDown(event: PointerEvent) {
    if (!rootElement || !open || !(event.target instanceof Node)) return;
    if (!rootElement.contains(event.target)) close();
  }

  function handleFocusOut(event: FocusEvent) {
    if (!rootElement || !open) return;
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && rootElement.contains(nextTarget)) return;
    close();
  }

  onMount(() => {
    document.addEventListener('pointerdown', handleDocumentPointerDown);

    return () => {
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
    };
  });

  setComboboxContext({
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
    },
    get value() {
      return value;
    },
    set value(nextValue: unknown) {
      emit(nextValue);
    },
    get open() {
      return open;
    },
    set open(nextOpen: boolean) {
      open = nextOpen;
      if (!nextOpen) query = '';
      onOpenChange?.(nextOpen);
    },
    get multiple() {
      return multiple;
    },
    get disabled() {
      return disabled;
    },
    get size() {
      return size;
    },
    get invalid() {
      return Boolean(errorMessage);
    },
    isSelected,
    select,
    remove,
    labelFor
  });
</script>

{#snippet control()}
  <div
    bind:this={rootElement}
    onfocusout={handleFocusOut}
    class={cn('relative inline-block max-w-full', className)}
    {...rest}
  >
    {@render children?.()}
  </div>
{/snippet}

{#if label || description || errorMessage}
  <Field {label} {labelTooltip} {description} error={errorMessage} {required}>
    {@render control()}
  </Field>
{:else}
  {@render control()}
{/if}
