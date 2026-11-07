<script module lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  export interface LayerDialogSeparatorProps extends HTMLAttributes<HTMLHRElement> { ref?: HTMLHRElement | null; }
</script>
<script lang="ts">
  import { cn } from '#lib/utils/cn.js';
  let { ref = $bindable(null), class: className, ...rest }: LayerDialogSeparatorProps = $props();
</script>
<hr bind:this={ref} class={cn('-mx-4 my-4 h-px border-0 bg-kumo-hairline sm:-mx-4.5', className)} {...rest} />
