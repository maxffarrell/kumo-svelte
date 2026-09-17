<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { LayerDialog } from 'kumo-svelte/components/layer-dialog';
</script>

<LayerDialog.Alert>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button variant="destructive" {...props}>Delete project</Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Delete project?</LayerDialog.Title>
    <LayerDialog.Description>This action cannot be undone.</LayerDialog.Description>
    <LayerDialog.Body>All deployments and settings will be permanently removed.</LayerDialog.Body>
    <LayerDialog.Actions dismissLabel="Cancel">
      <LayerDialog.Actions.Primary variant="destructive">Delete</LayerDialog.Actions.Primary>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Alert>
