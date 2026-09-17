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

<div data-layer-dialog-actions class={['flex w-full shrink-0 items-center justify-between gap-2 border-t border-kumo-hairline p-4 sm:border-t-0 sm:p-1.5 sm:pt-1.75', className]}>
  {#if context.alert}
    <AlertDialog.Cancel disabled={context.dismissDisabled}>
      {#snippet child({ props })}<Button {...props} variant="secondary" class="sm:bg-transparent sm:ring-0">{label}</Button>{/snippet}
    </AlertDialog.Cancel>
  {:else}
    <Dialog.Close disabled={context.dismissDisabled}>
      {#snippet child({ props })}<Button {...props} variant="secondary" class="sm:bg-transparent sm:ring-0">{label}</Button>{/snippet}
    </Dialog.Close>
  {/if}
  {@render children?.()}
</div>
