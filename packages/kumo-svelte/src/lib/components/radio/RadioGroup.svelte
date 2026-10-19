<script lang="ts" generics="Value = string">
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';
  import type { RadioAppearance, RadioControlPosition } from './Radio.svelte';

  export interface Props<Value = string> {
    children?: Snippet;
    legend?: string;
    orientation?: 'vertical' | 'horizontal';
    appearance?: RadioAppearance;
    error?: string;
    description?: string | Snippet;
    value?: Value;
    defaultValue?: Value;
    disabled?: boolean;
    required?: boolean;
    controlPosition?: RadioControlPosition;
    name?: string;
    class?: string;
    onValueChange?: (value: Value, eventDetails?: unknown) => void;
  }

  let {
    children,
    legend,
    orientation = 'vertical',
    appearance = 'default',
    error,
    description,
    defaultValue,
    value = $bindable(defaultValue),
    disabled = false,
    required,
    controlPosition,
    name,
    class: className,
    onValueChange
  }: Props<Value> = $props();

  const serializedValues = new Map<string, unknown>();

  $effect(() => {
    if (value === undefined && defaultValue !== undefined) {
      value = defaultValue;
    }
  });

  function serializeValue(itemValue: unknown) {
    if (typeof itemValue === 'string') return itemValue;

    const serialized = `kumo-radio:${typeof itemValue}:${String(itemValue)}`;
    serializedValues.set(serialized, itemValue);
    return serialized;
  }

  function deserializeValue(serializedValue: string) {
    return serializedValues.has(serializedValue) ? serializedValues.get(serializedValue) : serializedValue;
  }

  const primitiveValue = $derived(value === undefined ? undefined : serializeValue(value));
  function handleValueChange(nextValue: string, eventDetails?: unknown) {
    const deserializedValue = deserializeValue(nextValue) as Value;
    value = deserializedValue;
    onValueChange?.(deserializedValue, eventDetails);
  }

  setContext('kumo-radio-group', {
    get controlPosition() {
      return controlPosition;
    },
    get orientation() { return orientation; },
    get appearance() {
      return appearance;
    },
    serializeValue
  });
</script>

<RadioGroupPrimitive.Root
  value={primitiveValue}
  {orientation}
  {disabled}
  {required}
  {name}
  onValueChange={handleValueChange}
>
  <fieldset class={cn('flex flex-col p-0', appearance === 'card' ? 'gap-2' : 'gap-4', className)} {disabled}>
    {#if legend}
      <legend class="text-base font-medium text-kumo-default">
        {legend}
      </legend>
    {/if}
    <div
      class={cn(
        orientation === 'vertical'
          ? appearance === 'card' ? 'flex flex-col overflow-hidden rounded-lg ring ring-kumo-line' : 'flex flex-col gap-2'
          : appearance === 'card'
            ? 'grid grid-cols-2 overflow-hidden rounded-lg bg-kumo-base ring ring-kumo-line'
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
