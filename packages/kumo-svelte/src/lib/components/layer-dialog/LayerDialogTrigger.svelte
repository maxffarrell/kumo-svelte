<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AlertDialog, Dialog } from 'bits-ui';
  import { getLayerDialogContext } from './context';
  interface Props {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    [key: string]: unknown;
  }
  let { children, child, ...rest }: Props = $props();
  const context = getLayerDialogContext('LayerDialog.Trigger');
</script>

{#if context.alert}
  <AlertDialog.Trigger {child} {...rest}>{@render children?.()}</AlertDialog.Trigger>
{:else}
  <Dialog.Trigger {child} {...rest}>{@render children?.()}</Dialog.Trigger>
{/if}
