<script module lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { Button as BaseButton } from '$lib/components/button';
  import { cn } from '$lib/utils/cn';
  import {
    INPUT_GROUP_HAS_CLASSES,
    INPUT_GROUP_SIZE,
    getInputGroupContext,
    setInputGroupContext,
    type FieldError,
    type InputGroupFocusMode,
    type InputGroupSize
  } from './context';

  type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline';
  type Shape = 'base' | 'square' | 'circle';
  type Part = 'root' | 'input' | 'addon' | 'button' | 'suffix';

  const groupSizes: Record<InputGroupSize, string> = {
    xs: 'h-6 text-xs rounded-sm',
    sm: 'h-7 text-xs rounded-md',
    base: 'h-9 text-base rounded-lg',
    lg: 'h-11 text-base rounded-lg'
  };

  const compactButtonSize: Record<InputGroupSize, InputGroupSize> = {
    xs: 'xs',
    sm: 'xs',
    base: 'sm',
    lg: 'base'
  };

  interface Props {
    __part?: Part;
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

  interface InputProps {
    class?: string;
    value?: string | number;
    onValueChange?: (value: string) => void;
    oninput?: (event: Event) => void;
    id?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }

  interface AddonProps {
    children?: Snippet;
    class?: string;
    align?: 'start' | 'end';
    containsButton?: boolean;
  }

  interface ButtonProps {
    children?: Snippet;
    class?: string;
    icon?: Component;
    variant?: Variant;
    size?: InputGroupSize;
    shape?: Shape;
    disabled?: boolean;
    tooltip?: string;
    tooltipSide?: string;
    [key: string]: unknown;
  }

  interface SuffixProps {
    children?: Snippet;
    class?: string;
  }

  function handleInput(event: Event, props: InputProps) {
    props.value = (event.currentTarget as HTMLInputElement).value;
    props.onValueChange?.(String(props.value));
    props.oninput?.(event);
  }

  function inputRest({
    class: _className,
    value: _value,
    onValueChange: _onValueChange,
    oninput: _oninput,
    id: _id,
    disabled: _disabled,
    ...rest
  }: InputProps) {
    return rest;
  }

  function inputClass(className: string | undefined) {
    const context = getInputGroupContext();
    const tokens = INPUT_GROUP_SIZE[context?.size ?? 'base'];

    return cn(
      'flex h-full min-w-0 grow items-center rounded-none border-0 bg-transparent font-sans',
      tokens.inputOuter,
      'text-ellipsis text-kumo-default outline-none',
      'placeholder:text-kumo-muted disabled:text-kumo-disabled',
      context?.focusMode === 'individual'
        ? [
            'relative ring-0 border border-kumo-line',
            'first:rounded-l-[inherit] last:rounded-r-[inherit]',
            'not-first:border-l-0',
            'hover:z-[1] hover:border-kumo-line',
            'focus:z-[2] focus:border-kumo-line focus:[outline:solid_1px_var(--color-kumo-focus)] focus:[outline-offset:-1px]'
          ]
        : 'relative z-[1] ring-0! shadow-none focus:ring-0! focus:outline-none',
      className
    );
  }

  function addonClass({ class: className, align = 'start', containsButton = false }: AddonProps) {
    const tokens = INPUT_GROUP_SIZE[getInputGroupContext()?.size ?? 'base'];

    return cn(
      'relative z-[1] pointer-events-none flex shrink-0 items-center gap-1.5 text-kumo-subtle',
      '*:pointer-events-auto',
      tokens.fontSize,
      align === 'start'
        ? cn('-order-1 pr-0', containsButton ? tokens.addonButtonOuterStart : tokens.addonOuterStart)
        : cn('order-1 pl-0', containsButton ? tokens.addonButtonOuterEnd : tokens.addonOuterEnd),
      className
    );
  }

  function isIndividualFocus() {
    const context = getInputGroupContext();
    return context?.focusMode === 'individual' || context?.focusMode === 'hybrid';
  }

  function effectiveButtonSize(size: InputGroupSize | undefined) {
    const groupSize = getInputGroupContext()?.size ?? 'base';
    return size ?? (isIndividualFocus() ? groupSize : compactButtonSize[groupSize]);
  }

  function buttonClass(className: string | undefined) {
    const isIndividual = isIndividualFocus();

    return cn(
      'pointer-events-auto',
      isIndividual && [
        'relative h-full! rounded-none ring-0 border border-kumo-line',
        'first:rounded-l-[inherit] last:rounded-r-[inherit]',
        'not-first:border-l-0',
        'hover:z-[1]',
        'focus:z-[2] focus:border-kumo-line',
        'focus-visible:[outline:solid_1px_var(--color-kumo-focus)] focus-visible:[outline-offset:-1px]',
        'disabled:bg-kumo-overlay disabled:text-kumo-inactive!'
      ],
      className
    );
  }

  function iconClass() {
    return INPUT_GROUP_SIZE[getInputGroupContext()?.size ?? 'base'].iconSize;
  }

  function suffixClass(className: string | undefined) {
    const tokens = INPUT_GROUP_SIZE[getInputGroupContext()?.size ?? 'base'];

    return cn(
      'pointer-events-none flex min-w-0 grow select-none items-center text-kumo-subtle',
      tokens.fontSize,
      tokens.suffixPad,
      className
    );
  }
</script>

<script lang="ts">
  let props: Props = $props();
  let {
    children,
    __part = 'root',
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
  }: Props = props;

  const generatedId = `kumo-input-group-${Math.random().toString(36).slice(2)}`;
  const inputId = $derived(id ?? generatedId);
  const descriptionId = $derived(description ? `${inputId}-description` : undefined);
  const errorId = $derived(error ? `${inputId}-error` : undefined);
  const showError = $derived(typeof error === 'string' ? error : error?.message);
  const hasField = $derived(Boolean(label || description || showError));

  if ((props.__part ?? 'root') === 'root') {
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
  }
</script>

{#snippet control()}
  <div
    data-slot="input-group"
    data-focus-mode={focusMode}
    data-disabled={disabled ? '' : undefined}
    role="group"
    class={cn(
      'relative w-full cursor-text text-kumo-default',
      groupSizes[size],
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

{#snippet Input(props: InputProps)}
  <input
    value={props.value ?? ''}
    id={props.id ?? getInputGroupContext()?.inputId}
    disabled={props.disabled ?? getInputGroupContext()?.disabled}
    aria-invalid={Boolean(getInputGroupContext()?.error) || undefined}
    aria-describedby={getInputGroupContext()?.describedBy}
    class={inputClass(props.class)}
    oninput={(event) => handleInput(event, props)}
    {...inputRest(props)}
  />
{/snippet}

{#snippet Addon({ children, align = 'start', ...props }: AddonProps)}
  <div
    data-slot={align === 'start' ? 'input-group-addon-start' : 'input-group-addon-end'}
    class={addonClass({ align, ...props })}
  >
    {@render children?.()}
  </div>
{/snippet}

{#snippet Button({
  children,
  class: className,
  icon: IconComponent,
  variant = 'ghost',
  size,
  shape,
  disabled,
  tooltip,
  tooltipSide: _tooltipSide,
  ...rest
}: ButtonProps)}
  <BaseButton
    type="button"
    disabled={disabled ?? getInputGroupContext()?.disabled}
    variant={variant}
    size={effectiveButtonSize(size)}
    shape={shape}
    title={tooltip}
    class={buttonClass(className)}
    {...rest}
  >
    {#if IconComponent}
      <IconComponent class={iconClass()} />
    {/if}
    {@render children?.()}
  </BaseButton>
{/snippet}

{#snippet Suffix({ children, class: className }: SuffixProps)}
  <div
    data-slot="input-group-suffix"
    class={suffixClass(className)}
  >
    <span class="truncate">{@render children?.()}</span>
  </div>
{/snippet}

{#if __part === 'input'}
  {@render Input({ children, class: className, id, disabled, ...rest })}
{:else if __part === 'addon'}
  {@render Addon({ children, class: className, ...rest })}
{:else if __part === 'button'}
  {@render Button({ children, class: className, disabled, ...rest })}
{:else if __part === 'suffix'}
  {@render Suffix({ children, class: className })}
{:else if hasField}
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
