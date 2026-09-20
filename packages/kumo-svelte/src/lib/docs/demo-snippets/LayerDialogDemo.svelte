<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { LayerDialog } from 'kumo-svelte/components/layer-dialog';
</script>

<LayerDialog>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>Open layer dialog</Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Edit profile</LayerDialog.Title>
    <LayerDialog.Description>Update the details associated with this profile.</LayerDialog.Description>
    <LayerDialog.Body>
      <div class="min-h-40">Profile form content</div>
    </LayerDialog.Body>
    <LayerDialog.Actions dismissLabel="Close">
      <LayerDialog.Actions.Primary>Save changes</LayerDialog.Actions.Primary>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog>
