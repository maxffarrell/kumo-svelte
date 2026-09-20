<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  export const KUMO_TAG_INPUT_VARIANTS = {
    variant: {
      default: { classes: '', description: 'Default tag input appearance.' },
      error: { classes: '', description: 'Error state for validation failures.' }
    }
  } as const;

  export const KUMO_TAG_INPUT_DEFAULT_VARIANTS = { variant: 'default' } as const;
  export const KUMO_TAG_INPUT_STYLING = { baseClasses: 'flex flex-wrap items-center' } as const;

  export interface TagInputLabels {
    input?: string;
    removeValue?: (value: string) => string;
    invalidValue?: (value: string) => string;
    maxValuesReached?: (maxValues: number) => string;
  }

  export type TagInputFieldText = string | Snippet;
  export type TagInputError = string | { message: TagInputFieldText; match: boolean | string };
</script>

<script lang="ts">
  import X from 'phosphor-svelte/lib/X';
  import { Button } from '$lib/components/button';
  import { inputVariants, type KumoInputVariant } from '$lib/components/input/input-variants';
  import { cn } from '$lib/utils/cn';

  interface Props {
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    validateValue?: (value: string, acceptedValues: string[]) => boolean;
    maxValues?: number;
    labels?: TagInputLabels;
    label?: string | Snippet;
    labelTooltip?: string | Snippet;
    description?: string | Snippet;
    error?: TagInputError;
    variant?: KumoInputVariant;
    disabled?: boolean;
    class?: string;
    placeholder?: string;
    id?: string;
    autocomplete?: HTMLInputAttributes['autocomplete'];
    onblur?: (event: FocusEvent) => void;
    oninput?: (event: Event) => void;
    onkeydown?: (event: KeyboardEvent) => void;
    onpaste?: (event: ClipboardEvent) => void;
    [key: string]: unknown;
  }

  const DEFAULT_LABELS: Required<TagInputLabels> = {
    input: 'Add tag',
    removeValue: (value) => `Remove ${value}`,
    invalidValue: (value) => `"${value}" is not valid.`,
    maxValuesReached: (maxValues) => `Limit of ${maxValues} tags reached.`
  };

  let {
    value = $bindable(),
    defaultValue = [],
    onValueChange,
    validateValue,
    maxValues,
    labels,
    label,
    labelTooltip,
    description,
    error,
    variant,
    disabled = false,
    class: className,
    placeholder,
    id,
    autocomplete = 'off',
    onblur,
    oninput,
    onkeydown,
    onpaste,
    'aria-label': ariaLabel,
    ...rest
  }: Props = $props();

  const componentId = $props.id();
  let inputValue = $state('');
  let message = $state<string>();
  const inputId = $derived(id ?? `kumo-tag-input-${componentId}`);
  const descriptionId = $derived(description ? `${inputId}-description` : undefined);
  const errorId = $derived(error || message ? `${inputId}-error` : undefined);
  const values = $derived(value ?? defaultValue);
  const fieldError = $derived(error ? (typeof error === 'string' ? error : error.message) : message);
  const inputVariant = $derived(variant ?? (fieldError ? 'error' : 'default'));
  const hasField = $derived(Boolean(label || description || fieldError));
  const resolvedAriaLabel = $derived(
    ariaLabel ?? (typeof label === 'string' ? label : (labels?.input ?? DEFAULT_LABELS.input))
  );

  function splitValues(rawValue: string) {
    return rawValue
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function setValues(nextValue: string[]) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function commit(rawValue: string) {
    const entries = splitValues(rawValue);
    const nextValues = [...values];
    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      if (nextValues.includes(entry)) continue;
      if (maxValues !== undefined && nextValues.length >= maxValues) {
        inputValue = entries.slice(index).join(', ');
        message = (labels?.maxValuesReached ?? DEFAULT_LABELS.maxValuesReached)(maxValues);
        setValues(nextValues);
        return false;
      }
      if (validateValue && !validateValue(entry, nextValues)) {
        inputValue = entries.slice(index).join(', ');
        message = (labels?.invalidValue ?? DEFAULT_LABELS.invalidValue)(entry);
        setValues(nextValues);
        return false;
      }
      nextValues.push(entry);
    }
    setValues(nextValues);
    inputValue = '';
    message = undefined;
    return true;
  }

  function handleInput(event: Event) {
    inputValue = (event.currentTarget as HTMLInputElement).value;
    message = undefined;
    oninput?.(event);
  }

  function handleKeydown(event: KeyboardEvent) {
    onkeydown?.(event);
    if (event.defaultPrevented) return;
    if (!inputValue && event.key === 'Backspace') {
      setValues(values.slice(0, -1));
      return;
    }
    if (!inputValue || !['Enter', ',', 'Tab'].includes(event.key)) return;
    const didCommit = commit(inputValue);
    if (event.key !== 'Tab' || didCommit) event.preventDefault();
  }

  function handlePaste(event: ClipboardEvent) {
    onpaste?.(event);
    if (event.defaultPrevented) return;
    const text = event.clipboardData?.getData('text') ?? '';
    if (!/[\n,]/.test(text)) return;
    event.preventDefault();
    commit(text);
  }

  function handleBlur(event: FocusEvent) {
    onblur?.(event);
    if (!event.defaultPrevented) commit(inputValue);
  }
</script>

{#snippet control()}
  <div
    data-kumo-component="TagInput"
    class={cn(
      inputVariants({ variant: inputVariant, parentFocusIndicator: true }),
      'flex h-auto min-h-9 flex-wrap items-center gap-x-2 gap-y-1.5 px-2 py-1.5',
      className
    )}
  >
    {#each values as item (item)}
      <span class="flex h-6 w-fit max-w-full shrink-0 items-center gap-2.5 rounded-sm bg-kumo-overlay py-0 pr-[3px] pl-2 text-sm text-kumo-default ring-1 ring-kumo-hairline">
        <span class="truncate">{item}</span>
        <Button
          aria-label={(labels?.removeValue ?? DEFAULT_LABELS.removeValue)(item)}
          icon={X}
          shape="square"
          size="xs"
          variant="ghost"
          {disabled}
          onmousedown={(event: MouseEvent) => event.preventDefault()}
          onclick={() => setValues(values.filter((value) => value !== item))}
        />
      </span>
    {/each}
    <input
      {...rest}
      id={inputId}
      aria-invalid={Boolean(fieldError) || undefined}
      aria-label={resolvedAriaLabel}
      aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
      class="min-w-32 flex-1 border-0 bg-transparent px-1 py-0.5 outline-none"
      {disabled}
      {autocomplete}
      {placeholder}
      value={inputValue}
      onblur={handleBlur}
      oninput={handleInput}
      onkeydown={handleKeydown}
      onpaste={handlePaste}
    />
  </div>
{/snippet}

{#if hasField}
  <div class="grid gap-2">
    {#if label}
      <label class="inline-flex items-center gap-1 text-base font-medium text-kumo-default" for={inputId}>
        {#if typeof label === 'function'}{@render label()}{:else}{label}{/if}
        {#if labelTooltip}
          <span class="text-kumo-muted" title={typeof labelTooltip === 'string' ? labelTooltip : undefined}>
            {#if typeof labelTooltip === 'function'}{@render labelTooltip()}{/if}
          </span>
        {/if}
      </label>
    {/if}
    {@render control()}
    {#if fieldError}
      <div id={errorId} class="text-sm leading-snug text-kumo-danger">
        {#if typeof fieldError === 'function'}{@render fieldError()}{:else}{fieldError}{/if}
      </div>
    {:else if description}
      <div id={descriptionId} class="text-sm leading-snug text-kumo-subtle">
        {#if typeof description === 'function'}{@render description()}{:else}{description}{/if}
      </div>
    {/if}
  </div>
{:else}
  {@render control()}
{/if}
