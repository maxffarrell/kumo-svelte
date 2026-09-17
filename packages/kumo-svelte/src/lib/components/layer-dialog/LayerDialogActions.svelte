<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AlertDialog, Dialog } from 'bits-ui';
  import { Button } from '$lib/components/button';
  import { getLayerDialogContext } from './context';
  interface Props { children?: Snippet; dismissLabel?: string; class?: string; }
  let { children, dismissLabel, class: className }: Props = $props();
  const context = getLayerDialogContext('LayerDialog.Actions');
  const label = $derived(dismissLabel ?? (context.alert ? 'Cancel' : 'Close'));
</script>

<div data-layer-dialog-actions class={['flex w-full shrink-0 items-center justify-between gap-2 p-1.5 pt-1.75', className]}>
  {#if context.alert}
    <AlertDialog.Cancel disabled={context.dismissDisabled}>
      {#snippet child({ props })}<Button {...props} variant="ghost">{label}</Button>{/snippet}
    </AlertDialog.Cancel>
  {:else}
    <Dialog.Close disabled={context.dismissDisabled}>
      {#snippet child({ props })}<Button {...props} variant="ghost">{label}</Button>{/snippet}
    </Dialog.Close>
  {/if}
  {@render children?.()}
</div>
