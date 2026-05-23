<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import {
    INPUT_GROUP_HAS_CLASSES,
    setInputGroupContext,
    type FieldError,
    type InputGroupFocusMode,
    type InputGroupSize
  } from './context';

  const sizes: Record<InputGroupSize, string> = {
    xs: 'h-6 text-xs rounded-sm',
    sm: 'h-7 text-xs rounded-md',
    base: 'h-9 text-base rounded-lg',
    lg: 'h-11 text-base rounded-lg'
  };

  interface Props {
    children?: Snippet;
    class?: string;
    size?: InputGroupSize;
    focusMode?: InputGroupFocusMode;
    disabled?: boolean;
    label?: string | Snippet;
    labelTooltip?: string | Snippet;
    description?: string;
    error?: FieldError;
    required?: boolean;
    id?: string;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    size = 'base',
    focusMode = 'container',
    disabled = false,
    label,
    labelTooltip,
    description,
    error,
    required,
    id,
    ...rest
  }: Props = $props();

  const generatedId = `kumo-input-group-${Math.random().toString(36).slice(2)}`;
  const inputId = $derived(id ?? generatedId);
  const descriptionId = $derived(description ? `${inputId}-description` : undefined);
  const errorId = $derived(error ? `${inputId}-error` : undefined);
  const showError = $derived(typeof error === 'string' ? error : error?.message);
  const hasField = $derived(Boolean(label || description || showError));

  setInputGroupContext({
    get size() {
      return size;
    },
    get focusMode() {
      return focusMode;
    },
    get disabled() {
      return disabled;
    },
    get error() {
      return error;
    },
    get inputId() {
      return inputId;
    },
    get describedBy() {
      return [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    }
  });
</script>

{#snippet control()}
  <div
    data-slot="input-group"
    data-focus-mode={focusMode}
    data-disabled={disabled ? '' : undefined}
    role="group"
    class={cn(
      'relative w-full cursor-text text-kumo-default',
      sizes[size],
      'shadow-xs',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      focusMode === 'container'
        ? [
            'overflow-hidden bg-kumo-control ring ring-kumo-line',
            'focus-within:ring-kumo-focus/50 focus-within:ring-[1.5px]'
          ]
        : 'isolate overflow-visible bg-kumo-control ring-0 shadow-none',
      'has-[input[aria-invalid=true]]:ring-kumo-danger',
      'px-0',
      'flex items-center gap-0',
      'has-[[data-slot=input-group-suffix]]:[&_input]:[field-sizing:content]',
      'has-[[data-slot=input-group-suffix]]:[&_input]:max-w-full',
      'has-[[data-slot=input-group-suffix]]:[&_input]:grow-0',
      'has-[[data-slot=input-group-suffix]]:[&_input]:pr-0',
      INPUT_GROUP_HAS_CLASSES[size],
      '!mb-0',
      className
    )}
    {...rest}
  >
    {#if label}
      <label for={inputId} class="absolute inset-0 z-0 !mb-0 cursor-text" aria-hidden="true"></label>
    {/if}
    {@render children?.()}
  </div>
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
  {#if focusMode === 'container'}
    <label class="!mb-0 block w-full">
      {@render control()}
    </label>
  {:else}
    {@render control()}
  {/if}
{/if}
