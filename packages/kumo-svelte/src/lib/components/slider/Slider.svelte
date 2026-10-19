<script module lang="ts">
 import { cn } from '#lib/utils/cn.js';
 export const KUMO_SLIDER_VARIANTS = { size: { sm: { classes: 'h-6 rounded-md', description: 'Compact slider for dense layouts' }, base: { classes: 'h-8 rounded-lg', description: 'Default slider size' } } } as const;
 export const KUMO_SLIDER_DEFAULT_VARIANTS = { size: 'base' } as const;
 export type KumoSliderSize = keyof typeof KUMO_SLIDER_VARIANTS.size;
 export interface KumoSliderVariantsProps { size?: KumoSliderSize; }
 export interface SliderProps extends KumoSliderVariantsProps { label?: string | import('svelte').Snippet; value?: number | readonly number[]; defaultValue?: number | readonly number[]; min?: number; max?: number; step?: number; disabled?: boolean; name?: string; format?: Intl.NumberFormatOptions; locale?: string; getAriaLabel?: (index: number) => string; thumbAlignment?: 'edge' | 'center'; class?: string; onValueChange?: (value: number | number[]) => void; onValueCommitted?: (value: number | number[]) => void; [key: string]: unknown; }
 export function sliderVariants({ size = 'base' }: KumoSliderVariantsProps = {}) { return cn('bg-kumo-recessed p-[3px] ring ring-kumo-line', KUMO_SLIDER_VARIANTS.size[size].classes); }
</script>
<script lang="ts">
 import { Slider as Primitive } from 'bits-ui';
 let { label, size = 'base', min = 0, max = 100, step = 1, disabled = false, name, format, locale, getAriaLabel, thumbAlignment = 'edge', class: className, defaultValue, value = $bindable(defaultValue ?? min), onValueChange, onValueCommitted, ...rest }: SliderProps = $props();
 const labelId = $props.id();
 const values = $derived(Array.isArray(value) ? [...value] : [value as number]);
 const isRange = $derived(Array.isArray(value));
 const formatter = $derived(new Intl.NumberFormat(locale, format));
 const textSize = $derived(size === 'sm' ? 'text-xs' : 'text-sm');
 const innerRadius = $derived(size === 'sm' ? 'rounded' : 'rounded-md');
 function change(next: number[]) { value = isRange ? next : next[0]; onValueChange?.(isRange ? next : next[0]); }
 function commitValue(next: number[]) { onValueCommitted?.(isRange ? next : next[0]); }
</script>
<div data-kumo-component="Slider" class={cn('flex w-full flex-col gap-2', disabled && 'opacity-50', className)} data-disabled={disabled ? '' : undefined}>
 {#if label}<span id={labelId} class={cn('font-medium text-kumo-default', textSize)}>{#if typeof label === 'string'}{label}{:else}{@render label()}{/if}</span>{/if}
 <div class={sliderVariants({ size })}>
 <Primitive.Root type="multiple" value={values} onValueChange={change} onValueCommit={commitValue} {min} {max} {step} {disabled} {name} orientation="horizontal" thumbPositioning={thumbAlignment === 'edge' ? 'contain' : 'exact'} class="relative h-full" {...rest}>
 <Primitive.Range class={cn('absolute h-full bg-kumo-base shadow-sm ring ring-kumo-line', innerRadius)} />
 {#each values as current, index}
 <Primitive.Thumb {index} aria-label={getAriaLabel?.(index)} aria-labelledby={getAriaLabel ? undefined : label ? labelId : undefined} aria-valuetext={formatter.format(current)} class={cn('group h-full w-4 cursor-grab outline-none focus-visible:ring-2 focus-visible:ring-kumo-focus data-disabled:cursor-not-allowed data-dragging:cursor-grabbing', innerRadius)}>
 <span aria-hidden="true" class={cn('absolute top-1/2 left-1/2 h-1/2 w-0.5 -translate-1/2 rounded-full bg-kumo-contrast/25', isRange && index === 0 ? 'ml-[7px]' : '-ml-[7px]')} />
 <span aria-hidden="true" class={cn('absolute top-full left-1/2 mt-[11px] -translate-x-1/2 rounded bg-kumo-brand px-1.5 font-medium whitespace-nowrap text-white tabular-nums', textSize)}>{formatter.format(current)}</span>
 </Primitive.Thumb>
 {/each}
 </Primitive.Root>
 </div>
 <div aria-hidden="true" class={cn('flex justify-between text-kumo-subtle tabular-nums', textSize)}><span>{formatter.format(min)}</span><span>{formatter.format(max)}</span></div>
</div>
