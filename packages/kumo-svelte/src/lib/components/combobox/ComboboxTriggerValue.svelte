<script lang="ts">
  import { CaretDown } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';
  import { getComboboxContext, iconSizes, inputStyles, type ComboboxSize } from './context';

  export interface Props {
    class?: string;
    placeholder?: string;
    size?: ComboboxSize;
    [key: string]: unknown;
  }

  let { class: className, placeholder, size, ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.TriggerValue');
  const resolvedSize = $derived(size ?? context.size);
  const displayValue = $derived(context.labelFor(context.value));

  const iconPadding: Record<ComboboxSize, string> = {
    xs: 'pr-5',
    sm: 'pr-6',
    base: 'pr-8',
    lg: 'pr-10'
  };

  const iconRight: Record<ComboboxSize, string> = {
    xs: 'right-1',
    sm: 'right-1.5',
    base: 'right-2',
    lg: 'right-3'
  };
</script>

<button
  type="button"
  class={cn(
    inputStyles[resolvedSize],
    'relative flex w-full items-center border-0 bg-kumo-control text-left font-normal text-kumo-default shadow-xs ring ring-kumo-line outline-none',
    'focus:ring-kumo-focus/50 focus:ring-[1.5px] disabled:cursor-not-allowed disabled:opacity-50',
    !displayValue && 'text-kumo-placeholder',
    iconPadding[resolvedSize],
    className
  )}
  disabled={context.disabled}
  data-kumo-component="Combobox"
  data-kumo-part="trigger"
  onclick={() => (context.open = !context.open)}
  {...rest}
>
  <span class="min-w-0 flex-1 truncate">{displayValue || placeholder}</span>
  <span class={cn('absolute top-1/2 flex -translate-y-1/2 items-center text-kumo-subtle', iconRight[resolvedSize])}>
    <CaretDown size={iconSizes[resolvedSize]} class="fill-current" />
  </span>
</button>
