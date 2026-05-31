<script module lang="ts">
  import { Switch as SwitchPrimitive } from 'bits-ui';
  import { Info } from 'phosphor-svelte';
  import { getContext, setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export type SwitchSize = 'sm' | 'base' | 'lg';
  export type SwitchVariant = 'default' | 'neutral';
  export type KumoSwitchPart = 'root' | 'group' | 'item' | 'legend';

  export const switchSizeStyles: Record<SwitchSize, { track: string; thumb: string; slide: string }> = {
    sm: { track: 'h-4 w-8', thumb: 'w-4', slide: 'left-4' },
    base: { track: 'h-4.5 w-9', thumb: 'w-4.5', slide: 'left-4.5' },
    lg: { track: 'h-5 w-10', thumb: 'w-5', slide: 'left-5' }
  };

  export const switchSquircleRadius = 'rounded-[5px] supports-[corner-shape:squircle]:rounded-[10px] [corner-shape:squircle]';

  export const switchTrackColors = (variant: SwitchVariant, checked: boolean) => {
    if (variant === 'neutral') {
      return checked
        ? 'bg-neutral-500 dark:bg-kumo-base ring-neutral-600 dark:ring-neutral-700'
        : 'bg-neutral-150 dark:bg-kumo-base ring-kumo-hairline';
    }

    return checked
      ? 'bg-blue-500 dark:bg-blue-600 ring-blue-600 dark:ring-blue-500'
      : 'bg-neutral-200 dark:bg-neutral-700 ring-neutral-300 dark:ring-neutral-600';
  };

  export const switchThumbColors = (variant: SwitchVariant, checked: boolean) => {
    if (variant === 'neutral') {
      return checked ? 'bg-kumo-base dark:bg-neutral-400' : 'bg-kumo-base dark:bg-neutral-850';
    }

    return checked ? 'bg-kumo-base dark:bg-blue-300' : 'bg-kumo-base dark:bg-neutral-850';
  };

  interface SwitchGroupContext {
    readonly controlFirst: boolean;
  }

  interface GroupProps {
    children?: Snippet;
    legend?: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    controlFirst?: boolean;
    class?: string;
  }

  interface ItemProps {
    class?: string;
    disabled?: boolean;
    size?: SwitchSize;
    variant?: SwitchVariant;
    label: string;
    transitioning?: boolean;
    onchange?: (checked: boolean) => void;
    onCheckedChange?: (checked: boolean) => void;
  }

  interface LegendProps {
    children?: Snippet;
    class?: string;
  }

  export interface Props {
    __part?: KumoSwitchPart;
    class?: string;
    checked?: boolean;
    disabled?: boolean;
    size?: SwitchSize;
    variant?: SwitchVariant;
    label?: string;
    labelTooltip?: string | Snippet;
    required?: boolean;
    controlFirst?: boolean;
    transitioning?: boolean;
    legend?: string;
    description?: string;
    error?: string;
    id?: string;
    'aria-label'?: string;
    children?: Snippet;
    onchange?: (checked: boolean) => void;
    onCheckedChange?: (checked: boolean) => void;
    [key: string]: unknown;
  }

  function setSwitchGroupContext(controlFirst: boolean) {
    setContext('kumo-switch-group', { get controlFirst() { return controlFirst; } });
    return '';
  }

  function getSwitchGroupContext() {
    return getContext<SwitchGroupContext | undefined>('kumo-switch-group');
  }

  function handleSwitchCheckedChange(
    nextChecked: boolean,
    onchange?: (checked: boolean) => void,
    onCheckedChange?: (checked: boolean) => void
  ) {
    onchange?.(nextChecked);
    onCheckedChange?.(nextChecked);
  }

</script>

<script lang="ts">
  let {
    __part = 'root',
    class: className,
    checked = $bindable(false),
    disabled = false,
    size = 'base',
    variant = 'default',
    label,
    labelTooltip,
    required,
    controlFirst = true,
    transitioning,
    legend,
    description,
    error,
    id,
    'aria-label': ariaLabel,
    children,
    onchange,
    onCheckedChange,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  let controlId = $derived(id ?? `${generatedId}-control`);
  let displayLabel = $derived(label ?? (children ? undefined : undefined));
  let s = $derived(switchSizeStyles[size] ?? switchSizeStyles.base);
  let controlLabel = $derived(ariaLabel ?? displayLabel ?? 'Switch');

  function handleCheckedChange(nextChecked: boolean) {
    handleSwitchCheckedChange(nextChecked, onchange, onCheckedChange);
  }
</script>

{#snippet Group({
  children,
  legend,
  description,
  error,
  disabled = false,
  controlFirst = true,
  class: className
}: GroupProps)}
  {setSwitchGroupContext(controlFirst)}

  <fieldset class={cn('flex flex-col gap-4', className)} {disabled}>
    {#if legend}
      <legend class="text-base font-medium text-kumo-default">{legend}</legend>
    {/if}
    <div class="flex flex-col gap-2">
      {@render children?.()}
    </div>
    {#if error}
      <p class="text-sm text-kumo-danger">{error}</p>
    {/if}
    {#if description}
      <p class="text-sm text-kumo-subtle">{description}</p>
    {/if}
  </fieldset>
{/snippet}

{#snippet Item({
  class: className,
  disabled = false,
  size = 'base',
  variant = 'default',
  label,
  transitioning,
  onchange,
  onCheckedChange
}: ItemProps)}
  <span
    data-kumo-component="Switch"
    data-kumo-part="item-label"
    class={cn(
      'm-0 relative inline-flex items-center gap-2',
      !(getSwitchGroupContext()?.controlFirst ?? true) && 'flex-row-reverse justify-end',
      disabled && 'opacity-50',
      className
    )}
  >
    <SwitchPrimitive.Root
      bind:checked
      id={controlId}
      {disabled}
      aria-busy={transitioning || undefined}
      aria-label={label}
      data-kumo-component="Switch"
      data-kumo-part="item"
      onCheckedChange={(nextChecked) => handleSwitchCheckedChange(nextChecked, onchange, onCheckedChange)}
      class={cn(
        'relative inline-flex items-center ring cursor-pointer border-none p-0',
        'focus:outline-none focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand',
        'transition-colors duration-150 ease-out motion-reduce:transition-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        s.track,
        switchSquircleRadius,
        switchTrackColors(variant, checked)
      )}
    >
      <SwitchPrimitive.Thumb
        class={cn(
          'absolute top-0 bottom-0 shadow-[0_0_1px_0.5px_var(--color-kumo-shadow-edge),0_1px_2px_var(--color-kumo-shadow-drop)]',
          s.thumb,
          switchSquircleRadius,
          switchThumbColors(variant, checked),
          'transition-all duration-150 ease-out motion-reduce:transition-none',
          checked ? s.slide : 'left-0'
        )}
      />
    </SwitchPrimitive.Root>
    <label for={controlId} class={cn('text-base font-medium text-kumo-default', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>{label}</label>
  </span>
{/snippet}

{#snippet Legend({ children, class: className }: LegendProps)}
  <legend class={cn('text-base font-medium text-kumo-default', className)}>
    {@render children?.()}
  </legend>
{/snippet}

{#snippet control()}
  <SwitchPrimitive.Root
    bind:checked
    {disabled}
    id={controlId}
    aria-label={controlLabel}
    aria-busy={transitioning || undefined}
    data-kumo-component="Switch"
    onCheckedChange={handleCheckedChange}
    class={cn(
      'relative inline-flex items-center ring cursor-pointer border-none p-0',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand',
      'transition-colors duration-150 ease-out motion-reduce:transition-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
      s.track,
      switchSquircleRadius,
      switchTrackColors(variant, checked),
      className
    )}
    {...rest}
  >
    <SwitchPrimitive.Thumb
      class={cn(
        'absolute top-0 bottom-0 shadow-[0_0_1px_0.5px_var(--color-kumo-shadow-edge),0_1px_2px_var(--color-kumo-shadow-drop)]',
        s.thumb,
        switchSquircleRadius,
        switchThumbColors(variant, checked),
        'transition-all duration-150 ease-out motion-reduce:transition-none',
        checked ? s.slide : 'left-0'
      )}
    />
  </SwitchPrimitive.Root>
{/snippet}

{#if __part === 'group'}
  {@render Group({ children, legend, description, error, disabled, controlFirst, class: className })}
{:else if __part === 'item'}
  {@render Item({ class: className, disabled, size, variant, label: label ?? '', transitioning, onchange, onCheckedChange })}
{:else if __part === 'legend'}
  {@render Legend({ children, class: className })}
{:else if label || children}
  <span data-kumo-component="Switch" data-kumo-part="label" class={cn('m-0 relative inline-flex items-center gap-2', !controlFirst && 'flex-row-reverse justify-end', disabled && 'opacity-50')}>
    {@render control()}
    <label for={controlId} class={cn('text-base font-medium text-kumo-default', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
      {#if label}{label}{:else}{@render children?.()}{/if}
      {#if required}<span class="ml-1 text-kumo-danger">*</span>{/if}
      {#if labelTooltip}
        <span class="ml-1 inline-flex text-kumo-muted" title={typeof labelTooltip === 'string' ? labelTooltip : undefined}>
          <Info class="size-3.5" aria-hidden="true" />
          {#if typeof labelTooltip === 'function'}<span class="sr-only">{@render labelTooltip()}</span>{/if}
        </span>
      {/if}
    </label>
  </span>
{:else}
  {@render control()}
{/if}
