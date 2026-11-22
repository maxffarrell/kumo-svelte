<script lang="ts">
  import { Button, LayerDialog } from "kumo-svelte";
</script>

<LayerDialog.Root>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>
        Open top-aligned dialog
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content verticalAlign="top">
    <LayerDialog.Title>Top-aligned dialog</LayerDialog.Title>

    <LayerDialog.Body>
      <p class="text-kumo-subtle">Mobile dialogs remain bottom sheets.</p>
    </LayerDialog.Body>
  </LayerDialog.Content>
</LayerDialog.Root>
