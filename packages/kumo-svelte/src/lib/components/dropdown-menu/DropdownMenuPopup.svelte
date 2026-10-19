<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "#lib/utils/cn.js";
  import { getDropdownOpen } from "./context";
  const getOpen = getDropdownOpen();
  import { popupClasses } from "./styles";
  let {
    children,
    class: className,
    ...rest
  }: { children?: Snippet; class?: string; [key: string]: unknown } = $props();
</script>

<div
  data-kumo-component="DropdownMenu"
  data-kumo-part="popup"
  data-state={getOpen?.() ? "open" : "closed"}
  class={cn(popupClasses, className)}
  {...rest}
>
  {@render children?.()}
</div>
