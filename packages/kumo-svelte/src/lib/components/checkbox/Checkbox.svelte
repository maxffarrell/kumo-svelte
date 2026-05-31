<script module lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import { Check, Minus } from 'phosphor-svelte';
  import { getContext, setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export type CheckboxVariant = 'default' | 'error';

  export function checkboxVariantClasses(variant: CheckboxVariant = 'default') {
    return variant === 'error' ? 'ring-kumo-danger' : 'ring-kumo-hairline';
  }

  export const checkboxControlClasses =
    'relative flex h-4 w-4 items-center justify-center rounded-sm border-0 bg-kumo-base ring focus:outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-[state=checked]:bg-kumo-contrast data-[state=checked]:ring-kumo-contrast data-[state=indeterminate]:bg-kumo-contrast data-[state=indeterminate]:ring-kumo-contrast';

  export const checkboxInteractiveClasses =
    'hover:ring-kumo-hairline focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand';

  interface CheckboxGroupContext {
    readonly controlFirst: boolean;
  }

  interface GroupProps {
    children?: Snippet;
    legend?: string;
    description?: string | Snippet;
    error?: string;
    value?: string[];
    disabled?: boolean;
    required?: boolean;
    name?: string;
    controlFirst?: boolean;
    class?: string;
    onValueChange?: (value: string[]) => void;
  }

  interface ItemProps {
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

  interface LegendProps {
    children?: Snippet;
    class?: string;
  }

  function setCheckboxGroupContext(controlFirst: boolean) {
    setContext('kumo-checkbox-group', { get controlFirst() { return controlFirst; } });
    return '';
  }

  function getCheckboxGroupContext() {
    return getContext<CheckboxGroupContext | undefined>('kumo-checkbox-group');
  }

  // @ts-ignore Svelte declaration tags are exportable from module script.
  export { Group, Item, Legend };
</script>

<script lang="ts">
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

{#snippet Group({
  children,
  legend,
  description,
  error,
  value,
  disabled = false,
  required,
  name,
  controlFirst = true,
  class: className,
  onValueChange
}: GroupProps)}
  {setCheckboxGroupContext(controlFirst)}

  <CheckboxPrimitive.Group {value} {disabled} {required} {name} {onValueChange}>
    <fieldset class={cn('flex flex-col gap-4', className)} {disabled}>
      {#if legend}
        <legend class="text-base font-medium text-kumo-default">{legend}</legend>
      {/if}
      <div class="flex flex-col gap-2">
        {@render children?.()}
      </div>
      {#if error}
        <p class="text-sm text-kumo-danger">{error}</p>
      {:else if description}
        <p class="text-sm text-kumo-subtle">
          {#if typeof description === 'string'}{description}{:else}{@render description()}{/if}
        </p>
      {/if}
    </fieldset>
  </CheckboxPrimitive.Group>
{/snippet}

{#snippet Item({
  class: className,
  checked,
  indeterminate = false,
  disabled = false,
  variant = 'default',
  label,
  value,
  name,
  onCheckedChange,
  onIndeterminateChange
}: ItemProps)}
  <label
    data-kumo-component="Checkbox"
    data-kumo-part="item-label"
    class={cn(
      'm-0 relative inline-flex items-center gap-2',
      !(getCheckboxGroupContext()?.controlFirst ?? true) && 'flex-row-reverse justify-end',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      className
    )}
  >
    <CheckboxPrimitive.Root
      {checked}
      {indeterminate}
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
{/snippet}

{#snippet Legend({ children, class: className }: LegendProps)}
  <legend class={cn('text-base font-medium text-kumo-default', className)}>
    {@render children?.()}
  </legend>
{/snippet}

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
