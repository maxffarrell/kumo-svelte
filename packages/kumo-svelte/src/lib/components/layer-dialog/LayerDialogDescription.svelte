<script module lang="ts">
  export interface LayerDialogDescriptionProps { children?: import('svelte').Snippet; class?: string; [key: string]: unknown; }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AlertDialog, Dialog } from 'bits-ui';
  import { getLayerDialogContext } from './context';
  let { children, class: className, ...rest }: LayerDialogDescriptionProps = $props();
  const context = getLayerDialogContext('LayerDialog.Description');
</script>

{#if context.alert}
  <AlertDialog.Description class={['px-4.5 pt-1 text-base text-kumo-subtle', className]} {...rest}>{@render children?.()}</AlertDialog.Description>
{:else}
  <Dialog.Description class={['px-4.5 pt-1 text-base text-kumo-subtle', className]} {...rest}>{@render children?.()}</Dialog.Description>
{/if}
