<script lang="ts">
  import X from 'phosphor-svelte/lib/X';
  import type { Snippet } from 'svelte';
  import { Button } from '$lib/components/button';
  import { getSidebarContext } from './context';

  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
  const sidebar = getSidebarContext('Sidebar.Close');
</script>

<Button
  variant="ghost"
  shape="square"
  size="sm"
  data-sidebar="close"
  data-kumo-component="Sidebar"
  data-kumo-part="close"
  aria-label="Close navigation"
  class={className}
  onclick={() => sidebar.setOpenMobile(false)}
  {...rest}
>
  {#if children}{@render children()}{:else}<X size={18} aria-hidden="true" />{/if}
</Button>
