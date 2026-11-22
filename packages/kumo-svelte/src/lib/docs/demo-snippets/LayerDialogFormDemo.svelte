<script lang="ts">
  import { Button, LayerDialog, Input } from "kumo-svelte";
  const formId = $props.id();
</script>

<LayerDialog.Root>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>
        Create deployment
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Create deployment</LayerDialog.Title>
    <LayerDialog.Description>
      The browser owns the form’s native validation and submission state.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <form
        id={formId}
        class="flex flex-col gap-5"
        onsubmit={(event) => event.preventDefault()}
      >
        <Input
          label="Service name"
          name="serviceName"
          placeholder="production-api"
          required
        /><Input
          label="Compatibility date"
          name="compatibilityDate"
          required
          type="date"
        />
      </form>
    </LayerDialog.Body>
    <LayerDialog.Actions dismissLabel="Cancel">
      <LayerDialog.Action form={formId} type="submit">
        Create deployment
      </LayerDialog.Action>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Root>
