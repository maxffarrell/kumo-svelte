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
    "origin-(--transform-origin) transition-[transform,scale,opacity] duration-150 data-starting-style:scale-90 data-starting-style:opacity-0 data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:duration-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-90",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
