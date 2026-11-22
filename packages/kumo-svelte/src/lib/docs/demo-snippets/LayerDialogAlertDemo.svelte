<script lang="ts">
  import { Button, LayerDialog, Input } from "kumo-svelte";
  const workerName = "example-worker";
  let confirmation = $state("");
  const confirmationLabel = `Type ${workerName} to confirm`;
</script>

<LayerDialog.Alert>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button
        {...props}
        variant="secondary-destructive"
      >
        Delete Worker
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Delete Worker</LayerDialog.Title>
    <LayerDialog.Description>
      Deleting <strong class="font-medium text-kumo-default">
        {workerName}
      </strong> is permanent.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <div class="flex flex-col gap-5">
        <p class="text-kumo-subtle">
          This deletes the Worker, deployments, and configuration. If this
          Worker consumes Queues, those connections are removed first. Queues,
          D1 databases, and messages stay in your account.
        </p>
        <Input
          label={confirmationLabel}
          placeholder={workerName}
          bind:value={confirmation}
        />
      </div>
    </LayerDialog.Body>
    <LayerDialog.Actions>
      <LayerDialog.Action
        disabled={confirmation !== workerName}
        variant="destructive"
      >
        Delete Worker
      </LayerDialog.Action>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Alert>
