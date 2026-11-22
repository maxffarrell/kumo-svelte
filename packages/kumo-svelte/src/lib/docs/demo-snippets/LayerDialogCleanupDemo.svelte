<script lang="ts">
  import { Button, LayerDialog } from "kumo-svelte";
  let cleanupCount = $state(0);
</script>

<LayerDialog.Root
  onOpenChange={(open) => {
    if (!open) cleanupCount += 1;
  }}
>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>Open draft</Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Draft settings</LayerDialog.Title>

    <LayerDialog.Body>
      <p class="text-kumo-subtle">
        Cleanup has run {cleanupCount} time{cleanupCount === 1 ? "" : "s"}.
      </p>
    </LayerDialog.Body>
  </LayerDialog.Content>
</LayerDialog.Root>
