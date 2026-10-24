<script lang="ts">
  import type { Snippet } from "svelte";
  import { getPopoverContext } from "./context";
  let { children, ...rest }: { children?: Snippet; [key: string]: unknown } =
    $props();
  const context = getPopoverContext();
</script>

{#if context.open}<div aria-hidden="true" data-kumo-part="backdrop" {...rest}>
    {@render children?.()}
  </div>{/if}
