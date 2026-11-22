<script module lang="ts">
  export interface LayerDialogTriggerProps {
    children?: import("svelte").Snippet;
    child?: import("svelte").Snippet<[{ props: Record<string, unknown> }]>;
    onclick?: import("svelte/elements").MouseEventHandler<HTMLButtonElement>;
    [key: string]: unknown;
  }
</script>

<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import { AlertDialog, Dialog } from "bits-ui";
  import { getLayerDialogContext } from "./context";
  let { children, child, onclick, ...rest }: LayerDialogTriggerProps = $props();
  const context = getLayerDialogContext("LayerDialog.Trigger");

  const focusTrigger: MouseEventHandler<HTMLButtonElement> = (event) => {
    onclick?.(event);
    // WebKit does not focus buttons on click. Give the focus scope a return target.
    if (!event.defaultPrevented)
      event.currentTarget.focus({ preventScroll: true });
  };
</script>

{#if context.alert}
  <AlertDialog.Trigger {child} onclick={focusTrigger} {...rest}>
    {@render children?.()}
  </AlertDialog.Trigger>
{:else}
  <Dialog.Trigger {child} onclick={focusTrigger} {...rest}>
    {@render children?.()}
  </Dialog.Trigger>
{/if}
