<script lang="ts" module>
  /** Meter variant definitions (currently empty, reserved for future additions). */
  export const KUMO_METER_VARIANTS = {} as const;

  export const KUMO_METER_DEFAULT_VARIANTS = {} as const;

  export interface KumoMeterVariantsProps {}

  export function meterVariants(_props: KumoMeterVariantsProps = {}) {
    return 'flex w-full flex-col gap-2';
  }
</script>

<script lang="ts">
  import { cn } from '#lib/utils/cn.js';

  interface Props extends KumoMeterVariantsProps {
    class?: string;
    value?: number;
    min?: number;
    max?: number;
    customValue?: string;
    label: string;
    showValue?: boolean;
    trackClassName?: string;
    indicatorClassName?: string;
    [key: string]: unknown;
  }

  let {
    class: className,
    value = 0,
    min = 0,
    max = 100,
    customValue,
    label,
    showValue = true,
    trackClassName,
    indicatorClassName,
    ...rest
  }: Props = $props();

  let percentage = $derived.by(() => {
    const range = max - min;
    if (range <= 0) return 0;
    return Math.max(0, Math.min(100, ((value - min) / range) * 100));
  });

  let displayValue = $derived(`${Math.round(percentage)}%`);
</script>

<div
  class={cn('flex w-full flex-col gap-2', className)}
  role="meter"
  aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuetext={customValue}
  {...rest}
>
  <div class="flex items-center justify-between gap-4">
    <span class="text-xs text-kumo-subtle">{label}</span>
    {#if customValue}
      <span class="text-sm font-medium text-kumo-default tabular-nums">{customValue}</span>
    {:else if showValue}
      <span class="text-sm font-medium text-kumo-default tabular-nums">{displayValue}</span>
    {/if}
  </div>
  <div class={cn('relative h-2 w-full overflow-hidden rounded-full bg-kumo-fill', trackClassName)}>
    <div
      class={cn(
        'absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-kumo-brand via-kumo-brand to-kumo-brand transition-[width] duration-300 ease-out',
        indicatorClassName
      )}
      style:width={`${percentage}%`}
    ></div>
  </div>
</div>
