<script lang="ts">
  import {
    Button,
    LayerDialog,
    Input,
    type KumoLayerDialogSize,
  } from "kumo-svelte";
  let open = $state(false);
  let size: KumoLayerDialogSize = $state("base");
  const sizes = [
    ["sm", "Small"],
    ["base", "Default"],
    ["lg", "Large"],
    ["xl", "Extra large"],
  ] as const;
</script>

<div class="flex flex-wrap gap-2">
  {#each sizes as [value, label] (value)}
    <Button
      onclick={() => {
        size = value;
        open = true;
      }}
    >
      {label}
    </Button>
  {/each}
</div>
<LayerDialog.Root bind:open>
  <LayerDialog.Content {size}>
    <LayerDialog.Title>Review deployment configuration</LayerDialog.Title>
    <LayerDialog.Description>
      Confirm the service details and routing configuration before this
      deployment is created.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <div class="grid gap-5 sm:grid-cols-2">
        <Input label="Service name" value="production-api" />
        <Input label="Environment" value="Production" />
        <Input label="Hostname" value="api.example.com" />
        <Input label="Compatibility date" value="2026-09-09" />
      </div>
    </LayerDialog.Body>
    <LayerDialog.Actions>
      <LayerDialog.Action>Create deployment</LayerDialog.Action>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Root>
