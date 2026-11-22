<script module lang="ts">
  export interface LayerDialogTitleProps {
    children?: import("svelte").Snippet;
    class?: string;
    [key: string]: unknown;
  }
</script>

<script lang="ts">
  import { AlertDialog, Dialog } from "bits-ui";
  import { getLayerDialogContext } from "./context";
  let { children, class: className, ...rest }: LayerDialogTitleProps = $props();
  const context = getLayerDialogContext("LayerDialog.Title");
</script>

{#if context.alert}
  <AlertDialog.Title
    data-layer-dialog-title
    class={[
      "shrink-0 px-4 pt-4 pb-4 text-lg font-medium text-kumo-default has-[+_[data-layer-dialog-description]]:pb-0 sm:px-4.5",
      className,
    ]}
    {...rest}
  >
    {@render children?.()}
  </AlertDialog.Title>
{:else}
  <Dialog.Title
    data-layer-dialog-title
    class={[
      "shrink-0 px-4 pt-4 pb-4 text-lg font-medium text-kumo-default has-[+_[data-layer-dialog-description]]:pb-0 sm:px-4.5",
      className,
    ]}
    {...rest}
  >
    {@render children?.()}
  </Dialog.Title>
{/if}
