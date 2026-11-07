<script lang="ts" generics="Value = unknown">
  import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { cn } from "#lib/utils/cn.js";
  import type {
    RadioAppearance,
    RadioControlPosition,
    RadioVariant,
  } from "./Radio.svelte";

  interface RadioGroupContext {
    readonly controlPosition: RadioControlPosition | undefined;
    readonly appearance: RadioAppearance;
    readonly selectedValue: string | undefined;
    readonly orientation: "vertical" | "horizontal";
    serializeValue: (value: unknown) => string;
  }

  export interface Props<Value = unknown> {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    variant?: RadioVariant;
    appearance?: Exclude<RadioAppearance, "segmented">;
    label: string | Snippet;
    description?: string | Snippet;
    value: Value;
  }

  let {
    children,
    class: className,
    disabled = false,
    variant = "default",
    appearance: appearanceProp,
    label,
    description,
    value,
  }: Props<Value> = $props();

  const group = getContext<RadioGroupContext | undefined>("kumo-radio-group");
  const appearance = $derived(
    group?.appearance === "segmented"
      ? "segmented"
      : (appearanceProp ?? group?.appearance ?? "default"),
  );
  const isCard = $derived(appearance === "card");
  const isJoined = $derived(isCard && group?.appearance === "card");
  const effectiveControlPosition = $derived(
    group?.controlPosition ?? (isCard ? "end" : "start"),
  );
  const controlAtStart = $derived(effectiveControlPosition === "start");
  const primitiveValue = $derived(
    group?.serializeValue(value) ??
      (typeof value === "string" ? value : String(value)),
  );
</script>

{#snippet control()}
  <RadioGroupPrimitive.Item
    data-checked={group?.selectedValue === primitiveValue ? "" : undefined}
    value={primitiveValue}
    {disabled}
    data-kumo-component="Radio"
    data-kumo-part="item"
    class={cn(
      isCard
        ? "relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-0 bg-kumo-base ring focus:outline-none focus:ring-kumo-focus focus-visible:ring-2 focus-visible:ring-kumo-brand"
        : "relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-0 bg-kumo-base ring focus:outline-none after:absolute after:-inset-x-3 after:-inset-y-2",
      variant === "error" ? "ring-kumo-danger" : "ring-kumo-line",
      !disabled &&
        variant !== "error" &&
        (isCard
          ? "group-hover:ring-kumo-hairline focus-visible:outline-offset-3"
          : "group-hover:ring-kumo-hairline focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:outline-offset-3"),
      !disabled &&
        variant === "error" &&
        (isCard
          ? "focus-visible:outline-offset-3"
          : "focus:ring-kumo-focus focus:ring-2 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:outline-offset-3"),
      "data-checked:bg-kumo-contrast data-[state=checked]:bg-kumo-contrast",
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

{#if appearance === "segmented"}
  <label
    data-kumo-component="Radio"
    data-kumo-part="item-label"
    class={cn(
      "group relative z-0 my-0 mr-0 -ml-px inline-flex h-8.5 shrink-0 cursor-pointer items-center border-r border-kumo-line/60 bg-transparent first:ml-0 last:border-r-0 px-3 text-sm font-medium whitespace-nowrap text-kumo-default select-none first:rounded-l-lg first:pl-2.75 last:rounded-r-lg last:pr-2.75 has-data-checked:text-kumo-inverse has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-kumo-brand before:absolute before:-inset-y-px before:-right-px before:left-0 before:-z-10 first:before:-left-px first:before:rounded-l-[9px] last:before:rounded-r-[9px] hover:not-has-data-disabled:not-has-data-checked:before:bg-kumo-contrast/7 has-data-checked:before:bg-kumo-contrast",
      variant === "error" &&
        "ring ring-kumo-danger hover:not-has-data-disabled:ring-kumo-danger has-data-checked:ring-kumo-danger",
      className,
    )}
  >
    <RadioGroupPrimitive.Item
      data-checked={group?.selectedValue === primitiveValue ? "" : undefined}
      value={primitiveValue}
      {disabled}
      data-kumo-component="Radio"
      data-kumo-part="item"
      class="sr-only"
    />
    <span
      >{#if typeof label === "string"}{label}{:else}{@render label()}{/if}</span
    >
  </label>
{:else if isCard}
  <label
    data-kumo-component="Radio"
    data-kumo-part="item-label"
    class={cn(
      "group relative m-0 flex items-start gap-3 bg-kumo-base p-3 has-data-checked:bg-kumo-tint",
      isJoined
        ? cn(
            "border-b border-kumo-line bg-clip-padding last:border-b-0",
            group?.orientation === "horizontal" &&
              "odd:border-r [&:last-child:nth-child(odd)]:border-r-0 [&:nth-last-child(2):nth-child(odd)]:border-b-0",
          )
        : "rounded-lg border border-kumo-hairline has-data-checked:border-kumo-interact",
      controlAtStart && "flex-row-reverse",
      variant === "error" &&
        cn(
          "has-data-checked:bg-kumo-base",
          !isJoined && "border-kumo-danger has-data-checked:border-kumo-danger",
        ),
      disabled
        ? "cursor-not-allowed opacity-50"
        : cn(
            "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 cursor-pointer",
            variant !== "error" &&
              "hover:not-has-data-disabled:not-has-data-checked:bg-kumo-elevated",
          ),
      className,
    )}
  >
    <div class="flex min-w-0 flex-1 flex-col gap-0.5">
      <span class="text-base font-medium text-kumo-default">
        {#if typeof label === "string"}{label}{:else}{@render label()}{/if}
      </span>
      {#if description}
        <span class="text-sm text-kumo-subtle">
          {#if typeof description === "string"}{description}{:else}{@render description()}{/if}
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
      "m-0 group relative inline-flex items-start gap-2",
      effectiveControlPosition === "end" && "flex-row-reverse justify-end",
      disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      className,
    )}
  >
    {@render control()}
    <span class="text-base text-kumo-default">
      {#if typeof label === "string"}{label}{:else}{@render label()}{/if}
    </span>
    {@render children?.()}
  </label>
{/if}
