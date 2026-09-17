<script lang="ts">
  import type { Snippet } from 'svelte';
  import Root from './LayerDialogRoot.svelte';

  interface Props {
    children?: Snippet;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    dismissDisabled?: boolean;
    [key: string]: unknown;
  }

  let { children, open = $bindable(false), onOpenChange, dismissDisabled = false, ...rest }: Props = $props();
</script>

<Root bind:open {onOpenChange} {dismissDisabled} alert {...rest}>{@render children?.()}</Root>
