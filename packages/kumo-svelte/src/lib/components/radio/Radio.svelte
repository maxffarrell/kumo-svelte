<script module lang="ts">
  import { cn } from "#lib/utils/cn.js";

  export const KUMO_RADIO_VARIANTS = {
    variant: {
      default: {
        classes: "ring-kumo-hairline",
        description: "Default radio appearance",
      },
      error: {
        classes: "ring-kumo-danger",
        description: "Error state for validation failures",
      },
    },
    appearance: {
      default: {
        classes: "",
        description: "Standard inline radio item",
      },
      card: {
        classes:
          "rounded-lg border border-kumo-hairline bg-kumo-base p-3 hover:not-has-data-checked:bg-kumo-elevated has-data-checked:border-kumo-interact has-data-checked:bg-kumo-tint",
        description:
          "Choice card appearance with border, padding, and highlighted selection state",
      },
      segmented: {
        classes:
          "group relative z-0 my-0 mr-0 -ml-px first:ml-0 inline-flex h-8.5 shrink-0 cursor-pointer items-center border-r last:border-r-0 border-kumo-line/60 bg-transparent px-3 first:pl-2.75 last:pr-2.75 first:rounded-l-lg last:rounded-r-lg text-sm font-medium whitespace-nowrap text-kumo-default select-none has-data-checked:text-kumo-inverse has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-kumo-brand before:absolute before:-z-10 before:left-0 first:before:-left-px before:-right-px before:-inset-y-px first:before:rounded-l-[9px] last:before:rounded-r-[9px] hover:not-has-data-disabled:not-has-data-checked:before:bg-kumo-contrast/7 has-data-checked:before:bg-kumo-contrast",
        description:
          "Compact grouped-button appearance for short, mutually exclusive options",
      },
    },
  } as const;

  export const KUMO_RADIO_DEFAULT_VARIANTS = {
    variant: "default",
    appearance: "default",
  } as const;

  export type KumoRadioVariant = keyof typeof KUMO_RADIO_VARIANTS.variant;
  export type KumoRadioAppearance = keyof typeof KUMO_RADIO_VARIANTS.appearance;
  export type RadioVariant = KumoRadioVariant;
  export type RadioAppearance = KumoRadioAppearance;
  export type RadioControlPosition = "start" | "end";

  export function radioVariants({
    variant = KUMO_RADIO_DEFAULT_VARIANTS.variant,
    appearance = KUMO_RADIO_DEFAULT_VARIANTS.appearance,
  }: { variant?: KumoRadioVariant; appearance?: KumoRadioAppearance } = {}) {
    return cn(
      KUMO_RADIO_VARIANTS.variant[variant].classes,
      KUMO_RADIO_VARIANTS.appearance[appearance].classes,
    );
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import RadioGroup from "./RadioGroup.svelte";
  import RadioItem from "./RadioItem.svelte";

  interface Option {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }

  interface Props {
    children?: Snippet;
    options?: Option[];
    value?: string;
    defaultValue?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    orientation?: "vertical" | "horizontal";
    appearance?: RadioAppearance;
    variant?: RadioVariant;
    controlPosition?: RadioControlPosition;
    legend?: string;
    description?: string | Snippet;
    error?: string;
    class?: string;
    onValueChange?: (value: string, eventDetails?: unknown) => void;
  }

  let {
    children,
    options = [],
    value = $bindable(),
    defaultValue,
    name,
    disabled = false,
    required,
    orientation = "vertical",
    appearance = "default",
    variant = "default",
    controlPosition,
    legend,
    description,
    error,
    class: className,
    onValueChange,
  }: Props = $props();
</script>

<RadioGroup
  bind:value
  {defaultValue}
  {name}
  {disabled}
  {required}
  {orientation}
  {appearance}
  {controlPosition}
  {legend}
  {description}
  {error}
  class={className}
  {onValueChange}
>
  {#if children}
    {@render children()}
  {:else}
    {#each options as option (option.value)}
      <RadioItem
        value={option.value}
        label={option.label}
        description={option.description}
        disabled={option.disabled}
        {variant}
      />
    {/each}
  {/if}
</RadioGroup>
