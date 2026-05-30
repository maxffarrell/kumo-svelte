<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import { Check, Minus } from 'phosphor-svelte';
  import { getContext } from 'svelte';
  import {
    checkboxControlClasses,
    checkboxInteractiveClasses,
    checkboxVariantClasses,
    type CheckboxVariant
  } from './Checkbox.svelte';
  import { cn } from '$lib/utils/cn';

  interface CheckboxGroupContext {
    readonly controlFirst: boolean;
  }

  interface Props {
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    variant?: CheckboxVariant;
    label: string;
    value?: string;
    name?: string;
    onCheckedChange?: (checked: boolean) => void;
    onIndeterminateChange?: (indeterminate: boolean) => void;
  }

  let {
    class: className,
    checked = $bindable(),
    indeterminate = $bindable(false),
    disabled = false,
    variant = 'default',
    label,
    value,
    name,
    onCheckedChange,
    onIndeterminateChange
  }: Props = $props();

  const group = getContext<CheckboxGroupContext | undefined>('kumo-checkbox-group');
</script>

<label
  data-kumo-component="Checkbox"
  data-kumo-part="item-label"
  class={cn(
    'm-0 relative inline-flex items-center gap-2',
    !(group?.controlFirst ?? true) && 'flex-row-reverse justify-end',
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    className
  )}
>
  <CheckboxPrimitive.Root
    bind:checked
    bind:indeterminate
    {value}
    {name}
    {disabled}
    data-kumo-component="Checkbox"
    data-kumo-part="item"
    {onCheckedChange}
    {onIndeterminateChange}
    class={cn(
      'peer',
      checkboxControlClasses,
      checkboxVariantClasses(variant),
      !disabled && checkboxInteractiveClasses
    )}
  >
    {#if indeterminate}
      <Minus class="h-3 w-3 text-kumo-inverse" weight="bold" aria-hidden="true" />
    {:else if checked}
      <Check class="h-3 w-3 text-kumo-inverse" weight="bold" aria-hidden="true" />
    {/if}
  </CheckboxPrimitive.Root>
  <span class="text-base text-kumo-default">{label}</span>
</label>
