<script lang="ts">
  import { Popover } from "bits-ui";
  import type { Snippet } from "svelte";
  let {
    children,
    side = "bottom",
    sideOffset = 8,
    class: className,
    anchor,
    positionMethod,
    ...rest
  }: {
    children?: Snippet;
    side?: "top" | "bottom" | "left" | "right";
    sideOffset?: number;
    class?: string;
    anchor?: HTMLElement;
    positionMethod?: "fixed" | "absolute";
    [key: string]: unknown;
  } = $props();
</script>

<Popover.Content
  {side}
  {sideOffset}
  customAnchor={anchor}
  strategy={positionMethod ?? "absolute"}
  class={["z-50 duration-150 data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className]}
  style="--available-height: var(--bits-floating-available-height); --available-width: var(--bits-floating-available-width); --anchor-width: var(--bits-floating-anchor-width); --transform-origin: var(--bits-floating-transform-origin);"
  {...rest}>{@render children?.()}</Popover.Content
>
