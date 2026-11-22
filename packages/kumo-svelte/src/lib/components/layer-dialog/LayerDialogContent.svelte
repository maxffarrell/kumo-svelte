<script lang="ts" module>
  export const KUMO_LAYER_DIALOG_VARIANTS = {
    size: {
      sm: {
        classes: "sm:max-w-md",
        description: "Compact desktop dialog width (448px)",
      },
      base: {
        classes: "sm:max-w-xl",
        description: "Default desktop dialog width (576px)",
      },
      lg: {
        classes: "sm:max-w-2xl",
        description: "Large desktop dialog width (672px)",
      },
      xl: {
        classes: "sm:max-w-3xl",
        description: "Extra large desktop dialog width (768px)",
      },
    },
    verticalAlign: {
      top: {
        classes: "sm:items-start sm:pt-16 sm:pb-6",
        description: "Align near the top",
      },
      center: {
        classes: "sm:items-center sm:py-6",
        description: "Center vertically",
      },
    },
  } as const;
  export const KUMO_LAYER_DIALOG_DEFAULT_VARIANTS = {
    size: "base",
    verticalAlign: "center",
  } as const;
  export type KumoLayerDialogSize =
    keyof typeof KUMO_LAYER_DIALOG_VARIANTS.size;
  export type KumoLayerDialogVerticalAlign =
    keyof typeof KUMO_LAYER_DIALOG_VARIANTS.verticalAlign;
  export interface LayerDialogContentProps {
    children?: import("svelte").Snippet;
    class?: string;
    container?: HTMLElement | string;
    size?: KumoLayerDialogSize;
    verticalAlign?: KumoLayerDialogVerticalAlign;
    closeLabel?: string;
    [key: string]: unknown;
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { setLayerDialogPortal } from "./portal-context";
  import { getKumoLocale } from "#lib/utils/locale.js";
  const locale = getKumoLocale();
  let portalElement = $state<HTMLElement | null>(null);
  setLayerDialogPortal(() => portalElement);
  import X from "phosphor-svelte/lib/X";
  import { AlertDialog, Dialog } from "bits-ui";
  import { Button } from "#lib/components/button/index.js";
  import { cn } from "#lib/utils/cn.js";
  import { getLayerDialogContext } from "./context";

  let {
    children,
    class: className,
    container,
    size = KUMO_LAYER_DIALOG_DEFAULT_VARIANTS.size,
    verticalAlign = KUMO_LAYER_DIALOG_DEFAULT_VARIANTS.verticalAlign,
    closeLabel = locale.layerDialog.close,
    ...rest
  }: LayerDialogContentProps = $props();
  const context = getLayerDialogContext("LayerDialog.Content");
  const backdrop =
    "fixed inset-0 bg-kumo-recessed opacity-80 transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none sm:duration-200";
  const viewport = $derived(
    cn(
      // Bits UI unmounts Content, but this positioning wrapper stays in the portal.
      "pointer-events-none fixed inset-0 z-50 flex items-end justify-center sm:px-4",
      KUMO_LAYER_DIALOG_VARIANTS.verticalAlign[verticalAlign].classes,
    ),
  );
  const content = $derived(
    cn(
      "group/layer-dialog pointer-events-auto fixed inset-x-0 bottom-0 flex max-h-[85dvh] min-h-0 w-full max-w-none overflow-visible bg-kumo-elevated p-1.5 outline-none max-sm:border-t max-sm:border-kumo-hairline max-sm:shadow-xs max-sm:ring-0 shadow-[0_20px_25px_-5px_rgb(0_0_0/0.03),0_8px_10px_-6px_rgb(0_0_0/0.03)] ring-1 ring-kumo-hairline transition-[translate,opacity] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:translate-y-full data-starting-style:translate-y-full motion-reduce:transition-none sm:static sm:max-h-full sm:translate-y-0 sm:rounded-xl sm:duration-200 sm:data-ending-style:translate-y-2 sm:data-ending-style:opacity-0 sm:data-starting-style:translate-y-2 sm:data-starting-style:opacity-0",
      KUMO_LAYER_DIALOG_VARIANTS.size[size].classes,
      className,
    ),
  );

  let condensed = $state(false);
  let layout = $state<HTMLElement | null>(null);
  $effect(() => {
    if (!layout) condensed = false;
  });

  function handleBodyScroll(event: Event) {
    const body = event.target;
    if (
      !(body instanceof HTMLElement) ||
      body.closest("[data-layer-dialog-layout]") !== layout ||
      !body.hasAttribute("data-scroll-area-viewport")
    )
      return;
    if (body.scrollTop <= 8) {
      condensed = false;
    } else if (!condensed) {
      const description = layout?.querySelector<HTMLElement>(
        "[data-layer-dialog-description]",
      );
      const descriptionHeight = description?.offsetHeight ?? 0;
      condensed =
        descriptionHeight > 0 &&
        body.scrollHeight - body.clientHeight - descriptionHeight > 16;
    }
  }

  function focusDialog(event: Event) {
    const popup = layout?.closest<HTMLElement>("[data-dialog-content]");
    if (!popup) return;
    event.preventDefault();
    popup.focus({ preventScroll: true });
  }

  function preventDismiss(event: Event) {
    if (context.dismissDisabled) event.preventDefault();
  }
</script>

{#snippet innerContent()}
  <div class="flex max-h-full min-h-0 w-full flex-col overflow-visible">
    {#if !context.alert}<div
        aria-hidden="true"
        class="flex justify-center pt-1.5 pb-3 sm:hidden"
      >
        <div class="h-1 w-10 rounded-full bg-kumo-fill"></div>
      </div>{/if}
    <div
      class="layer-dialog-layout relative grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_auto_minmax(0,1fr)_auto] text-base"
      data-layer-dialog-layout
      data-condensed={condensed || undefined}
      bind:this={layout}
      onscrollcapture={handleBodyScroll}
    >
      {#if context.alert}
        <AlertDialog.Cancel
          class="absolute top-2.5 right-2.5 z-20 group-has-[[data-layer-dialog-actions]]/layer-dialog:hidden"
          disabled={context.dismissDisabled}
        >
          {#snippet child({ props })}<Button
              {...props}
              aria-label={closeLabel}
              icon={X}
              shape="square"
              size="sm"
              variant="ghost"
            />{/snippet}
        </AlertDialog.Cancel>
      {:else}
        <Dialog.Close
          class="absolute top-2.5 right-2.5 z-20 group-has-[[data-layer-dialog-actions]]/layer-dialog:hidden"
          disabled={context.dismissDisabled}
        >
          {#snippet child({ props })}<Button
              {...props}
              aria-label={closeLabel}
              icon={X}
              shape="square"
              size="sm"
              variant="ghost"
            />{/snippet}
        </Dialog.Close>
      {/if}
      {@render children?.()}
    </div>
  </div>
{/snippet}

{#if context.alert}
  <AlertDialog.Portal to={container}>
    <AlertDialog.Overlay data-layer-dialog-backdrop class={backdrop} />
    <div class={viewport} bind:this={portalElement}>
      <AlertDialog.Content
        class={content}
        onEscapeKeydown={preventDismiss}
        {...rest}
      >
        {@render innerContent()}
      </AlertDialog.Content>
    </div>
  </AlertDialog.Portal>
{:else}
  <Dialog.Portal to={container}>
    <Dialog.Overlay data-layer-dialog-backdrop class={backdrop} />
    <div class={viewport} bind:this={portalElement}>
      <Dialog.Content
        class={content}
        tabindex={-1}
        onOpenAutoFocus={focusDialog}
        onInteractOutside={preventDismiss}
        onEscapeKeydown={preventDismiss}
        {...rest}
      >
        {@render innerContent()}
      </Dialog.Content>
    </div>
  </Dialog.Portal>
{/if}

<style>
  .layer-dialog-layout::before {
    content: "";
    grid-area: 1 / 1 / 5 / 2;
    border-radius: var(--radius-lg);
    background: var(--color-kumo-base);
    box-shadow:
      0 0 0 1px var(--color-kumo-line),
      var(--shadow-xs);
    pointer-events: none;
  }

  @media (width >= 40rem) {
    .layer-dialog-layout::before {
      grid-row-end: 4;
    }
  }

  .layer-dialog-layout > :global([data-layer-dialog-title]),
  .layer-dialog-layout > :global([data-layer-dialog-description]),
  .layer-dialog-layout > :global([data-layer-dialog-body]),
  .layer-dialog-layout > :global([data-layer-dialog-actions]) {
    position: relative;
    grid-column: 1;
  }

  .layer-dialog-layout > :global([data-layer-dialog-title]) {
    grid-row: 1;
  }
  .layer-dialog-layout > :global([data-layer-dialog-description]) {
    grid-row: 2;
  }
  .layer-dialog-layout > :global([data-layer-dialog-body]) {
    grid-row: 3;
  }
  .layer-dialog-layout > :global([data-layer-dialog-actions]) {
    grid-row: 4;
  }
</style>
