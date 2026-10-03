<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, forceMount, ...rest }: Props = $props();
</script>

<CommandPrimitive.Empty {forceMount} class={cn('p-8 text-center text-kumo-subtle', className)} {...rest}>
  <p>{@render children?.()}</p>
</CommandPrimitive.Empty>
