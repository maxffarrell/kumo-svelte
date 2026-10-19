<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from "bits-ui";
  import Check from "phosphor-svelte/lib/Check";
  import Minus from "phosphor-svelte/lib/Minus";
  import { getContext, type Snippet } from "svelte";
  import {
    checkboxControlClasses,
    checkboxInteractiveClasses,
    checkboxVariantClasses,
    type CheckboxVariant,
  } from "./Checkbox.svelte";
  import { cn } from "#lib/utils/cn.js";

  interface CheckboxGroupContext {
    readonly controlFirst: boolean | undefined;
    readonly appearance: "default" | "card";
    readonly orientation: "vertical" | "horizontal";
  }

  interface Props {
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    variant?: CheckboxVariant;
    label: string | Snippet;
    description?: string | Snippet;
    appearance?: "default" | "card";
    children?: Snippet;
    value?: string;
    name?: string;
    onCheckedChange?: (checked: boolean) => void;
    onIndeterminateChange?: (indeterminate: boolean) => void;
  }

  let {
    class: className,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    disabled = false,
    variant = "default",
    label,
    description,
    appearance: appearanceProp,
    children,
    value,
    name,
    onCheckedChange,
    onIndeterminateChange,
  }: Props = $props();

  const group = getContext<CheckboxGroupContext | undefined>(
    "kumo-checkbox-group",
  );
  const isCard = $derived((appearanceProp ?? group?.appearance) === "card");
  const isJoined = $derived(isCard && group?.appearance === "card");
</script>

<label
  data-kumo-component="Checkbox"
  data-kumo-part="item-label"
  class={cn(
    isCard
      ? cn(
          "group relative m-0 flex items-start gap-3 bg-kumo-base p-3 has-[[data-checked]]:bg-kumo-tint has-[[data-checked]]:bg-kumo-tint",
          isJoined
            ? cn(
                "border-b border-kumo-line bg-clip-padding last:border-b-0",
                group?.orientation === "horizontal" &&
                  "odd:border-r [&:last-child:nth-child(odd)]:border-r-0 [&:nth-last-child(2):nth-child(odd)]:border-b-0",
              )
            : "rounded-lg border border-kumo-hairline has-[[data-checked]]:border-kumo-interact",
          !disabled &&
            variant !== "error" &&
            "hover:not-has-[[data-disabled]]:not-has-[[data-checked]]:bg-kumo-elevated",
        )
      : "m-0 relative inline-flex items-center gap-2",
    !(group?.controlFirst ?? !isCard) && "flex-row-reverse justify-end",
    isCard &&
      variant === "error" &&
      cn(
        "has-[[data-checked]]:bg-kumo-base",
        !isJoined &&
          "border-kumo-danger has-[[data-checked]]:border-kumo-danger",
      ),
    isCard &&
      "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50",
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
    className,
  )}
>
  <CheckboxPrimitive.Root
    bind:checked
    bind:indeterminate
    {value}
    {name}
    {disabled}
    data-kumo-component="Checkbox"
    data-kumo-part="item"
    data-checked={checked ? "" : undefined}
    data-indeterminate={indeterminate ? "" : undefined}
    {onCheckedChange}
    {onIndeterminateChange}
    class={cn(
      "peer",
      isCard
        ? "relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-0 bg-kumo-base ring focus:ring-kumo-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand data-[state=checked]:bg-kumo-contrast data-[state=checked]:ring-kumo-contrast data-[state=indeterminate]:bg-kumo-contrast data-[state=indeterminate]:ring-kumo-contrast"
        : checkboxControlClasses,
      checkboxVariantClasses(variant),
      !disabled &&
        (isCard
          ? "group-hover:ring-kumo-hairline"
          : checkboxInteractiveClasses),
    )}
  >
    {#if indeterminate}
      <Minus
        class="h-3 w-3 text-kumo-inverse"
        weight="bold"
        aria-hidden="true"
      />
    {:else if checked}
      <Check
        class="h-3 w-3 text-kumo-inverse"
        weight="bold"
        aria-hidden="true"
      />
    {/if}
  </CheckboxPrimitive.Root>
  <div class="flex min-w-0 flex-1 flex-col gap-0.5">
    <span class={cn("text-base text-kumo-default", isCard && "font-medium")}
      >{#if typeof label === "string"}{label}{:else}{@render label()}{/if}</span
    >{#if description}<span class="text-sm text-kumo-subtle"
        >{#if typeof description === "string"}{description}{:else}{@render description()}{/if}</span
      >{/if}{@render children?.()}
  </div>
</label>
