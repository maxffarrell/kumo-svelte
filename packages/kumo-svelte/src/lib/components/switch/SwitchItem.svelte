<script lang="ts">
  import { Switch as SwitchPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';
  import {
    switchSizeStyles,
    switchSquircleRadius,
    switchThumbColors,
    switchTrackColors,
    type SwitchSize,
    type SwitchVariant
  } from './Switch.svelte';
  import { cn } from '$lib/utils/cn';

  interface SwitchGroupContext {
    readonly controlFirst: boolean;
  }

  interface Props {
    class?: string;
    checked?: boolean;
    disabled?: boolean;
    size?: SwitchSize;
    variant?: SwitchVariant;
    label: string;
    transitioning?: boolean;
    onchange?: (checked: boolean) => void;
    onCheckedChange?: (checked: boolean) => void;
  }

  let { class: className, checked = $bindable(false), disabled = false, size = 'base', variant = 'default', label, transitioning, onchange, onCheckedChange }: Props = $props();
  const group = getContext<SwitchGroupContext | undefined>('kumo-switch-group');
  const generatedId = $props.id();
  const controlId = `${generatedId}-control`;
  let controlFirst = $derived(group?.controlFirst ?? true);
  let s = $derived(switchSizeStyles[size] ?? switchSizeStyles.base);

  function handleCheckedChange(nextChecked: boolean) {
    onchange?.(nextChecked);
    onCheckedChange?.(nextChecked);
  }
</script>

<span
  data-kumo-component="Switch"
  data-kumo-part="item-label"
  class={cn(
    'm-0 relative inline-flex items-center gap-2',
    !controlFirst && 'flex-row-reverse justify-end',
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
    onCheckedChange={handleCheckedChange}
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
