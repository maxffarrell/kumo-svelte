<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AlertDialog, Dialog } from 'bits-ui';
  import { getLayerDialogContext } from './context';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
  const context = getLayerDialogContext('LayerDialog.Title');
</script>

{#if context.alert}
  <AlertDialog.Title class={['px-4.5 pt-4 pr-14 text-lg font-medium text-kumo-default', className]} {...rest}>{@render children?.()}</AlertDialog.Title>
{:else}
  <Dialog.Title class={['px-4.5 pt-4 pr-14 text-lg font-medium text-kumo-default', className]} {...rest}>{@render children?.()}</Dialog.Title>
{/if}
