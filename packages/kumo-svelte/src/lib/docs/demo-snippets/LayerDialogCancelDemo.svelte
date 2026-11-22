<script lang="ts">
  import { Button, LayerDialog, Input } from "kumo-svelte";
  let name = $state("Alex Morgan");
  let email = $state("alex@example.com");
</script>

<LayerDialog.Root>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>
        Edit profile
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Edit profile</LayerDialog.Title>
    <LayerDialog.Description>
      Update the profile information shown to your teammates. Changes are not
      saved until you confirm.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <div class="flex flex-col gap-5">
        <Input label="Display name" bind:value={name} /><Input
          label="Email address"
          type="email"
          bind:value={email}
        />
      </div>
    </LayerDialog.Body>
    <LayerDialog.Actions dismissLabel="Cancel">
      <LayerDialog.Action disabled={!name || !email}>
        Save changes
      </LayerDialog.Action>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Root>
