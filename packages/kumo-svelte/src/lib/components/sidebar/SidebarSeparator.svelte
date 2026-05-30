<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div data-sidebar="separator" class={cn('my-3 px-2', className)} {...rest}>
  <div class="border-b border-kumo-line"></div>
  {@render children?.()}
</div>
