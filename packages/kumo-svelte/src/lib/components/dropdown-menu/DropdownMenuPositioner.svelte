<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import type { Snippet } from "svelte";
  import { getDropdownSub } from "./context";
  type Side = "top" | "right" | "bottom" | "left";
  type Offset =
    | number
    | ((state: { side: Side; align: "start" | "center" | "end" }) => number);
  let {
    children,
    side,
    align = "start",
    sideOffset,
    alignOffset,
    class: className,
    ...rest
  }: {
    children?: Snippet;
    side?: Side;
    align?: "start" | "center" | "end";
    sideOffset?: Offset;
    alignOffset?: Offset;
    class?: string;
    [key: string]: unknown;
  } = $props();
  const sub = getDropdownSub();
  const Content = sub ? DropdownMenu.SubContent : DropdownMenu.Content;
  let element = $state<HTMLElement | null>(null);
  let resolvedSide = $state<Side | undefined>();
  const actualSide = $derived(
    resolvedSide ?? side ?? (sub ? "right" : "bottom"),
  );
  const block = $derived(actualSide === "top" || actualSide === "bottom");
  const offset = $derived(
    typeof sideOffset === "function"
      ? sideOffset({ side: actualSide, align })
      : (sideOffset ?? (sub && !block ? 2 : 8)),
  );
  const alignment = $derived(
    typeof alignOffset === "function"
      ? alignOffset({ side: actualSide, align })
      : (alignOffset ?? (sub && !block ? -6 : 0)),
  );
  $effect(() => {
    if (!element) return;
    const update = () => {
      resolvedSide = element?.dataset.side as Side;
    };
    const observer = new MutationObserver(update);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-side"],
    });
    update();
    return () => observer.disconnect();
  });
</script>

<Content
  bind:ref={element}
  {side}
  {align}
  sideOffset={offset}
  alignOffset={alignment}
  data-kumo-component="DropdownMenu"
  data-kumo-part="positioner"
  class={["z-50 outline-hidden duration-150 data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className]}
  {...rest}>{@render children?.()}</Content
>
