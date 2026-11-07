<script lang="ts">
  import { menuRowClasses } from "./styles";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import type { Snippet } from "svelte";
  import Check from "phosphor-svelte/lib/Check";
  import { cn } from "#lib/utils/cn.js";

  interface Props {
    children?: Snippet;
    class?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    [key: string]: unknown;
  }

  let {
    children: content,
    class: className,
    checked = $bindable(false),
    onCheckedChange,
    ...rest
  }: Props = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
  bind:checked
  {onCheckedChange}
  data-kumo-component="DropdownMenu"
  data-kumo-part="checkbox-item"
  class={cn(menuRowClasses, "pl-8 transition-colors", className)}
  {...rest}
>
  {#snippet children({ checked }: { checked: boolean })}
    <span
      class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-inherit"
    >
      {#if checked}<Check class="h-3 w-3 stroke-[3]" />{/if}
    </span>
    {@render content?.()}
  {/snippet}
</DropdownMenuPrimitive.CheckboxItem>
