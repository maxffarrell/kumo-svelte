<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div data-sidebar="group" class={cn('flex min-w-0 flex-col gap-y-px', className)} {...rest}>
  {@render children?.()}
</div>
