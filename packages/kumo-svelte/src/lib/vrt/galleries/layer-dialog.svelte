<script lang="ts">
  import { Button } from '$lib/components/button';
  import { LayerDialog } from '$lib/components/layer-dialog';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  <LayerDialog>
    <LayerDialog.Trigger>{#snippet child({ props })}<Button {...props}>Open dialog</Button>{/snippet}</LayerDialog.Trigger>
    <LayerDialog.Content>
      <LayerDialog.Title>Edit profile</LayerDialog.Title>
      <LayerDialog.Description>Update the details associated with this profile.</LayerDialog.Description>
      <LayerDialog.Body><div class="min-h-40">Profile form content</div></LayerDialog.Body>
      <LayerDialog.Actions><LayerDialog.Actions.Primary>Save changes</LayerDialog.Actions.Primary></LayerDialog.Actions>
    </LayerDialog.Content>
  </LayerDialog>
</Scenario>

<Scenario id="alert" label="alert" interact={[{ type: 'click' }]} capture="page">
  <LayerDialog.Alert>
    <LayerDialog.Trigger>{#snippet child({ props })}<Button variant="destructive" {...props}>Delete</Button>{/snippet}</LayerDialog.Trigger>
    <LayerDialog.Content size="sm" verticalAlign="top">
      <LayerDialog.Title>Delete project?</LayerDialog.Title>
      <LayerDialog.Description>This action cannot be undone.</LayerDialog.Description>
      <LayerDialog.Body>All project data will be removed.</LayerDialog.Body>
      <LayerDialog.Actions dismissLabel="Cancel"><LayerDialog.Actions.Primary variant="destructive">Delete</LayerDialog.Actions.Primary></LayerDialog.Actions>
    </LayerDialog.Content>
  </LayerDialog.Alert>
</Scenario>
