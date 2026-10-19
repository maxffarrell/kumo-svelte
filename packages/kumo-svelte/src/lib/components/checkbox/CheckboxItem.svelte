<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import Check from 'phosphor-svelte/lib/Check';
  import Minus from 'phosphor-svelte/lib/Minus';
  import { getContext, type Snippet } from 'svelte';
  import {
    checkboxControlClasses,
    checkboxInteractiveClasses,
    checkboxVariantClasses,
    type CheckboxVariant
  } from './Checkbox.svelte';
  import { cn } from '#lib/utils/cn.js';

  interface CheckboxGroupContext {
    readonly controlFirst: boolean;
    readonly appearance: "default" | "card";
    readonly orientation: "vertical" | "horizontal";
  }

  interface Props {
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    variant?: CheckboxVariant;
    label: string | Snippet;
    description?: string | Snippet;
    appearance?: "default" | "card";
    children?: Snippet;
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
    description,
    appearance: appearanceProp,
    children,
    value,
    name,
    onCheckedChange,
    onIndeterminateChange
  }: Props = $props();

  const group = getContext<CheckboxGroupContext | undefined>('kumo-checkbox-group');
  const isCard = $derived((appearanceProp ?? group?.appearance) === 'card');
  const isJoined = $derived(isCard && group?.appearance === 'card');
</script>

<label
  data-kumo-component="Checkbox"
  data-kumo-part="item-label"
  class={cn(
    isCard ? cn('group relative m-0 flex items-start gap-3 bg-kumo-base p-3 has-[[data-state=checked]]:bg-kumo-tint has-[[data-checked]]:bg-kumo-tint', isJoined ? cn('border-b border-kumo-line bg-clip-padding last:border-b-0', group?.orientation === 'horizontal' && 'odd:border-r [&:last-child:nth-child(odd)]:border-r-0 [&:nth-last-child(2):nth-child(odd)]:border-b-0') : 'rounded-lg border border-kumo-hairline', !disabled && 'hover:not-has-[[data-disabled]]:not-has-[[data-state=checked]]:bg-kumo-elevated') : 'm-0 relative inline-flex items-center gap-2',
    !(group?.controlFirst ?? !isCard) && 'flex-row-reverse justify-end',
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
  <div class="flex min-w-0 flex-1 flex-col gap-0.5"><span class={cn('text-base text-kumo-default', isCard && 'font-medium')}>{#if typeof label === 'string'}{label}{:else}{@render label()}{/if}</span>{#if description}<span class="text-sm text-kumo-subtle">{#if typeof description === 'string'}{description}{:else}{@render description()}{/if}</span>{/if}{@render children?.()}</div>
</label>
