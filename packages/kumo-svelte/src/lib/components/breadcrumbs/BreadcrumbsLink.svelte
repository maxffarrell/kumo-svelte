<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    href: string;
    icon?: Component;
    [key: string]: unknown;
  }

  let { children, class: className, href, icon: Icon, ...rest }: Props = $props();
</script>

<a href={href} data-kumo-component="Breadcrumbs" data-kumo-part="link" class={cn('flex min-w-0 max-w-full items-center gap-1 text-kumo-subtle no-underline', className)} {...rest}>
  {#if Icon}
    <span class="flex shrink-0 items-center">
      <Icon size={16} />
    </span>
  {/if}
  <span class="truncate">{@render children?.()}</span>
</a>
