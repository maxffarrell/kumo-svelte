<script module lang="ts">
  export interface LayerDialogTriggerProps {
    children?: import('svelte').Snippet;
    child?: import('svelte').Snippet<[{ props: Record<string, unknown> }]>
    [key: string]: unknown;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AlertDialog, Dialog } from 'bits-ui';
  import { getLayerDialogContext } from './context';
  let { children, child, ...rest }: LayerDialogTriggerProps = $props();
  const context = getLayerDialogContext('LayerDialog.Trigger');
</script>

{#if context.alert}
  <AlertDialog.Trigger {child} {...rest}>{@render children?.()}</AlertDialog.Trigger>
{:else}
  <Dialog.Trigger {child} {...rest}>{@render children?.()}</Dialog.Trigger>
{/if}
