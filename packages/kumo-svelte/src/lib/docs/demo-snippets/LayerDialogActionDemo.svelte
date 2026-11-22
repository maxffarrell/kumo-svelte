<script lang="ts">
  import { Button, LayerDialog, Input } from "kumo-svelte";
  let name = $state("Production API");
  let hostname = $state("api.example.com");
</script>

<LayerDialog.Root>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>
        Open settings
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Configure custom hostname</LayerDialog.Title>
    <LayerDialog.Description>
      Route requests for this hostname to your Worker.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <div class="flex flex-col gap-5">
        <Input label="Hostname" bind:value={hostname} /><Input
          label="Display name"
          bind:value={name}
        />
      </div>
    </LayerDialog.Body>
    <LayerDialog.Actions>
      <LayerDialog.Action disabled={!hostname || !name}>
        Save hostname
      </LayerDialog.Action>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Root>
