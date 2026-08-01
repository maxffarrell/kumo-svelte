<script lang="ts">
  import type { Component, Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    href: string;
    icon?: Component;
    [key: string]: unknown;
  }

  let { children, href, icon: Icon, ...rest }: Props = $props();
</script>

<a href={href} data-kumo-component="Breadcrumbs" data-kumo-part="link" class="flex shrink-0 items-center gap-1 whitespace-nowrap text-kumo-subtle no-underline" {...rest}>
  {#if Icon}
    <span class="flex shrink-0 items-center">
      <Icon size={16} />
    </span>
  {/if}
  <span>{@render children?.()}</span>
</a>
