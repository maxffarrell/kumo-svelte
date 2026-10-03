<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    inset?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, inset = false, ...rest }: Props = $props();
</script>

<DropdownMenuPrimitive.GroupHeading class={cn('px-2 py-1.5 text-base font-semibold', inset && 'pl-8', className)} {...rest}>
  {@render children?.()}
</DropdownMenuPrimitive.GroupHeading>
