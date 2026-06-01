<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { Button } from '$lib/components/button';
  import { cn } from '$lib/utils/cn';
  import {
    getInputGroupAddonContext,
    getInputGroupContext,
    INPUT_GROUP_SIZE,
    type InputGroupSize
  } from './context';

  type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline';
  type Shape = 'base' | 'square' | 'circle';

  const compactButtonSize: Record<InputGroupSize, InputGroupSize> = {
    xs: 'xs',
    sm: 'xs',
    base: 'sm',
    lg: 'base'
  };

  interface Props {
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

  let {
    children,
    class: className,
    icon: IconComponent,
    variant = 'ghost',
    size,
    shape,
    disabled,
    tooltip,
    tooltipSide,
    ...rest
  }: Props = $props();

  const context = getInputGroupContext();
  const inAddon = getInputGroupAddonContext();
  const groupSize = $derived(context?.size ?? 'base');
  const isIndividual = $derived(context?.focusMode === 'individual' || context?.focusMode === 'hybrid');
  const effectiveSize = $derived(size ?? (isIndividual ? groupSize : compactButtonSize[groupSize]));
  const iconClass = $derived(INPUT_GROUP_SIZE[groupSize].iconSize);
  const childIconClass = $derived(INPUT_GROUP_SIZE[groupSize].addonIconSize);
</script>

<Button
  type="button"
  disabled={disabled ?? context?.disabled}
  variant={variant}
  size={effectiveSize}
  shape={shape}
  title={tooltip}
  class={cn(
    'pointer-events-auto',
    isIndividual && [
      'relative h-full! rounded-none ring-0 border border-kumo-line',
      'first:rounded-l-[inherit] last:rounded-r-[inherit]',
      'not-first:-ml-px',
      'hover:z-1',
      'focus:z-2 focus-visible:border-kumo-focus/50',
      'disabled:bg-kumo-overlay disabled:text-kumo-inactive!'
    ],
    className
  )}
  {...rest}
>
  {#if IconComponent}
    <IconComponent class={iconClass} />
  {/if}
  {#if children}
    <span class={cn('contents', childIconClass, '[&>svg]:shrink-0')}>
      {@render children()}
    </span>
  {/if}
</Button>
