<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { RadioAppearance, RadioControlPosition } from './Radio.svelte';

  interface Props {
    children?: Snippet;
    legend?: string;
    orientation?: 'vertical' | 'horizontal';
    appearance?: RadioAppearance;
    error?: string;
    description?: string | Snippet;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    required?: boolean;
    controlPosition?: RadioControlPosition;
    name?: string;
    class?: string;
    onValueChange?: (value: string) => void;
  }

  let {
    children,
    legend,
    orientation = 'vertical',
    appearance = 'default',
    error,
    description,
    defaultValue,
    value = $bindable(defaultValue ?? ''),
    disabled = false,
    required,
    controlPosition,
    name,
    class: className,
    onValueChange
  }: Props = $props();

  $effect(() => {
    if (value === undefined && defaultValue !== undefined) {
      value = defaultValue;
    }
  });

  setContext('kumo-radio-group', {
    get controlPosition() {
      return controlPosition;
    },
    get appearance() {
      return appearance;
    }
  });
</script>

<RadioGroupPrimitive.Root bind:value {orientation} {disabled} {required} {name} {onValueChange}>
  <fieldset class={cn('flex flex-col gap-4', className)} {disabled}>
    {#if legend}
      <legend class="text-base font-medium text-kumo-default">
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
