<script lang="ts">
  import { autoInsetClasses } from "./styles";
  import type { Snippet } from "svelte";
  import { cn } from "#lib/utils/cn.js";

  interface Props {
    children?: Snippet;
    class?: string;
    inset?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, inset = false, ...rest }: Props = $props();
</script>

<div
  data-kumo-component="DropdownMenu"
  data-kumo-part="label"
  class={cn(
    "px-2 py-1.5 text-base font-semibold",
    autoInsetClasses,
    inset && "pl-8",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
