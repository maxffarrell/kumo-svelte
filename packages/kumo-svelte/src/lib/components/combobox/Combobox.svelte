<script module lang="ts">
  import { CaretDown, Check, X } from 'phosphor-svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import {
    getComboboxContext,
    getComboboxGroupContext,
    iconSizes,
    inputStyles,
    normalizeComboboxItem,
    setComboboxGroupContext,
    type ComboboxInputSide,
    type ComboboxItem,
    type ComboboxSize,
    type ItemSnippet
  } from './context';

  type ComboboxContentAlign = 'start' | 'center' | 'end';
  type ComboboxContentSide = 'top' | 'right' | 'bottom' | 'left';
  type Offset = number | string;
  export type KumoComboboxPart =
    | 'root'
    | 'content'
    | 'trigger-input'
    | 'trigger-value'
    | 'trigger-multiple-with-input'
    | 'item'
    | 'chip'
    | 'input'
    | 'empty'
    | 'group'
    | 'group-label'
    | 'list'
    | 'collection'
    | 'trigger'
    | 'value'
    | 'icon';

  export {
    Chip,
    Collection,
    Content,
    Empty,
    Group,
    GroupLabel,
    Icon,
    Input,
    Item,
    List,
    Trigger,
    TriggerInput,
    TriggerMultipleWithInput,
    TriggerValue,
    Value
  };

  export interface Props {
    __part?: KumoComboboxPart;
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
    error?: string | { message?: string; match?: boolean };
    required?: boolean;
    filter?: ((item: ComboboxItem, query: string) => boolean) | null;
    isItemEqualToValue?: (item: unknown, value: unknown) => boolean;
    onValueChange?: (value: unknown) => void;
    onOpenChange?: (open: boolean) => void;
    [key: string]: unknown;
  }

  export interface ContentProps {
    children?: Snippet;
    class?: string;
    align?: ComboboxContentAlign;
    alignOffset?: Offset;
    side?: ComboboxContentSide;
    sideOffset?: Offset;
    style?: string;
    [key: string]: unknown;
  }

  export interface TriggerInputProps {
    class?: string;
    placeholder?: string;
    size?: ComboboxSize;
    clearLabel?: string;
    showOptionsLabel?: string;
    [key: string]: unknown;
  }

  export interface TriggerValueProps {
    class?: string;
    placeholder?: string;
    size?: ComboboxSize;
    [key: string]: unknown;
  }

  export interface TriggerMultipleWithInputProps {
    children?: Snippet<[any]>;
    class?: string;
    placeholder?: string;
    inputSide?: ComboboxInputSide;
    value?: unknown[];
    [key: string]: unknown;
  }

  export interface ItemProps {
    children?: Snippet;
    class?: string;
    value: ComboboxItem;
    disabled?: boolean;
    [key: string]: unknown;
  }

  export interface ChipProps {
    children?: Snippet;
    class?: string;
    value?: unknown;
    removeLabel?: string;
    [key: string]: unknown;
  }

  export interface InputProps {
    class?: string;
    placeholder?: string;
    [key: string]: unknown;
  }

  export interface EmptyProps {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  export interface GroupProps {
    children?: Snippet;
    class?: string;
    items?: ComboboxItem[];
    [key: string]: unknown;
  }

  export interface ListProps {
    children?: ItemSnippet;
    class?: string;
    [key: string]: unknown;
  }

  export interface CollectionProps {
    children?: ItemSnippet;
    class?: string;
    [key: string]: unknown;
  }

  export interface TriggerProps {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  export interface ValueProps {
    children?: Snippet;
    [key: string]: unknown;
  }

  export interface GroupLabelProps {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  export interface IconProps {
    children?: Snippet;
    [key: string]: unknown;
  }

  function toCssUnit(value: Offset) {
    return typeof value === 'number' ? `${value}px` : value;
  }

  function itemKey(item: unknown) {
    return typeof item === 'object' && item && 'value' in item ? String(item.value) : String(item);
  }

  const contentHorizontalAlignClasses: Record<ComboboxContentAlign, string> = {
    start: 'left-[var(--combobox-align-offset)]',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-[var(--combobox-align-offset)]'
  };

  const contentVerticalAlignClasses: Record<ComboboxContentAlign, string> = {
    start: 'top-[var(--combobox-align-offset)]',
    center: 'top-1/2 -translate-y-1/2',
    end: 'bottom-[var(--combobox-align-offset)]'
  };

  const contentSideClasses: Record<ComboboxContentSide, string> = {
    top: 'bottom-full mb-[var(--combobox-side-offset)]',
    right: 'left-full ml-[var(--combobox-side-offset)]',
    bottom: 'top-full mt-[var(--combobox-side-offset)]',
    left: 'right-full mr-[var(--combobox-side-offset)]'
  };

  const triggerInputIconPadding: Record<ComboboxSize, string> = { xs: 'pr-7', sm: 'pr-9', base: 'pr-12', lg: 'pr-14' };
  const triggerInputClearRight: Record<ComboboxSize, string> = { xs: 'right-5', sm: 'right-6', base: 'right-8', lg: 'right-9' };
  const triggerInputCaretRight: Record<ComboboxSize, string> = { xs: 'right-1', sm: 'right-1.5', base: 'right-2', lg: 'right-3' };
  const triggerValueIconPadding: Record<ComboboxSize, string> = { xs: 'pr-5', sm: 'pr-6', base: 'pr-8', lg: 'pr-10' };
  const triggerValueIconRight: Record<ComboboxSize, string> = { xs: 'right-1', sm: 'right-1.5', base: 'right-2', lg: 'right-3' };
  const multipleTriggerMinHeight: Record<ComboboxSize, string> = { xs: 'min-h-5', sm: 'min-h-6.5', base: 'min-h-9', lg: 'min-h-10' };

  function contentPositionStyle(alignOffset: Offset, sideOffset: Offset, style?: string) {
    return `--combobox-align-offset: ${toCssUnit(alignOffset)}; --combobox-side-offset: ${toCssUnit(sideOffset)};${style ? ` ${style}` : ''}`;
  }

  function contentPositionClass(side: ComboboxContentSide, align: ComboboxContentAlign) {
    return side === 'top' || side === 'bottom'
      ? cn(contentSideClasses[side], contentHorizontalAlignClasses[align])
      : cn(contentSideClasses[side], contentVerticalAlignClasses[align]);
  }

  function comboboxContext(component: string) {
    return getComboboxContext(component);
  }

  function triggerInputSize(size: ComboboxSize | undefined) {
    return size ?? comboboxContext('Combobox.TriggerInput').size;
  }

  function triggerInputDisplayValue(size: ComboboxSize | undefined) {
    const context = comboboxContext('Combobox.TriggerInput');
    return context.open || context.multiple ? context.query : context.labelFor(context.value);
  }

  function triggerInputHasValue() {
    const context = comboboxContext('Combobox.TriggerInput');
    return context.multiple ? Array.isArray(context.value) && context.value.length > 0 : Boolean(context.value);
  }

  function triggerValueSize(size: ComboboxSize | undefined) {
    return size ?? comboboxContext('Combobox.TriggerValue').size;
  }

  function triggerValueDisplayValue() {
    const context = comboboxContext('Combobox.TriggerValue');
    return context.labelFor(context.value);
  }

  function selectedValues(value: unknown[] | undefined) {
    const context = comboboxContext('Combobox.TriggerMultipleWithInput');
    return value ?? (Array.isArray(context.value) ? context.value : []);
  }

  function comboboxItem(value: ComboboxItem, disabled: boolean | undefined) {
    const normalized = normalizeComboboxItem(value);
    return { ...normalized, disabled: disabled ?? normalized.disabled };
  }

  function isComboboxItemSelected(value: ComboboxItem, disabled: boolean | undefined) {
    return comboboxContext('Combobox.Item').isSelected(comboboxItem(value, disabled));
  }

  function groupItems(items: ComboboxItem[]) {
    return items.map(normalizeComboboxItem);
  }

  function groupContext(items: ComboboxItem[]) {
    const normalizedItems = groupItems(items);
    return {
      get items() {
        return normalizedItems;
      }
    };
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import Field from '$lib/components/field/Field.svelte';
  import {
    setComboboxContext,
    type NormalizedComboboxItem
  } from './context';
  import { createKumoFilter } from '../filter';

  let {
    __part = 'root',
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
  const partProps = $derived({
    children,
    class: className,
    items,
    options,
    defaultValue,
    value,
    open,
    multiple,
    disabled,
    size,
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
  } as never);

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

  if (__part === 'root') {
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
  }
</script>

{#snippet Content({
  children,
  class: className,
  align = 'start',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  style,
  ...rest
}: ContentProps)}
  {#if comboboxContext('Combobox.Content').open}
    <div
      class={cn(
        'absolute z-50 flex max-h-[min(24rem,calc(100vh-8rem))] min-w-full flex-col overflow-hidden rounded-lg bg-kumo-base py-1.5 text-base text-kumo-default shadow-lg ring ring-kumo-line',
        contentPositionClass(side, align),
        className
      )}
      style={contentPositionStyle(alignOffset, sideOffset, style)}
      {...rest}
    >
      {@render children?.()}
    </div>
  {/if}
{/snippet}

{#snippet TriggerInput({
  class: className,
  placeholder,
  size,
  clearLabel = 'Clear selection',
  showOptionsLabel = 'Show options',
  ...rest
}: TriggerInputProps)}
  <div
    class={cn(
      'relative inline-block w-full max-w-xs',
      'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
      className
    )}
  >
    <input
      class={cn(
        inputStyles[triggerInputSize(size)],
        'w-full border-0 bg-kumo-control text-kumo-default shadow-xs ring ring-kumo-line outline-none',
        'placeholder:text-kumo-placeholder disabled:cursor-not-allowed disabled:text-kumo-disabled',
        comboboxContext('Combobox.TriggerInput').invalid
          ? '!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]'
          : 'focus:ring-kumo-focus/50 focus:ring-[1.5px]',
        triggerInputIconPadding[triggerInputSize(size)]
      )}
      value={triggerInputDisplayValue(size)}
      {placeholder}
      disabled={comboboxContext('Combobox.TriggerInput').disabled}
      aria-invalid={comboboxContext('Combobox.TriggerInput').invalid || undefined}
      oninput={(event) => {
        comboboxContext('Combobox.TriggerInput').query = (event.currentTarget as HTMLInputElement).value;
        comboboxContext('Combobox.TriggerInput').open = true;
      }}
      onfocus={() => (comboboxContext('Combobox.TriggerInput').open = true)}
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
        triggerInputClearRight[triggerInputSize(size)]
      )}
      disabled={comboboxContext('Combobox.TriggerInput').disabled || !triggerInputHasValue()}
      onclick={() => (comboboxContext('Combobox.TriggerInput').value = comboboxContext('Combobox.TriggerInput').multiple ? [] : null)}
    >
      <X size={iconSizes[triggerInputSize(size)]} />
    </button>

    <button
      type="button"
      aria-label={showOptionsLabel}
      data-kumo-component="Combobox"
      data-kumo-part="trigger"
      class={cn(
        'absolute top-1/2 m-0 flex -translate-y-1/2 cursor-pointer items-center justify-center bg-transparent p-0 text-kumo-subtle',
        triggerInputCaretRight[triggerInputSize(size)]
      )}
      disabled={comboboxContext('Combobox.TriggerInput').disabled}
      onclick={() => (comboboxContext('Combobox.TriggerInput').open = !comboboxContext('Combobox.TriggerInput').open)}
    >
      <CaretDown size={iconSizes[triggerInputSize(size)]} class="fill-current" />
    </button>
  </div>
{/snippet}

{#snippet TriggerValue({ class: className, placeholder, size, ...rest }: TriggerValueProps)}
  <button
    type="button"
    class={cn(
      inputStyles[triggerValueSize(size)],
      'relative flex w-full items-center border-0 bg-kumo-control text-left font-normal text-kumo-default shadow-xs ring ring-kumo-line outline-none',
      'focus:ring-kumo-focus/50 focus:ring-[1.5px] disabled:cursor-not-allowed disabled:opacity-50',
      !triggerValueDisplayValue() && 'text-kumo-placeholder',
      triggerValueIconPadding[triggerValueSize(size)],
      className
    )}
    disabled={comboboxContext('Combobox.TriggerValue').disabled}
    data-kumo-component="Combobox"
    data-kumo-part="trigger"
    onclick={() => (comboboxContext('Combobox.TriggerValue').open = !comboboxContext('Combobox.TriggerValue').open)}
    {...rest}
  >
    <span class="min-w-0 flex-1 truncate">{triggerValueDisplayValue() || placeholder}</span>
    <span class={cn('absolute top-1/2 flex -translate-y-1/2 items-center text-kumo-subtle', triggerValueIconRight[triggerValueSize(size)])}>
      <CaretDown size={iconSizes[triggerValueSize(size)]} class="fill-current" />
    </span>
  </button>
{/snippet}

{#snippet TriggerMultipleWithInput({
  children,
  class: className,
  placeholder,
  inputSide = 'right',
  value,
  ...rest
}: TriggerMultipleWithInputProps)}
  <div
    class={cn(
      inputStyles[comboboxContext('Combobox.TriggerMultipleWithInput').size],
      'flex h-auto flex-col gap-1 border-0 bg-kumo-control px-1.5 py-1 text-kumo-default shadow-xs ring ring-kumo-line outline-none',
      multipleTriggerMinHeight[comboboxContext('Combobox.TriggerMultipleWithInput').size],
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      className
    )}
    data-disabled={comboboxContext('Combobox.TriggerMultipleWithInput').disabled || undefined}
    {...rest}
  >
    {#if inputSide === 'top'}
      <input
        class="w-full border-0 bg-inherit px-2 py-1 outline-none placeholder:text-kumo-placeholder"
        {placeholder}
        value={comboboxContext('Combobox.TriggerMultipleWithInput').query}
        disabled={comboboxContext('Combobox.TriggerMultipleWithInput').disabled}
        oninput={(event) => {
          comboboxContext('Combobox.TriggerMultipleWithInput').query = (event.currentTarget as HTMLInputElement).value;
          comboboxContext('Combobox.TriggerMultipleWithInput').open = true;
        }}
        onfocus={() => (comboboxContext('Combobox.TriggerMultipleWithInput').open = true)}
      />
    {/if}
    <div class="flex flex-1 flex-wrap items-center gap-1.5">
      {#each selectedValues(value) as selected (itemKey(selected))}
        {@render children?.(selected)}
      {/each}
      {#if inputSide === 'right'}
        <input
          class="min-w-[100px] flex-1 border-0 bg-inherit px-2 py-1 outline-none placeholder:text-kumo-placeholder"
          {placeholder}
          value={comboboxContext('Combobox.TriggerMultipleWithInput').query}
          disabled={comboboxContext('Combobox.TriggerMultipleWithInput').disabled}
          oninput={(event) => {
            comboboxContext('Combobox.TriggerMultipleWithInput').query = (event.currentTarget as HTMLInputElement).value;
            comboboxContext('Combobox.TriggerMultipleWithInput').open = true;
          }}
          onfocus={() => (comboboxContext('Combobox.TriggerMultipleWithInput').open = true)}
        />
      {/if}
    </div>
  </div>
{/snippet}

{#snippet Item({ children, class: className, value, disabled, ...rest }: ItemProps)}
  <button
    type="button"
    disabled={comboboxItem(value, disabled).disabled}
    data-kumo-component="Combobox"
    data-kumo-part="item"
    class={cn(
      'group mx-1.5 grid w-[calc(100%-0.75rem)] grid-cols-[1fr_16px] gap-2 rounded px-2 py-1.5 text-left text-base outline-none',
      'cursor-pointer hover:bg-kumo-tint focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-kumo-subtle disabled:opacity-60 disabled:hover:bg-transparent',
      className
    )}
    onclick={() => comboboxContext('Combobox.Item').select(comboboxItem(value, disabled))}
    {...rest}
  >
    <span class="col-start-1 min-w-0 truncate">{@render children?.()}</span>
    {#if isComboboxItemSelected(value, disabled)}
      <Check class="col-start-2 size-4 self-center text-kumo-default" aria-hidden="true" />
    {/if}
  </button>
{/snippet}

{#snippet Chip({ children, class: className, value, removeLabel = 'Remove', ...rest }: ChipProps)}
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
      onclick={() => comboboxContext('Combobox.Chip').remove(value)}
    >
      <X size={10} />
    </button>
  </span>
{/snippet}

{#snippet Input({ class: className, placeholder, ...rest }: InputProps)}
  <input
    class={cn(inputStyles[comboboxContext('Combobox.Input').size], 'mx-1.5 w-[calc(100%-0.75rem)] shrink-0 first:mb-2 border-0 bg-kumo-control text-kumo-default ring ring-kumo-line outline-none placeholder:text-kumo-placeholder focus:ring-kumo-focus/50 focus:ring-[1.5px]', className)}
    value={comboboxContext('Combobox.Input').query}
    {placeholder}
    disabled={comboboxContext('Combobox.Input').disabled}
    oninput={(event) => {
      comboboxContext('Combobox.Input').query = (event.currentTarget as HTMLInputElement).value;
      comboboxContext('Combobox.Input').open = true;
    }}
    {...rest}
  />
{/snippet}

{#snippet Empty({ children, class: className, ...rest }: EmptyProps)}
  {#if comboboxContext('Combobox.Empty').filteredItems.length === 0}
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
{/snippet}

{#snippet Group({ children, class: className, items = [], ...rest }: GroupProps)}
  {setComboboxGroupContext(groupContext(items))}

  <div class={cn('mt-2 border-t border-kumo-hairline pt-2 first:mt-0 first:border-t-0 first:pt-0', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet List({ children, class: className, ...rest }: ListProps)}
  <div
    class={cn('min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-pb-2 scroll-pt-2', className)}
    {...rest}
  >
    {#if children}
      {#each comboboxContext('Combobox.List').filteredItems as item (item.label)}
        {@render children(item.raw)}
      {/each}
    {/if}
  </div>
{/snippet}

{#snippet Collection({ children, class: className, ...rest }: CollectionProps)}
  <div class={cn('contents', className)} {...rest}>
    {#each getComboboxGroupContext()?.items ?? [] as item (item.label)}
      {@render children?.(item.raw)}
    {/each}
  </div>
{/snippet}

{#snippet Trigger({ children, class: className, ...rest }: TriggerProps)}
  <button
    type="button"
    class={cn('inline-flex items-center gap-2', className)}
    disabled={comboboxContext('Combobox.Trigger').disabled}
    data-kumo-component="Combobox"
    data-kumo-part="trigger"
    onclick={() => (comboboxContext('Combobox.Trigger').open = !comboboxContext('Combobox.Trigger').open)}
    {...rest}
  >
    {@render children?.()}
  </button>
{/snippet}

{#snippet Value({ children, ...rest }: ValueProps)}
  <span {...rest}>
    {#if children}
      {@render children()}
    {:else}
      {comboboxContext('Combobox.Value').labelFor(comboboxContext('Combobox.Value').value)}
    {/if}
  </span>
{/snippet}

{#snippet GroupLabel({ children, class: className, ...rest }: GroupLabelProps)}
  <div class={cn('mx-1.5 px-2 py-1.5 text-sm text-kumo-subtle', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet Icon({ children, ...rest }: IconProps)}
  <span {...rest}>
    {@render children?.()}
  </span>
{/snippet}

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

{#if __part === 'content'}
  {@render Content(partProps)}
{:else if __part === 'trigger-input'}
  {@render TriggerInput(partProps)}
{:else if __part === 'trigger-value'}
  {@render TriggerValue(partProps)}
{:else if __part === 'trigger-multiple-with-input'}
  {@render TriggerMultipleWithInput(partProps)}
{:else if __part === 'item'}
  {@render Item(partProps)}
{:else if __part === 'chip'}
  {@render Chip(partProps)}
{:else if __part === 'input'}
  {@render Input(partProps)}
{:else if __part === 'empty'}
  {@render Empty(partProps)}
{:else if __part === 'group'}
  {@render Group(partProps)}
{:else if __part === 'group-label'}
  {@render GroupLabel(partProps)}
{:else if __part === 'list'}
  {@render List(partProps)}
{:else if __part === 'collection'}
  {@render Collection(partProps)}
{:else if __part === 'trigger'}
  {@render Trigger(partProps)}
{:else if __part === 'value'}
  {@render Value(partProps)}
{:else if __part === 'icon'}
  {@render Icon(partProps)}
{:else if label || description || errorMessage}
  <Field {label} {labelTooltip} {description} error={errorMessage} {required}>
    {@render control()}
  </Field>
{:else}
  {@render control()}
{/if}
