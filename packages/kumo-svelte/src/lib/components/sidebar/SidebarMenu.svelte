<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<ul data-sidebar="menu" class={cn('m-0 flex min-w-0 list-none flex-col items-stretch gap-y-px p-0', className)} {...rest}>
  {@render children?.()}
</ul>
