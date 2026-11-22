<script module lang="ts">
  export interface LayerDialogDescriptionProps {
    children?: import("svelte").Snippet;
    class?: string;
    [key: string]: unknown;
  }
</script>

<script lang="ts">
  import { AlertDialog, Dialog } from "bits-ui";
  import { getLayerDialogContext } from "./context";
  let {
    children,
    class: className,
    ...rest
  }: LayerDialogDescriptionProps = $props();
  const context = getLayerDialogContext("LayerDialog.Description");
</script>

<div
  data-layer-dialog-description
  class="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-200 ease-out [[data-layer-dialog-layout][data-condensed]>&]:grid-rows-[0fr] [[data-layer-dialog-layout][data-condensed]>&]:opacity-0 motion-reduce:transition-none"
>
  <div class="min-h-0 overflow-hidden">
    {#if context.alert}
      <AlertDialog.Description
        class={[
          "px-4 pt-1 pb-4 text-base text-kumo-subtle sm:px-4.5",
          className,
        ]}
        {...rest}
      >
        {@render children?.()}
      </AlertDialog.Description>
    {:else}
      <Dialog.Description
        class={[
          "px-4 pt-1 pb-4 text-base text-kumo-subtle sm:px-4.5",
          className,
        ]}
        {...rest}
      >
        {@render children?.()}
      </Dialog.Description>
    {/if}
  </div>
</div>
