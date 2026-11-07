<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { setDropdownSub, setDropdownOpen } from './context';

  interface Props {
    children?: Snippet;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    [key: string]: unknown;
  }

  let { children, open = $bindable(false), onOpenChange, ...rest }: Props = $props();
  setDropdownSub(false);
  setDropdownOpen(() => open);
</script>

<DropdownMenuPrimitive.Root bind:open {onOpenChange} {...rest}>
  {@render children?.()}
</DropdownMenuPrimitive.Root>
