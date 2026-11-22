<script lang="ts">
  import { Button, LayerDialog, DropdownMenu } from "kumo-svelte";
</script>

<div class="flex flex-wrap justify-center gap-3">
  <LayerDialog.Root>
    <LayerDialog.Trigger>
      {#snippet child({ props })}<Button {...props}>
          Edit deployment
        </Button>{/snippet}
    </LayerDialog.Trigger>
    <LayerDialog.Content>
      <LayerDialog.Title>Save deployment</LayerDialog.Title>
      <LayerDialog.Description>
        Deploy these changes now, or keep them as a draft.
      </LayerDialog.Description>
      <LayerDialog.Body>
        <p class="text-kumo-subtle">
          The alternate save outcome is related to the primary action, so it
          lives in its split-button menu rather than as an unrelated footer
          button.
        </p>
      </LayerDialog.Body>
      <LayerDialog.Actions>
        <LayerDialog.Action menuLabel="Save options">
          Save and deploy{#snippet menu()}<DropdownMenu.Item>
              Save as draft
            </DropdownMenu.Item>{/snippet}
        </LayerDialog.Action>
      </LayerDialog.Actions>
    </LayerDialog.Content>
  </LayerDialog.Root><LayerDialog.Alert>
    <LayerDialog.Trigger>
      {#snippet child({ props })}<Button {...props}>
          Delete deployment
        </Button>{/snippet}
    </LayerDialog.Trigger>
    <LayerDialog.Content>
      <LayerDialog.Title>Delete deployment</LayerDialog.Title>
      <LayerDialog.Description>
        This permanently removes the deployment and cannot be undone.
      </LayerDialog.Description>
      <LayerDialog.Body>
        <p class="text-kumo-subtle">
          The destructive split button keeps every part of the action, including
          the menu trigger, visually consistent.
        </p>
      </LayerDialog.Body>
      <LayerDialog.Actions>
        <LayerDialog.Action menuLabel="Delete options" variant="destructive">
          Delete deployment{#snippet menu()}<DropdownMenu.Item>
              Delete and revoke tokens
            </DropdownMenu.Item>{/snippet}
        </LayerDialog.Action>
      </LayerDialog.Actions>
    </LayerDialog.Content>
  </LayerDialog.Alert>
</div>
