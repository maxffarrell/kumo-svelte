<script lang="ts">
  import { Button } from '$lib/components/button';
  import { LayerDialog } from './index';
</script>

<LayerDialog open>
  <LayerDialog.Content>
    <LayerDialog.Title>Outer dialog</LayerDialog.Title>
    <LayerDialog.Body>
      <LayerDialog.Alert open>
        <LayerDialog.Content>
          <LayerDialog.Title>Nested alert</LayerDialog.Title>
          <LayerDialog.Body>Nested body</LayerDialog.Body>
          <LayerDialog.Actions><LayerDialog.Actions.Primary>Confirm</LayerDialog.Actions.Primary></LayerDialog.Actions>
        </LayerDialog.Content>
      </LayerDialog.Alert>
    </LayerDialog.Body>
    <LayerDialog.Actions><LayerDialog.Actions.Primary>Save</LayerDialog.Actions.Primary></LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog>
