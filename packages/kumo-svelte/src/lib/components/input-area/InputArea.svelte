<script lang="ts">
  import type { Snippet } from 'svelte';
  import Info from 'phosphor-svelte/lib/Info';
  import { cn } from '$lib/utils/cn';
  import { inputVariants, type KumoInputSize, type KumoInputVariant } from '../input/input-variants';

  type Size = 'xs' | 'sm' | 'base' | 'lg';
  type Variant = 'default' | 'error';
  type ErrorMatch = keyof ValidityState | true;
  type FieldError = string | { message: string; match: ErrorMatch };

  const sizes: Record<Size, string> = {
    xs: 'gap-1 rounded-sm px-1.5 text-xs',
    sm: 'gap-1 rounded-md px-2 text-xs',
    base: 'gap-1.5 rounded-lg px-3 text-base',
    lg: 'gap-2 rounded-lg px-4 text-base'
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
    autoResize?: boolean;
    minRows?: number;
    maxRows?: number;
    rows?: number;
    value?: string;
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
    autoResize = false,
    minRows = 1,
    maxRows,
    rows,
    value = $bindable(''),
    onValueChange,
    oninput,
    required,
    id,
    ...rest
  }: Props = $props();

  const generatedId = `kumo-input-area-${Math.random().toString(36).slice(2)}`;
  const textareaId = $derived(id ?? generatedId);
  const descriptionId = $derived(description ? `${textareaId}-description` : undefined);
  const errorId = $derived(error ? `${textareaId}-error` : undefined);

  let validity = $state<ValidityState | undefined>();
  let textarea = $state<HTMLTextAreaElement>();

  const hasField = $derived(Boolean(label || error || description));
  const normalizedVariant = $derived(variant ?? (error || invalid ? 'error' : 'default'));
  const showError = $derived.by(() => {
    if (!error) return undefined;
    if (typeof error === 'string') return error;
    if (error.match === true) return error.message;
    if (validity?.[error.match]) return error.message;
    return undefined;
  });

  $effect(() => {
    if (!autoResize || !textarea) return;
    const element = textarea;

    const resize = () => {
      const style = getComputedStyle(element);
      const parsePx = (value: string) => Number.parseFloat(value) || 0;
      const padding = parsePx(style.paddingTop) + parsePx(style.paddingBottom);
      const borders = parsePx(style.borderTopWidth) + parsePx(style.borderBottomWidth);
      const borderBox = style.boxSizing === 'border-box';
      const lineHeight = style.lineHeight === 'normal' || !style.lineHeight
        ? parsePx(style.fontSize) * 1.2
        : style.lineHeight.endsWith('px') ? parsePx(style.lineHeight) : parsePx(style.lineHeight) * parsePx(style.fontSize);

      element.style.height = 'auto';
      let height = borderBox ? element.scrollHeight + borders : element.scrollHeight - padding;
      height = Math.max(height, lineHeight * minRows + (borderBox ? padding + borders : 0));
      if (maxRows && maxRows > 0) {
        const maxHeight = lineHeight * maxRows + (borderBox ? padding + borders : 0);
        element.style.overflowY = height > maxHeight ? 'auto' : 'hidden';
        height = Math.min(height, maxHeight);
      } else {
        element.style.overflowY = 'hidden';
      }
      element.style.height = `${height}px`;
    };

    resize();
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(resize);
    observer?.observe(element);
    return () => {
      observer?.disconnect();
      element.style.height = '';
      element.style.overflowY = '';
    };
  });

  function handleInput(event: Event) {
    value = (event.currentTarget as HTMLTextAreaElement).value;
    validity = (event.currentTarget as HTMLTextAreaElement).validity;
    onValueChange?.(value);
    oninput?.(event);
  }
</script>

{#snippet control()}
  <textarea
    bind:this={textarea}
    bind:value
    id={textareaId}
    class={cn(
      'w-full',
      inputVariants({ size: size as KumoInputSize, variant: normalizedVariant as KumoInputVariant, focusIndicator: true }),
      'h-auto py-2',
      autoResize && 'resize-none scroll-pb-2',
      sizes[size],
      normalizedVariant === 'error'
        ? '!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]'
        : 'focus:ring-kumo-focus/50 focus:ring-[1.5px]',
      className
    )}
    aria-invalid={Boolean(showError || invalid) || undefined}
    aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
    {required}
    rows={autoResize ? minRows : rows}
    oninput={handleInput}
    {...rest}
  ></textarea>
{/snippet}

{#if hasField}
  <div class="grid gap-2">
    {#if label}
      <label class="inline-flex items-center gap-1 text-base font-medium text-kumo-default" for={textareaId}>
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
