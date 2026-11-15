<script lang="ts">
  import type { Snippet } from "svelte";
  import { getPopoverContext } from "./context";
  const context = getPopoverContext();
  import { cn } from "#lib/utils/cn.js";
  let {
    children,
    class: className,
    ...rest
  }: { children?: Snippet; class?: string; [key: string]: unknown } = $props();
</script>

<div
  data-kumo-component="Popover"
  data-kumo-part="popup"
  data-state={context.open ? "open" : "closed"}
  class={cn(
    "flex flex-col rounded-lg bg-kumo-base px-4 py-3 text-sm text-kumo-default shadow-md outline outline-kumo-line kumo-popover-popup",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
