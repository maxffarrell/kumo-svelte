<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<ul data-sidebar="menu-sub" class={cn('relative m-0 flex min-w-0 list-none flex-col gap-y-px overflow-hidden p-0 pl-7 pr-0 group-data-[state=collapsed]/sidebar:hidden', className)} {...rest}>
  <div class="absolute inset-y-px left-[19px] z-10 w-px bg-kumo-line"></div>
  {@render children?.()}
</ul>
