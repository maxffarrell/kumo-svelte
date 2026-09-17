<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AlertDialog, Dialog } from 'bits-ui';
  import { setLayerDialogContext } from './context';

  interface Props {
    children?: Snippet;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    dismissDisabled?: boolean;
    alert?: boolean;
    [key: string]: unknown;
  }

  let {
    children,
    open = $bindable(false),
    onOpenChange,
    dismissDisabled = false,
    alert = false,
    ...rest
  }: Props = $props();

  setLayerDialogContext({
    get alert() { return alert; },
    get dismissDisabled() { return dismissDisabled; }
  });
</script>

{#if alert}
  <AlertDialog.Root bind:open {onOpenChange} {...rest}>{@render children?.()}</AlertDialog.Root>
{:else}
  <Dialog.Root bind:open {onOpenChange} {...rest}>{@render children?.()}</Dialog.Root>
{/if}
