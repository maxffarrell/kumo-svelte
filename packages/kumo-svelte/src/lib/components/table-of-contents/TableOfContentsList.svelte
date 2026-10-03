<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<ul class={cn('flex flex-col gap-2 border-l-2 border-kumo-hairline', className)} {...rest}>
  {@render children?.()}
</ul>
