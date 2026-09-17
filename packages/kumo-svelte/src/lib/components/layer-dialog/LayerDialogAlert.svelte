<script module lang="ts">
  export interface LayerDialogAlertProps {
    children?: import('svelte').Snippet;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    dismissDisabled?: boolean;
    [key: string]: unknown;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import Root from './LayerDialogRoot.svelte';

  let { children, open = $bindable(false), onOpenChange, dismissDisabled = false, ...rest }: LayerDialogAlertProps = $props();
</script>

<Root bind:open {onOpenChange} {dismissDisabled} alert {...rest}>{@render children?.()}</Root>
