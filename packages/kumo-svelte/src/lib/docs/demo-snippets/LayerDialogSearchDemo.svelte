<script lang="ts">
  import { Button, LayerDialog, Input } from "kumo-svelte";
  const workers = [
    "production-api",
    "staging-api",
    "image-resizer",
    "auth-gateway",
    "email-router",
    "analytics-ingest",
  ];
  let query = $state("");
  const matches = $derived(
    workers.filter((worker) => worker.includes(query.trim().toLowerCase())),
  );
</script>

<LayerDialog.Root>
  <LayerDialog.Trigger>
    {#snippet child({ props })}<Button {...props}>
        Choose a Worker
      </Button>{/snippet}
  </LayerDialog.Trigger>
  <LayerDialog.Content>
    <LayerDialog.Title>Choose a Worker</LayerDialog.Title>
    <LayerDialog.Description>
      Select the Worker that handles requests for this route.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <div class="flex flex-col gap-3">
        <Input
          aria-label="Search Workers"
          placeholder="Search Workers"
          type="search"
          bind:value={query}
        />
        {#if matches.length}
          <ul
            class="flex flex-col divide-y divide-kumo-hairline rounded-lg border border-kumo-hairline"
          >
            {#each matches as worker (worker)}<li
                class="px-3 py-2 text-kumo-default"
              >
                {worker}
              </li>{/each}
          </ul>
        {:else}<p class="text-kumo-subtle">No Workers match “{query}”.</p>{/if}
      </div>
    </LayerDialog.Body>
  </LayerDialog.Content>
</LayerDialog.Root>
