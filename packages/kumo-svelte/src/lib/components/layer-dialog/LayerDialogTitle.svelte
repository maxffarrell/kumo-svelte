<script module lang="ts">
  export interface LayerDialogTitleProps { children?: import('svelte').Snippet; class?: string; [key: string]: unknown; }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AlertDialog, Dialog } from 'bits-ui';
  import { getLayerDialogContext } from './context';
  let { children, class: className, ...rest }: LayerDialogTitleProps = $props();
  const context = getLayerDialogContext('LayerDialog.Title');
</script>

{#if context.alert}
  <AlertDialog.Title class={['px-4.5 pt-4 pr-14 text-lg font-medium text-kumo-default', className]} {...rest}>{@render children?.()}</AlertDialog.Title>
{:else}
  <Dialog.Title class={['px-4.5 pt-4 pr-14 text-lg font-medium text-kumo-default', className]} {...rest}>{@render children?.()}</Dialog.Title>
{/if}
