<script lang="ts">
  import { Button, LayerDialog } from "kumo-svelte";
</script>

<LayerDialog.Root>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>
        Edit deployment
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Edit deployment</LayerDialog.Title>
    <LayerDialog.Description>
      Review the deployment settings before saving.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <div class="flex flex-col gap-4">
        <p class="text-kumo-subtle">
          Opening a second dialog from this body should keep the first dialog
          beneath it and restore focus when it closes.
        </p>
        <LayerDialog.Alert>
          <LayerDialog.Trigger>
            {#snippet child({ props })}<Button
                {...props}
                variant="secondary-destructive"
              >
                Discard changes
              </Button>{/snippet}
          </LayerDialog.Trigger>
          <LayerDialog.Content size="sm">
            <LayerDialog.Title>Discard unsaved changes?</LayerDialog.Title>
            <LayerDialog.Description>
              Your deployment edits will be permanently lost.
            </LayerDialog.Description>
            <LayerDialog.Body>
              <p class="text-kumo-subtle">
                This nested alert is independently portaled and should dismiss
                back to the edit dialog.
              </p>
            </LayerDialog.Body>
            <LayerDialog.Actions>
              <LayerDialog.Action variant="destructive">
                Discard changes
              </LayerDialog.Action>
            </LayerDialog.Actions>
          </LayerDialog.Content>
        </LayerDialog.Alert>
      </div>
    </LayerDialog.Body>
    <LayerDialog.Actions>
      <LayerDialog.Action>Save changes</LayerDialog.Action>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Root>
