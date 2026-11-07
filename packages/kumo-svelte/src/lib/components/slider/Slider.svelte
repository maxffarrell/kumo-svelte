<script module lang="ts">
  import { cn } from "#lib/utils/cn.js";
  export const KUMO_SLIDER_VARIANTS = {
    size: {
      sm: {
        classes: "h-6 rounded-md",
        description: "Compact slider for dense layouts",
      },
      base: { classes: "h-8 rounded-lg", description: "Default slider size" },
    },
  } as const;
  export const KUMO_SLIDER_DEFAULT_VARIANTS = { size: "base" } as const;
  export type KumoSliderSize = keyof typeof KUMO_SLIDER_VARIANTS.size;
  export interface KumoSliderVariantsProps {
    size?: KumoSliderSize;
  }
  export type SliderValue = number | readonly number[];
  export interface SliderProps<
    Value extends SliderValue = SliderValue,
  > extends KumoSliderVariantsProps {
    label?: string | import("svelte").Snippet;
    value?: Value;
    defaultValue?: Value;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    form?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    format?: Intl.NumberFormatOptions;
    locale?: string;
    getAriaLabel?: (index: number) => string;
    thumbAlignment?: "edge" | "center";
    class?: string;
    onValueChange?: (value: Value) => void;
    onValueCommitted?: (value: Value) => void;
    [key: string]: unknown;
  }
  export function sliderVariants({
    size = "base",
  }: KumoSliderVariantsProps = {}) {
    return cn(
      "bg-kumo-recessed p-[3px] ring ring-kumo-line",
      KUMO_SLIDER_VARIANTS.size[size].classes,
    );
  }
</script>

<script lang="ts" generics="Value extends SliderValue = number">
  import { untrack } from "svelte";
  import { Slider as Primitive } from "bits-ui";
  let {
    label,
    size = "base",
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    name,
    form,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    format,
    locale,
    getAriaLabel,
    thumbAlignment = "edge",
    class: className,
    defaultValue,
    value = $bindable((defaultValue ?? min) as Value),
    onValueChange,
    onValueCommitted,
    ...rest
  }: SliderProps<Value> = $props();
  const labelId = $props.id();
  let rootElement = $state<HTMLDivElement | null>(null);
  const initialValue = untrack(() =>
    Array.isArray(value) ? ([...value] as unknown as Value) : value,
  );
  $effect(() => {
    const owner = form
      ? document.getElementById(form)
      : rootElement?.closest("form");
    if (!(owner instanceof HTMLFormElement)) return;
    let active = true;
    const reset = (event: Event) =>
      queueMicrotask(() => {
        if (!active || event.defaultPrevented) return;
        value = Array.isArray(initialValue)
          ? ([...initialValue] as unknown as Value)
          : initialValue;
        onValueChange?.(value);
      });
    owner.addEventListener("reset", reset);
    return () => {
      active = false;
      owner.removeEventListener("reset", reset);
    };
  });
  const values = $derived(
    Array.isArray(value) ? [...value] : [value as number],
  );
  const isRange = $derived(Array.isArray(value));
  const formatter = $derived(new Intl.NumberFormat(locale, format));
  const textSize = $derived(size === "sm" ? "text-xs" : "text-sm");
  const innerRadius = $derived(size === "sm" ? "rounded" : "rounded-md");
  function change(next: number[]) {
    value = (isRange ? next : next[0]) as Value;
    onValueChange?.(value);
  }
  function commitValue(next: number[]) {
    onValueCommitted?.((isRange ? next : next[0]) as Value);
  }
</script>

<div
  bind:this={rootElement}
  data-kumo-component="Slider"
  class={cn(
    "flex w-full flex-col gap-2 data-disabled:opacity-50",
    disabled && "opacity-50",
    className,
  )}
  data-disabled={disabled ? "" : undefined}
>
  {#if label}<span
      id={labelId}
      class={cn("font-medium text-kumo-default", textSize)}
      >{#if typeof label === "string"}{label}{:else}{@render label()}{/if}</span
    >{/if}
  <div class={sliderVariants({ size })}>
    <Primitive.Root
      {...rest}
      type="multiple"
      value={values}
      onValueChange={change}
      onValueCommit={commitValue}
      {min}
      {max}
      {step}
      {disabled}
      orientation="horizontal"
      thumbPositioning={thumbAlignment === "edge" ? "contain" : "exact"}
      class="relative block h-full w-full touch-none select-none"
    >
      <Primitive.Range
        class={cn(
          "absolute h-full box-content! bg-kumo-overlay pr-2 shadow-sm ring ring-kumo-line",
          isRange && "-ml-2 pl-2",
          innerRadius,
        )}
      />
      {#each values as current, index}
        <Primitive.Thumb
          {index}
          aria-label={getAriaLabel?.(index) ?? ariaLabel}
          aria-labelledby={ariaLabelledBy ??
            (!getAriaLabel && !ariaLabel && label ? labelId : undefined)}
          aria-valuetext={formatter.format(current)}
          class={cn(
            "group h-full w-4 cursor-grab outline-none has-focus-visible:ring-2 has-focus-visible:ring-kumo-focus focus-visible:ring-2 focus-visible:ring-kumo-focus data-disabled:cursor-not-allowed data-dragging:cursor-grabbing",
            innerRadius,
          )}
        >
          <span
            aria-hidden="true"
            class={cn(
              "absolute top-1/2 left-1/2 h-1/2 w-0.5 -translate-1/2 rounded-full bg-kumo-contrast/25",
            )}
          ></span>
          <span
            aria-hidden="true"
            class={cn(
              "absolute top-full left-1/2 mt-[11px] -translate-x-1/2 rounded bg-kumo-contrast px-1.5 font-medium whitespace-nowrap text-kumo-inverse tabular-nums group-data-disabled:bg-kumo-fill group-data-disabled:text-kumo-default",
              textSize,
            )}>{formatter.format(current)}</span
          >
        </Primitive.Thumb>
      {/each}
      {#if name}{#each values as current}<input
            type="hidden"
            {name}
            {form}
            value={current}
            {disabled}
          />{/each}{/if}
    </Primitive.Root>
  </div>
  <div
    aria-hidden="true"
    class={cn("flex justify-between text-kumo-subtle tabular-nums", textSize)}
  >
    <span>{formatter.format(min)}</span><span>{formatter.format(max)}</span>
  </div>
</div>
