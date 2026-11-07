<script lang="ts">
  import type { Snippet } from "svelte";
  let { children, ...rest }: { children?: Snippet; [key: string]: unknown } =
    $props();
</script>

<div data-kumo-part="viewport" {...rest}>{@render children?.()}</div>
