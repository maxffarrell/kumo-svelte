<script module lang="ts">
  export type CheckboxVariant = 'default' | 'error';

  export function checkboxVariantClasses(variant: CheckboxVariant = 'default') {
    return variant === 'error' ? 'ring-kumo-danger' : 'ring-kumo-hairline';
  }

  export const checkboxControlClasses =
    'relative flex h-4 w-4 items-center justify-center rounded-sm border-0 bg-kumo-base ring focus:outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-[state=checked]:bg-kumo-contrast data-[state=checked]:ring-kumo-contrast data-[state=indeterminate]:bg-kumo-contrast data-[state=indeterminate]:ring-kumo-contrast';

  export const checkboxInteractiveClasses =
    'hover:ring-kumo-hairline focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand';
</script>

<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import { Check, Minus } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    variant?: CheckboxVariant;
    label?: string;
    labelTooltip?: Snippet;
    controlFirst?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    onCheckedChange?: (checked: boolean) => void;
    onIndeterminateChange?: (indeterminate: boolean) => void;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    disabled = false,
    variant = 'default',
    label,
    labelTooltip,
    controlFirst = true,
    required,
    name,
    value,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    onCheckedChange,
    onIndeterminateChange,
    ...rest
  }: Props = $props();

  let visibleLabel = $derived(label ?? (children ? undefined : undefined));
  let controlLabel = $derived(ariaLabel ?? visibleLabel ?? undefined);
</script>

{#snippet control()}
  <CheckboxPrimitive.Root
    bind:checked
    bind:indeterminate
    {disabled}
    {name}
    {value}
    {id}
    aria-label={controlLabel}
    aria-labelledby={ariaLabelledBy}
    data-kumo-component="Checkbox"
    {onCheckedChange}
    {onIndeterminateChange}
    class={cn(
      checkboxControlClasses,
      checkboxVariantClasses(variant),
      !disabled && checkboxInteractiveClasses,
      disabled && 'cursor-not-allowed opacity-50',
      className
    )}
    {...rest}
  >
    {#if indeterminate}
      <Minus class="h-3 w-3 text-kumo-inverse" weight="bold" aria-hidden="true" />
    {:else if checked}
      <Check class="h-3 w-3 text-kumo-inverse" weight="bold" aria-hidden="true" />
    {/if}
  </CheckboxPrimitive.Root>
{/snippet}

{#if label || children}
  <label data-kumo-component="Checkbox" data-kumo-part="label" class={cn('!m-0 !min-h-0 !text-base inline-flex items-center gap-2', controlFirst ? 'flex-row' : 'flex-row-reverse justify-end', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
    {@render control()}
    <span class="inline-flex items-center gap-1 text-base font-medium text-kumo-default">
      {#if label}{label}{:else}{@render children?.()}{/if}
      {#if required === false}<span class="text-kumo-subtle">(optional)</span>{/if}
      {#if labelTooltip}{@render labelTooltip()}{/if}
    </span>
  </label>
{:else}
  {@render control()}
{/if}
