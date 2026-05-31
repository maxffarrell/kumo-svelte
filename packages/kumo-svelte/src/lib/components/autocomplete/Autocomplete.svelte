<script lang="ts" module>
  import type { AutocompleteSize } from './context';

  export type AutocompleteContentAlign = 'start' | 'center' | 'end';
  export type AutocompleteContentSide = 'top' | 'right' | 'bottom' | 'left';
  export type KumoAutocompletePart =
    | 'root'
    | 'input-group'
    | 'content'
    | 'list'
    | 'item'
    | 'group'
    | 'group-label'
    | 'collection'
    | 'separator';

  type Offset = number | string;

  const sizes: Record<AutocompleteSize, string> = {
    xs: 'h-5 rounded-sm px-1.5 text-xs',
    sm: 'h-6.5 rounded-md px-2 text-xs',
    base: 'h-9 rounded-lg px-3 text-base',
    lg: 'h-10 rounded-lg px-4 text-base'
  };

  const horizontalAlignClasses: Record<AutocompleteContentAlign, string> = {
    start: 'left-[var(--autocomplete-align-offset)]',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-[var(--autocomplete-align-offset)]'
  };

  const verticalAlignClasses: Record<AutocompleteContentAlign, string> = {
    start: 'top-[var(--autocomplete-align-offset)]',
    center: 'top-1/2 -translate-y-1/2',
    end: 'bottom-[var(--autocomplete-align-offset)]'
  };

  const sideClasses: Record<AutocompleteContentSide, string> = {
    top: 'bottom-full mb-[var(--autocomplete-side-offset)]',
    right: 'left-full ml-[var(--autocomplete-side-offset)]',
    bottom: 'top-full mt-[var(--autocomplete-side-offset)]',
    left: 'right-full mr-[var(--autocomplete-side-offset)]'
  };

  function isUserTextEdit(event: InputEvent) {
    return (
      (event.inputType === 'insertText' && event.data) ||
      event.inputType === 'deleteContentBackward' ||
      event.inputType === 'deleteContentForward'
    );
  }

  function toCssUnit(value: Offset) {
    return typeof value === 'number' ? `${value}px` : value;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import { Check } from 'phosphor-svelte';
  import Field from '$lib/components/field/Field.svelte';
  import { cn } from '$lib/utils/cn';
  import {
    getAutocompleteContext,
    getAutocompleteGroupContext,
    normalizeAutocompleteItem,
    setAutocompleteGroupContext,
    setAutocompleteContext,
    type AutocompleteItem,
    type AutocompleteValue,
    type ItemSnippet,
    type NormalizedAutocompleteItem
  } from './context';
  import { createKumoFilter } from '../filter';

  type FieldError = string | { message?: string; match?: boolean };

  export interface Props {
    __part?: KumoAutocompletePart;
    children?: Snippet | ItemSnippet;
    class?: string;
    items?: AutocompleteItem[];
    value?: AutocompleteValue | AutocompleteItem;
    defaultValue?: AutocompleteValue;
    open?: boolean;
    size?: AutocompleteSize;
    label?: string | Snippet;
    labelTooltip?: string | Snippet;
    description?: string | Snippet;
    error?: FieldError;
    required?: boolean;
    filter?: ((item: AutocompleteItem, query: string) => boolean) | null;
    placeholder?: string;
    disabled?: boolean;
    align?: AutocompleteContentAlign;
    alignOffset?: Offset;
    side?: AutocompleteContentSide;
    sideOffset?: Offset;
    style?: string;
    onValueChange?: (value: AutocompleteValue) => void;
    onOpenChange?: (open: boolean) => void;
    [key: string]: unknown;
  }

  let {
    __part = 'root',
    children,
    class: className,
    items = [],
    defaultValue,
    value = $bindable(defaultValue ?? '') as AutocompleteValue | AutocompleteItem,
    open = $bindable(false),
    size = 'base',
    label,
    labelTooltip,
    description,
    error,
    required,
    filter,
    placeholder,
    disabled,
    align = 'start',
    alignOffset = 0,
    side = 'bottom',
    sideOffset = 4,
    style,
    onValueChange,
    onOpenChange,
    ...rest
  }: Props = $props();

  let query = $state(Array.isArray(value) ? value.join(', ') : String(value ?? ''));
  let hasTypedSinceFocus = $state(false);
  let rootElement: HTMLDivElement;
  const { contains } = createKumoFilter();

  const normalizedItems = $derived(items.map(normalizeAutocompleteItem));
  const item = $derived.by(() => {
    const normalized = normalizeAutocompleteItem(value);
    return { ...normalized, disabled: disabled ?? normalized.disabled };
  });
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
  const context =
    __part === 'input-group' || __part === 'content' || __part === 'list' || __part === 'item'
      ? getAutocompleteContext(`Autocomplete.${__part}`)
      : undefined;
  const groupContext = __part === 'collection' ? getAutocompleteGroupContext() : undefined;
  const positionStyle = $derived(
    `--autocomplete-align-offset: ${toCssUnit(alignOffset)}; --autocomplete-side-offset: ${toCssUnit(sideOffset)};${style ? ` ${style}` : ''}`
  );
  const positionClass = $derived.by(() =>
    side === 'top' || side === 'bottom'
      ? cn(sideClasses[side], horizontalAlignClasses[align])
      : cn(sideClasses[side], verticalAlignClasses[align])
  );

  function valuesEqual(itemValue: string | number, selectedValue: AutocompleteValue) {
    if (Array.isArray(selectedValue)) return selectedValue.some((selected) => itemValue === selected);
    return itemValue === selectedValue;
  }

  function isSelected(item: NormalizedAutocompleteItem) {
    return valuesEqual(item.value, value as AutocompleteValue);
  }

  function select(item: NormalizedAutocompleteItem) {
    if (item.disabled) return;
    value = item.value;
    query = item.label;
    open = false;
    onValueChange?.(item.value);
    onOpenChange?.(false);
  }

  if (__part === 'group') {
    setAutocompleteGroupContext({
      get items() {
        return normalizedItems;
      }
    });
  }

  onMount(() => {
    if (__part !== 'root') return;

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

  if (__part === 'root') {
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
        return value as AutocompleteValue;
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
      select
    });
  }
</script>

{#snippet control()}
  <div bind:this={rootElement} class={cn('relative w-full', className)} {...rest}>
    {@render (children as Snippet)?.()}
  </div>
{/snippet}

{#if __part === 'root' && (label || description || errorMessage)}
  <Field {label} {labelTooltip} {description} error={errorMessage} {required}>
    {@render control()}
  </Field>
{:else if __part === 'root'}
  {@render control()}
{:else if __part === 'input-group' && context}
  <input
    class={cn(
      'w-full border-0 bg-kumo-control text-kumo-default shadow-xs ring ring-kumo-line outline-none focus:outline-none',
      'placeholder:text-kumo-placeholder disabled:text-kumo-disabled',
      context.invalid
        ? '!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]'
        : 'focus:ring-kumo-focus/50 focus:ring-[1.5px]',
      sizes[size ?? context.size],
      className
    )}
    value={context.query}
    {placeholder}
    aria-invalid={context.invalid || undefined}
    onbeforeinput={(event) => {
      if (isUserTextEdit(event)) {
        context.markInputTyped();
      }
    }}
    oninput={(event) => {
      const inputEvent = event as unknown as InputEvent;
      if (isUserTextEdit(inputEvent)) {
        context.markInputTyped();
      }
      context.query = (event.currentTarget as HTMLInputElement).value;
      if (context.hasTypedSinceFocus) context.open = true;
    }}
    onfocus={() => context.resetInputInteraction()}
    onkeydown={(event) => {
      if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
        context.markInputTyped();
      }
      if (event.key === 'Escape') context.open = false;
    }}
    {...rest}
  />
{:else if __part === 'content' && context}
  {#if context.open && context.hasTypedSinceFocus && context.filteredItems.length}
    <div
      class={cn(
        'absolute z-50 flex max-h-[min(24rem,calc(100vh-8rem))] min-w-full flex-col overflow-hidden rounded-lg bg-kumo-control py-1.5 text-kumo-default shadow-lg ring ring-kumo-line',
        positionClass,
        className
      )}
      style={positionStyle}
      {...rest}
    >
      {@render (children as Snippet)?.()}
    </div>
  {/if}
{:else if __part === 'list' && context}
  <div
    class={cn('min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-pb-2 scroll-pt-2', className)}
    {...rest}
  >
    {#each context.filteredItems as item (item.value)}
      {@render (children as ItemSnippet)?.(item.raw)}
    {/each}
  </div>
{:else if __part === 'item' && context}
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
    <span class="col-start-1 min-w-0 truncate">{@render (children as Snippet)?.()}</span>
    {#if context.isSelected(item)}
      <Check class="col-start-2 size-3.5 self-center text-kumo-default" aria-hidden="true" />
    {/if}
  </button>
{:else if __part === 'group'}
  <div
    class={cn('mt-2 border-t border-kumo-line pt-2 first:mt-0 first:border-t-0 first:pt-0', className)}
    {...rest}
  >
    {@render (children as Snippet)?.()}
  </div>
{:else if __part === 'group-label'}
  <div class={cn('mx-1.5 px-2 py-1.5 text-sm text-kumo-strong', className)} {...rest}>
    {@render (children as Snippet)?.()}
  </div>
{:else if __part === 'collection'}
  <div class={cn('contents', className)} {...rest}>
    {#each groupContext?.items ?? [] as item (item.value)}
      {@render (children as ItemSnippet)?.(item.raw)}
    {/each}
  </div>
{:else if __part === 'separator'}
  <div class={cn('mx-0 my-1 h-px bg-kumo-line', className)} {...rest}></div>
{/if}
