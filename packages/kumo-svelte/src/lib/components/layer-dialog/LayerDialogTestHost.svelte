<script lang="ts">
  import { Button } from '$lib/components/button';
  import { LayerDialog } from './index';
  interface Props { alert?: boolean; dismissDisabled?: boolean; }
  let { alert = false, dismissDisabled = false }: Props = $props();
</script>

{#if alert}
  <LayerDialog.Alert {dismissDisabled}>
    <LayerDialog.Trigger>
      {#snippet child({ props })}<Button {...props}>Open alert</Button>{/snippet}
    </LayerDialog.Trigger>
    <LayerDialog.Content>
      <LayerDialog.Title>Delete project?</LayerDialog.Title>
      <LayerDialog.Description>This action cannot be undone.</LayerDialog.Description>
      <LayerDialog.Body>Deleting removes all project data.</LayerDialog.Body>
      <LayerDialog.Actions dismissLabel="Cancel">
        <LayerDialog.Actions.Primary variant="destructive">Delete</LayerDialog.Actions.Primary>
      </LayerDialog.Actions>
    </LayerDialog.Content>
  </LayerDialog.Alert>
{:else}
  <LayerDialog {dismissDisabled}>
    <LayerDialog.Trigger>
      {#snippet child({ props })}<Button {...props}>Open dialog</Button>{/snippet}
    </LayerDialog.Trigger>
    <LayerDialog.Content>
      <LayerDialog.Title>Edit profile</LayerDialog.Title>
      <LayerDialog.Description>Update the profile details.</LayerDialog.Description>
      <LayerDialog.Body>Profile form</LayerDialog.Body>
    </LayerDialog.Content>
  </LayerDialog>
{/if}
