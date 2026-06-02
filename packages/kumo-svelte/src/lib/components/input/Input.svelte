<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Info } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';

  type Size = 'xs' | 'sm' | 'base' | 'lg';
  type Variant = 'default' | 'error';
  type ErrorMatch = keyof ValidityState | true;
  type FieldError = string | { message: string; match: ErrorMatch };

  const sizes: Record<Size, string> = {
    xs: 'h-5 gap-1 rounded-sm px-1.5 text-xs',
    sm: 'h-6.5 gap-1 rounded-md px-2 text-xs',
    base: 'h-9 gap-1.5 rounded-lg px-3 text-base',
    lg: 'h-10 gap-2 rounded-lg px-4 text-base'
  };

  interface Props {
    class?: string;
    size?: Size;
    variant?: Variant;
    invalid?: boolean;
    label?: string | Snippet;
    labelTooltip?: string | Snippet;
    description?: string;
    error?: FieldError;
    passwordManagerIgnore?: boolean;
    value?: string | number;
    onValueChange?: (value: string) => void;
    oninput?: (event: Event) => void;
    required?: boolean;
    id?: string;
    [key: string]: unknown;
  }

  let {
    class: className,
    size = 'base',
    variant,
    invalid = false,
    label,
    labelTooltip,
    description,
    error,
    passwordManagerIgnore = false,
    value = $bindable(''),
    onValueChange,
    oninput,
    required,
    id,
    ...rest
  }: Props = $props();

  const generatedId = `kumo-input-${Math.random().toString(36).slice(2)}`;
  const inputId = $derived(id ?? generatedId);
  const descriptionId = $derived(description ? `${inputId}-description` : undefined);
  const errorId = $derived(error ? `${inputId}-error` : undefined);

  let validity = $state<ValidityState | undefined>();

  const hasField = $derived(Boolean(label || error || description));
  const normalizedVariant = $derived(variant ?? (error || invalid ? 'error' : 'default'));
  const showError = $derived.by(() => {
    if (!error) return undefined;
    if (typeof error === 'string') return error;
    if (error.match === true) return error.message;
    if (validity?.[error.match]) return error.message;
    return undefined;
  });

  function handleInput(event: Event) {
    value = (event.currentTarget as HTMLInputElement).value;
    validity = (event.currentTarget as HTMLInputElement).validity;
    onValueChange?.(String(value));
    oninput?.(event);
  }
</script>

{#snippet control()}
  <input
    bind:value
    id={inputId}
    class={cn(
      'block w-full border-0 bg-kumo-control text-kumo-default ring ring-kumo-line outline-none focus:outline-none',
      'placeholder:text-kumo-muted disabled:text-kumo-disabled',
      sizes[size],
      normalizedVariant === 'error'
        ? '!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]'
        : 'focus:ring-kumo-focus/50 focus:ring-[1.5px]',
      passwordManagerIgnore && 'keeper-ignore',
      className
    )}
    aria-invalid={Boolean(showError || invalid) || undefined}
    aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
    data-1p-ignore={passwordManagerIgnore ? 'true' : undefined}
    data-bwignore={passwordManagerIgnore ? 'true' : undefined}
    data-form-type={passwordManagerIgnore ? 'other' : undefined}
    data-lpignore={passwordManagerIgnore ? 'true' : undefined}
    {required}
    oninput={handleInput}
    {...rest}
  />
{/snippet}

{#if hasField}
  <div class="grid gap-2">
    {#if label}
      <label class="inline-flex items-center gap-1 text-base font-medium text-kumo-default" for={inputId}>
        {#if typeof label === 'function'}{@render label()}{:else}{label}{/if}
        {#if required}<span class="text-kumo-danger">*</span>{/if}
        {#if required === false}<span class="font-normal text-kumo-subtle">(optional)</span>{/if}
        {#if labelTooltip}
          <span class="inline-flex text-kumo-muted" title={typeof labelTooltip === 'string' ? labelTooltip : undefined}>
            <Info class="size-3.5" aria-hidden="true" />
            {#if typeof labelTooltip === 'function'}<span class="sr-only">{@render labelTooltip()}</span>{/if}
          </span>
        {/if}
      </label>
    {/if}
    {@render control()}
    {#if showError}
      <div id={errorId} class="text-sm leading-snug text-kumo-danger">{showError}</div>
    {:else if description}
      <div id={descriptionId} class="text-sm leading-snug text-kumo-subtle">{description}</div>
    {/if}
  </div>
{:else}
  {@render control()}
{/if}
