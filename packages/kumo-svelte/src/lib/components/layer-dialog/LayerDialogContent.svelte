<script lang="ts" module>
  export const KUMO_LAYER_DIALOG_VARIANTS = {
    size: {
      sm: { classes: 'sm:max-w-md', description: 'Compact desktop dialog width (448px)' },
      base: { classes: 'sm:max-w-xl', description: 'Default desktop dialog width (576px)' },
      lg: { classes: 'sm:max-w-2xl', description: 'Large desktop dialog width (672px)' },
      xl: { classes: 'sm:max-w-3xl', description: 'Extra large desktop dialog width (768px)' }
    },
    verticalAlign: {
      top: { classes: 'sm:items-start sm:pt-16 sm:pb-6', description: 'Align near the top' },
      center: { classes: 'sm:items-center sm:py-6', description: 'Center vertically' }
    }
  } as const;
  export const KUMO_LAYER_DIALOG_DEFAULT_VARIANTS = { size: 'base', verticalAlign: 'center' } as const;
  export type KumoLayerDialogSize = keyof typeof KUMO_LAYER_DIALOG_VARIANTS.size;
  export type KumoLayerDialogVerticalAlign = keyof typeof KUMO_LAYER_DIALOG_VARIANTS.verticalAlign;
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import X from 'phosphor-svelte/lib/X';
  import { AlertDialog, Dialog } from 'bits-ui';
  import { Button } from '$lib/components/button';
  import { cn } from '$lib/utils/cn';
  import { getLayerDialogContext } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    container?: HTMLElement | string;
    size?: KumoLayerDialogSize;
    verticalAlign?: KumoLayerDialogVerticalAlign;
    closeLabel?: string;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    container,
    size = KUMO_LAYER_DIALOG_DEFAULT_VARIANTS.size,
    verticalAlign = KUMO_LAYER_DIALOG_DEFAULT_VARIANTS.verticalAlign,
    closeLabel = 'Close',
    ...rest
  }: Props = $props();
  const context = getLayerDialogContext('LayerDialog.Content');
  const backdrop = 'fixed inset-0 bg-kumo-recessed opacity-80 transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none sm:duration-200';
  const viewport = $derived(cn('fixed inset-0 z-50 flex items-end justify-center sm:px-4', KUMO_LAYER_DIALOG_VARIANTS.verticalAlign[verticalAlign].classes));
  const content = $derived(cn(
    'group/layer-dialog fixed inset-x-0 bottom-0 flex max-h-[85dvh] min-h-0 w-full max-w-none overflow-visible rounded-t-xl bg-kumo-elevated p-1.5 shadow-[0_20px_25px_-5px_rgb(0_0_0/0.03),0_8px_10px_-6px_rgb(0_0_0/0.03)] ring-1 ring-kumo-hairline transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:translate-y-full data-starting-style:translate-y-full motion-reduce:transition-none sm:static sm:max-h-full sm:translate-y-0 sm:rounded-xl sm:duration-200 sm:data-ending-style:translate-y-2 sm:data-ending-style:opacity-0 sm:data-starting-style:translate-y-2 sm:data-starting-style:opacity-0',
    KUMO_LAYER_DIALOG_VARIANTS.size[size].classes,
    className
  ));

  function preventDismiss(event: Event) {
    if (context.dismissDisabled) event.preventDefault();
  }
</script>

{#snippet innerContent()}
  <div class="flex max-h-full min-h-0 w-full flex-col overflow-hidden rounded-lg bg-kumo-elevated">
    {#if !context.alert}<div aria-hidden="true" class="flex justify-center pt-1.5 pb-3 sm:hidden"><div class="h-1 w-10 rounded-full bg-kumo-fill"></div></div>{/if}
    <div class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-kumo-base">
      {#if context.alert}
        <AlertDialog.Cancel class="absolute top-3 right-3 z-20 group-has-[[data-layer-dialog-actions]]/layer-dialog:hidden" disabled={context.dismissDisabled}>
          {#snippet child({ props })}<Button {...props} aria-label={closeLabel} icon={X} shape="square" size="sm" variant="ghost" />{/snippet}
        </AlertDialog.Cancel>
      {:else}
        <Dialog.Close class="absolute top-3 right-3 z-20 group-has-[[data-layer-dialog-actions]]/layer-dialog:hidden" disabled={context.dismissDisabled}>
          {#snippet child({ props })}<Button {...props} aria-label={closeLabel} icon={X} shape="square" size="sm" variant="ghost" />{/snippet}
        </Dialog.Close>
      {/if}
      {@render children?.()}
    </div>
  </div>
{/snippet}

{#if context.alert}
  <AlertDialog.Portal to={container}>
    <AlertDialog.Overlay class={backdrop} />
    <div class={viewport}>
      <AlertDialog.Content class={content} onEscapeKeydown={preventDismiss} {...rest}>{@render innerContent()}</AlertDialog.Content>
    </div>
  </AlertDialog.Portal>
{:else}
  <Dialog.Portal to={container}>
    <Dialog.Overlay class={backdrop} />
    <div class={viewport}>
      <Dialog.Content class={content} onInteractOutside={preventDismiss} onEscapeKeydown={preventDismiss} {...rest}>{@render innerContent()}</Dialog.Content>
    </div>
  </Dialog.Portal>
{/if}
