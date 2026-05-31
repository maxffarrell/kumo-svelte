<script module lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
  import { getContext, setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export type RadioVariant = 'default' | 'error';
  export type RadioAppearance = 'default' | 'card';
  export type RadioControlPosition = 'start' | 'end';

  interface Option {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }

  interface RadioGroupContext {
    readonly controlPosition: RadioControlPosition | undefined;
    readonly appearance: RadioAppearance;
  }

  export type KumoRadioPart = 'root' | 'group' | 'item' | 'legend';

  interface ItemProps {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    variant?: RadioVariant;
    appearance?: RadioAppearance;
    label: string | Snippet;
    description?: string | Snippet;
    value: string;
  }

  interface LegendProps {
    children?: Snippet;
    class?: string;
  }

  function radioAppearance(
    appearanceProp: RadioAppearance | undefined,
    group: RadioGroupContext | undefined
  ) {
    return appearanceProp ?? group?.appearance ?? 'default';
  }

  function radioIsCard(
    appearanceProp: RadioAppearance | undefined,
    group: RadioGroupContext | undefined
  ) {
    return radioAppearance(appearanceProp, group) === 'card';
  }

  function radioControlPosition(
    appearanceProp: RadioAppearance | undefined,
    group: RadioGroupContext | undefined
  ) {
    return group?.controlPosition ?? (radioIsCard(appearanceProp, group) ? 'end' : 'start');
  }
</script>

<script lang="ts">
  export interface Props {
    __part?: KumoRadioPart;
    children?: Snippet;
    options?: Option[];
    value?: string;
    defaultValue?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    orientation?: 'vertical' | 'horizontal';
    appearance?: RadioAppearance;
    variant?: RadioVariant;
    controlPosition?: RadioControlPosition;
    legend?: string;
    label?: string | Snippet;
    description?: string | Snippet;
    error?: string;
    class?: string;
    onValueChange?: (value: string) => void;
  }

  let {
    __part = 'root',
    children,
    options = [],
    value = $bindable(),
    defaultValue,
    name,
    disabled = false,
    required,
    orientation = 'vertical',
    appearance = 'default',
    variant = 'default',
    controlPosition,
    legend,
    label,
    description,
    error,
    class: className,
    onValueChange
  }: Props = $props();

  if (__part === 'root' || __part === 'group') {
    setContext('kumo-radio-group', {
      get controlPosition() {
        return controlPosition;
      },
      get appearance() {
        return appearance;
      }
    });
  }

  $effect(() => {
    if ((__part === 'root' || __part === 'group') && value === undefined && defaultValue !== undefined) {
      value = defaultValue;
    }
  });
</script>

{#snippet Group({
  children,
  legend,
  orientation = 'vertical',
  appearance = 'default',
  error,
  description,
  defaultValue,
  disabled = false,
  required,
  controlPosition,
  name,
  class: className,
  onValueChange
}: Props)}
  <RadioGroupPrimitive.Root bind:value {orientation} {disabled} {required} {name} {onValueChange}>
    <fieldset class={cn('flex flex-col gap-4', className)} {disabled}>
      {#if legend}
        <legend class="mb-4 text-base font-medium text-kumo-default">
          {legend}
        </legend>
      {/if}
      <div
        class={cn(
          orientation === 'vertical'
            ? cn('flex flex-col', appearance === 'card' ? 'gap-3' : 'gap-2')
            : appearance === 'card'
              ? 'grid grid-cols-2 gap-3'
              : 'flex flex-row flex-wrap gap-2'
        )}
      >
        {@render children?.()}
      </div>
      {#if error}
        <p class="text-sm text-kumo-danger">{error}</p>
      {/if}
      {#if description}
        <p class="text-sm text-kumo-subtle">
          {#if typeof description === 'string'}{description}{:else}{@render description()}{/if}
        </p>
      {/if}
    </fieldset>
  </RadioGroupPrimitive.Root>
{/snippet}

{#snippet Item({
  children,
  class: className,
  disabled = false,
  variant = 'default',
  appearance: appearanceProp,
  label,
  description,
  value
}: ItemProps)}
  {#snippet control(isCard: boolean)}
    <RadioGroupPrimitive.Item
      {value}
      {disabled}
      data-kumo-component="Radio"
      data-kumo-part="item"
      class={cn(
        isCard
          ? 'relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-0 bg-kumo-base ring ring-2 focus:outline-none focus:ring-kumo-focus focus-visible:ring-2 focus-visible:ring-kumo-brand'
          : 'relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-0 bg-kumo-base ring focus:outline-none after:absolute after:-inset-x-3 after:-inset-y-2',
        variant === 'error' ? 'ring-kumo-danger' : 'ring-kumo-line',
        !disabled &&
          variant !== 'error' &&
          (isCard
            ? 'group-hover:ring-kumo-hairline focus-visible:outline-offset-3'
            : 'group-hover:ring-kumo-hairline focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:outline-offset-3'),
        !disabled &&
          variant === 'error' &&
          (isCard
            ? 'focus-visible:outline-offset-3'
            : 'focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:outline-offset-3'),
        'data-[state=checked]:bg-kumo-contrast'
      )}
    >
      {#snippet children({ checked }: { checked: boolean })}
        {#if checked}
          <span class="flex items-center justify-center">
            <span class="h-2 w-2 rounded-full bg-kumo-base"></span>
          </span>
        {/if}
      {/snippet}
    </RadioGroupPrimitive.Item>
  {/snippet}

  {#if radioIsCard(appearanceProp, getContext<RadioGroupContext | undefined>('kumo-radio-group'))}
    <label
      data-kumo-component="Radio"
      data-kumo-part="item-label"
      class={cn(
        'm-0 group relative flex items-start gap-3 rounded-lg border border-kumo-hairline bg-kumo-base p-3 transition-colors has-[[data-state=checked]]:border-kumo-interact has-[[data-state=checked]]:bg-kumo-tint',
        radioControlPosition(appearanceProp, getContext<RadioGroupContext | undefined>('kumo-radio-group')) ===
          'start' && 'flex-row-reverse',
        variant === 'error' &&
          'border-kumo-danger has-[[data-state=checked]]:border-kumo-danger has-[[data-state=checked]]:bg-kumo-base',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : cn(
              'has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 cursor-pointer',
              variant !== 'error' && 'hover:not-has-[[data-disabled]]:bg-kumo-tint'
            ),
        className
      )}
    >
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <span class="text-base font-medium text-kumo-default">
          {#if typeof label === 'string'}{label}{:else}{@render label()}{/if}
        </span>
        {#if description}
          <span class="text-sm text-kumo-subtle">
            {#if typeof description === 'string'}{description}{:else}{@render description()}{/if}
          </span>
        {/if}
        {@render children?.()}
      </div>
      {@render control(true)}
    </label>
  {:else}
    <label
      data-kumo-component="Radio"
      data-kumo-part="item-label"
      class={cn(
        'm-0 group relative inline-flex items-center gap-2',
        radioControlPosition(appearanceProp, getContext<RadioGroupContext | undefined>('kumo-radio-group')) ===
          'end' && 'flex-row-reverse justify-end',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
    >
      {@render control(false)}
      <span class="text-base text-kumo-default">
        {#if typeof label === 'string'}{label}{:else}{@render label()}{/if}
      </span>
      {@render children?.()}
    </label>
  {/if}
{/snippet}

{#snippet Legend({ children, class: className }: LegendProps)}
  <legend class={cn('text-base font-medium text-kumo-default', className)}>
    {@render children?.()}
  </legend>
{/snippet}

{#snippet radioChildren()}
  {#if children}
    {@render children()}
  {:else}
    {#each options as option (option.value)}
      {@render Item({ value: option.value, label: option.label, description: option.description, disabled: option.disabled, variant })}
    {/each}
  {/if}
{/snippet}

{#if __part === 'group'}
  {@render Group({ children, defaultValue, name, disabled, required, orientation, appearance, controlPosition, legend, description, error, class: className, onValueChange })}
{:else if __part === 'item'}
  {@render Item({ children, value: value ?? '', label: label ?? '', description, disabled, variant, appearance, class: className })}
{:else if __part === 'legend'}
  {@render Legend({ children, class: className })}
{:else}
  {@render Group({ children: radioChildren, defaultValue, name, disabled, required, orientation, appearance, controlPosition, legend, description, error, class: className, onValueChange })}
{/if}
