<script lang="ts">
  import { Button, LayerDialog } from "kumo-svelte";
</script>

<LayerDialog.Root>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>
        Open keyboard shortcuts
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Keyboard shortcuts</LayerDialog.Title>
    <LayerDialog.Description>
      Browse available shortcuts without changing a setting.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <div class="flex flex-col gap-5">
        <div class="rounded-lg border border-kumo-line p-4 text-kumo-subtle">
          Navigation and command shortcuts
        </div>
        <p class="text-kumo-subtle">
          The title frame stays visible while the content scrolls.
        </p>
        <div class="h-96"></div>
      </div>
    </LayerDialog.Body>
  </LayerDialog.Content>
</LayerDialog.Root>
