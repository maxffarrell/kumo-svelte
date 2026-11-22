<script lang="ts">
  import { Button, LayerDialog } from "kumo-svelte";
</script>

<LayerDialog.Root>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>
        Review deployment
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Deployment summary</LayerDialog.Title>
    <LayerDialog.Description>
      Review the configuration before deploying.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <p class="text-kumo-subtle">
        production-api will deploy to the global network.
      </p>
      <LayerDialog.Separator />
      <p class="text-kumo-subtle">
        The deployment uses compatibility date 2026-10-26.
      </p>
    </LayerDialog.Body>
    <LayerDialog.Actions>
      <LayerDialog.Action>Deploy</LayerDialog.Action>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Root>
