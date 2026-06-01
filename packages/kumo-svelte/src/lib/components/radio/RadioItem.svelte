<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { RadioAppearance, RadioControlPosition, RadioVariant } from './Radio.svelte';

  interface RadioGroupContext {
    readonly controlPosition: RadioControlPosition | undefined;
    readonly appearance: RadioAppearance;
  }

  interface Props {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    variant?: RadioVariant;
    appearance?: RadioAppearance;
    label: string | Snippet;
    description?: string | Snippet;
    value: string;
  }

  let {
    children,
    class: className,
    disabled = false,
    variant = 'default',
    appearance: appearanceProp,
    label,
    description,
    value
  }: Props = $props();

  const group = getContext<RadioGroupContext | undefined>('kumo-radio-group');
  const appearance = $derived(appearanceProp ?? group?.appearance ?? 'default');
  const isCard = $derived(appearance === 'card');
  const effectiveControlPosition = $derived(group?.controlPosition ?? (isCard ? 'end' : 'start'));
  const controlAtStart = $derived(effectiveControlPosition === 'start');
</script>

{#snippet control()}
  <RadioGroupPrimitive.Item
    {value}
    {disabled}
    data-kumo-component="Radio"
    data-kumo-part="item"
    class={cn(
      isCard
        ? 'relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-0 bg-kumo-base ring ring-2 focus:outline-none focus:ring-kumo-focus focus-visible:ring-2 focus-visible:ring-kumo-brand'
        : 'relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-0 bg-kumo-base ring focus:outline-none after:absolute after:-inset-x-3 after:-inset-y-2',
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

{#if isCard}
  <label
    data-kumo-component="Radio"
    data-kumo-part="item-label"
    class={cn(
      'm-0 group relative flex items-start gap-3 rounded-lg border border-kumo-hairline bg-kumo-base p-3 transition-colors has-[[data-state=checked]]:border-kumo-interact has-[[data-state=checked]]:bg-kumo-tint',
      controlAtStart && 'flex-row-reverse',
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
    {@render control()}
  </label>
{:else}
  <label
    data-kumo-component="Radio"
    data-kumo-part="item-label"
    class={cn(
      'm-0 group relative inline-flex items-start gap-2',
      effectiveControlPosition === 'end' && 'flex-row-reverse justify-end',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      className
    )}
  >
    {@render control()}
    <span class="text-base text-kumo-default">
      {#if typeof label === 'string'}{label}{:else}{@render label()}{/if}
    </span>
    {@render children?.()}
  </label>
{/if}
