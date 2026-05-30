<script module lang="ts">
  export const KUMO_SENSITIVE_INPUT_VARIANTS = {
    size: {
      xs: 'h-5 gap-1 rounded-sm px-1.5 text-xs',
      sm: 'h-6.5 gap-1 rounded-md px-2 text-xs',
      base: 'h-9 gap-1.5 rounded-lg px-3 text-base',
      lg: 'h-10 gap-2 rounded-lg px-4 text-base'
    },
    variant: {
      default: 'ring-kumo-line focus-within:outline-kumo-focus',
      error: 'ring-kumo-danger focus-within:outline-kumo-danger'
    }
  } as const;

  export const KUMO_SENSITIVE_INPUT_DEFAULT_VARIANTS = {
    size: 'base',
    variant: 'default'
  } as const;

  export type SensitiveInputSize = keyof typeof KUMO_SENSITIVE_INPUT_VARIANTS.size;
  export type SensitiveInputVariant = keyof typeof KUMO_SENSITIVE_INPUT_VARIANTS.variant;
</script>

<script lang="ts">
  import { Eye, EyeSlash } from 'phosphor-svelte';
  import type { Snippet } from 'svelte';
  import { Field, type FieldErrorMatch } from '$lib/components/field';
  import { cn } from '$lib/utils/cn';

  type Mode = 'masked' | 'revealed' | 'empty';
  type FieldText = string | Snippet;
  type FieldError = string | { message: FieldText; match: FieldErrorMatch };

  interface Props {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onCopy?: () => void;
    size?: SensitiveInputSize;
    variant?: SensitiveInputVariant;
    label?: FieldText;
    labelTooltip?: FieldText;
    description?: FieldText;
    error?: FieldError;
    class?: string;
    id?: string;
    disabled?: boolean;
    readOnly?: boolean;
    readonly?: boolean;
    required?: boolean;
    autocomplete?: string;
    autoComplete?: string;
    oninput?: (event: Event) => void;
    onchange?: (event: Event) => void;
    onblur?: (event: FocusEvent) => void;
    onkeydown?: (event: KeyboardEvent) => void;
    [key: string]: unknown;
  }

  let {
    value = $bindable<string | undefined>(),
    defaultValue = '',
    onValueChange,
    onCopy,
    size = KUMO_SENSITIVE_INPUT_DEFAULT_VARIANTS.size,
    variant = KUMO_SENSITIVE_INPUT_DEFAULT_VARIANTS.variant,
    label,
    labelTooltip,
    description,
    error,
    class: className,
    id,
    disabled = false,
    readOnly = false,
    readonly = false,
    required,
    autocomplete,
    autoComplete = 'off',
    oninput,
    onchange,
    onblur,
    onkeydown,
    ...inputProps
  }: Props = $props();

  const generatedId = `kumo-sensitive-input-${Math.random().toString(36).slice(2)}`;
  const inputId = $derived(id ?? generatedId);
  const maskedInstructionId = $derived(`${inputId}-masked-instruction`);
  const liveRegionId = $derived(`${inputId}-live`);
  const ariaLabelFallback = $derived(typeof label === 'string' ? label : 'Sensitive value');
  const isReadOnly = $derived(readOnly || readonly);

  let internalValue = $state((() => defaultValue)());
  let mode = $state<Mode>((() => ((value ?? defaultValue).length > 0 ? 'masked' : 'empty'))());
  let copied = $state(false);
  let inputElement: HTMLInputElement | undefined;
  let containerElement: HTMLDivElement | undefined;
  let copyTimeout: ReturnType<typeof setTimeout> | undefined;

  const currentValue = $derived(value ?? internalValue);
  const hasValue = $derived(currentValue.length > 0);
  const isMaskedWithValue = $derived(mode === 'masked' && hasValue);
  const showEyeButton = $derived(!disabled && (mode === 'revealed' || (mode === 'empty' && hasValue)));
  const iconSize = $derived(size === 'xs' || size === 'sm' ? 'size-3' : 'size-4');

  const containerClassName = $derived(
    cn(
      'group/container relative flex w-full items-center border-0 bg-kumo-control text-kumo-default ring outline-none',
      'focus-within:outline focus-within:outline-2',
      KUMO_SENSITIVE_INPUT_VARIANTS.size[size],
      KUMO_SENSITIVE_INPUT_VARIANTS.variant[variant],
      error && '!ring-kumo-danger focus-within:outline-kumo-danger',
      isMaskedWithValue && !disabled && 'cursor-pointer',
      disabled && 'cursor-not-allowed',
      className
    )
  );

  function setValue(nextValue: string, event?: Event) {
    value = nextValue;
    internalValue = nextValue;
    if (mode === 'empty' && nextValue.length > 0) {
      mode = 'revealed';
    }
    onValueChange?.(nextValue);
    if (event) {
      oninput?.(event);
      onchange?.(event);
    }
  }

  function handleInput(event: Event) {
    setValue((event.currentTarget as HTMLInputElement).value, event);
  }

  function handleBlur(event: FocusEvent) {
    if (containerElement && event.relatedTarget instanceof Node && containerElement.contains(event.relatedTarget)) {
      return;
    }
    if (hasValue) {
      mode = 'masked';
    }
    onblur?.(event);
  }

  function handleContainerClick(event: MouseEvent) {
    if (disabled) return;
    if (containerElement) {
      const rect = containerElement.getBoundingClientRect();
      const isClickInsideContainer =
        event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!isClickInsideContainer) return;
    }
    if (mode === 'masked' && hasValue) {
      mode = 'revealed';
      if (!isReadOnly) {
        setTimeout(() => inputElement?.focus(), 0);
      }
    }
  }

  function handleToggleVisibility(event: MouseEvent) {
    event.stopPropagation();
    if (mode === 'revealed') {
      mode = 'masked';
    } else if (mode === 'empty' && hasValue) {
      mode = 'revealed';
    }
  }

  function handleContainerKeydown(event: KeyboardEvent) {
    if (disabled) return;
    if (mode === 'masked' && hasValue && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      mode = 'revealed';
      if (!isReadOnly) {
        setTimeout(() => inputElement?.focus(), 0);
      }
    }
  }

  function handleInputKeydown(event: KeyboardEvent) {
    if (mode === 'revealed' && event.key === 'Escape') {
      mode = 'masked';
      setTimeout(() => containerElement?.focus(), 0);
    }
    onkeydown?.(event);
  }

  async function copyToClipboard(event: MouseEvent) {
    event.stopPropagation();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentValue);
        showCopied();
        return;
      }
    } catch {
      // Fall through to the textarea fallback.
    }

    const textarea = document.createElement('textarea');
    textarea.value = currentValue;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    const selection = document.getSelection();
    const previousRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
    textarea.select();

    try {
      document.execCommand('copy');
      showCopied();
    } finally {
      document.body.removeChild(textarea);
      if (previousRange) {
        selection?.removeAllRanges();
        selection?.addRange(previousRange);
      }
    }
  }

  function showCopied() {
    copied = true;
    onCopy?.();
    if (copyTimeout) clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

{#snippet sensitiveInput()}
  <div>
    <div
      bind:this={containerElement}
      class={containerClassName}
      role="button"
      tabindex={isMaskedWithValue && !disabled ? 0 : undefined}
      data-kumo-component="SensitiveInput"
      data-kumo-part="masked-container"
      aria-label={isMaskedWithValue ? `${ariaLabelFallback}, masked.` : undefined}
      aria-describedby={isMaskedWithValue ? `${maskedInstructionId} ${liveRegionId}` : undefined}
      aria-disabled={isMaskedWithValue && disabled ? true : undefined}
      onclick={handleContainerClick}
      onkeydown={handleContainerKeydown}
    >
      <input
        bind:this={inputElement}
        id={inputId}
        type={mode === 'revealed' ? 'text' : 'password'}
        value={currentValue}
        disabled={disabled}
        readonly={isReadOnly || isMaskedWithValue}
        autocomplete={(autocomplete ?? autoComplete) as never}
        tabindex={isMaskedWithValue ? -1 : 0}
        class={cn(
          'kumo-input-placeholder w-full border-0 bg-transparent p-0 text-kumo-default ring-0 outline-none disabled:cursor-not-allowed disabled:text-kumo-subtle',
          size === 'xs' && 'pr-5',
          size === 'sm' && 'pr-6',
          size === 'base' && 'pr-8',
          size === 'lg' && 'pr-10',
          isMaskedWithValue && 'pointer-events-none text-transparent'
        )}
        aria-hidden={isMaskedWithValue}
        aria-invalid={Boolean(error) || undefined}
        oninput={handleInput}
        onblur={handleBlur}
        onkeydown={handleInputKeydown}
        {...inputProps}
      />

      <span
        class={cn(
          'pointer-events-none absolute inset-y-0 left-0 flex items-center overflow-hidden select-none',
          size === 'xs' && 'right-5 px-1.5',
          size === 'sm' && 'right-6 px-2',
          size === 'base' && 'right-8 px-3',
          size === 'lg' && 'right-10 px-4',
          !isMaskedWithValue && 'invisible',
          isMaskedWithValue && 'pointer-events-auto',
          'group/mask text-kumo-default'
        )}
        aria-hidden="true"
      >
        <span class="relative">
          <span class={isMaskedWithValue && !disabled ? 'group-focus-within/container:invisible group-hover/mask:invisible' : undefined}>
            ••••••••
          </span>
          {#if isMaskedWithValue && !disabled}
            <span class="invisible absolute top-0 left-0 whitespace-nowrap text-kumo-subtle group-focus-within/container:visible group-hover/mask:visible">
              Click to reveal
            </span>
          {/if}
        </span>
      </span>

      <button
        type="button"
        onclick={handleToggleVisibility}
        onkeydown={(event) => event.stopPropagation()}
        aria-label={mode === 'revealed' ? 'Hide value' : 'Reveal value'}
        data-kumo-component="SensitiveInput"
        data-kumo-part="toggle-visibility"
        tabindex={showEyeButton ? 0 : -1}
        class={cn(
          'absolute top-1/2 right-0 inline-flex h-auto min-h-0 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent p-0 m-0 text-kumo-subtle shadow-none hover:text-kumo-default focus:text-kumo-default focus:ring-kumo-focus/50 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-kumo-brand',
          size === 'xs' && 'right-1.5',
          size === 'sm' && 'right-2',
          size === 'base' && 'right-3',
          size === 'lg' && 'right-4',
          iconSize,
          !showEyeButton && 'pointer-events-none opacity-0'
        )}
      >
        {#if mode === 'revealed'}
          <EyeSlash class="size-full" />
        {:else}
          <Eye class="size-full" />
        {/if}
      </button>

      {#if hasValue && !disabled}
        <button
          type="button"
          onclick={copyToClipboard}
          onkeydown={(event) => event.stopPropagation()}
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
          data-kumo-component="SensitiveInput"
          data-kumo-part="copy"
          class="absolute -top-px right-2 m-0 h-auto min-h-0 -translate-y-full cursor-pointer rounded-t-md border-none bg-kumo-brand px-2 py-0.5 text-xs text-white opacity-0 shadow-none transition-opacity hover:brightness-120 focus:ring-kumo-focus/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand group-focus-within/container:opacity-100 group-hover/container:opacity-100"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      {/if}
    </div>

    {#if isMaskedWithValue}
      <span id={maskedInstructionId} class="sr-only">Click or press Enter to reveal.</span>
    {/if}
    <span id={liveRegionId} class="sr-only" aria-live="polite">
      {#if mode === 'masked' && hasValue}Value hidden{/if}
      {#if copied}Copied to clipboard{/if}
    </span>
  </div>
{/snippet}

{#if label}
  <Field {label} {required} {labelTooltip} {description} {error}>
    {@render sensitiveInput()}
  </Field>
{:else}
  {@render sensitiveInput()}
{/if}
