<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<CommandPrimitive.GroupHeading class={cn('mb-2 px-2 pt-1 text-xs font-semibold text-kumo-subtle', className)} {...rest}>
  {@render children?.()}
</CommandPrimitive.GroupHeading>
