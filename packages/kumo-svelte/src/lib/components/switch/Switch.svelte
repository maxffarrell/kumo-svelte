<script module lang="ts">
  export type SwitchSize = 'sm' | 'base' | 'lg';
  export type SwitchVariant = 'default' | 'neutral';

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
</script>

<script lang="ts">
  import { Switch as SwitchPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { Info } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
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
    id?: string;
    'aria-label'?: string;
    children?: Snippet;
    onchange?: (checked: boolean) => void;
    onCheckedChange?: (checked: boolean) => void;
    [key: string]: unknown;
  }

  let {
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
    onchange?.(nextChecked);
    onCheckedChange?.(nextChecked);
  }
</script>

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

{#if label || children}
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
