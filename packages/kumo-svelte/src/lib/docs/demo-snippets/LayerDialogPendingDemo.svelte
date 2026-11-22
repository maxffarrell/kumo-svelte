<script lang="ts">
  import { Button, LayerDialog } from "kumo-svelte";
  let pending = $state(false);

  function save() {
    pending = true;
    setTimeout(() => {
      pending = false;
    }, 1500);
  }
</script>

<LayerDialog.Root dismissDisabled={pending}>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>
        Save a setting
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Save a setting</LayerDialog.Title>
    <LayerDialog.Description>
      While saving, Close, Escape, and backdrop dismissals are blocked together.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <p class="text-kumo-subtle">
        Programmatic closes still work, so a successful save can dismiss the
        dialog through a controlled open prop.
      </p>
    </LayerDialog.Body>
    <LayerDialog.Actions>
      <LayerDialog.Action loading={pending} onclick={save}>
        Save changes
      </LayerDialog.Action>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Root>
