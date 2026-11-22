<script lang="ts">
  import {
    Button,
    LayerDialog,
    type KumoLayerDialogVerticalAlign,
  } from "kumo-svelte";
  let verticalAlign: KumoLayerDialogVerticalAlign = $state("center");
  let open = $state(false);
  const entries = Array.from({ length: 40 }, (_, index) => index + 1);

  function openAt(align: KumoLayerDialogVerticalAlign) {
    verticalAlign = align;
    open = true;
  }
</script>

<div class="flex flex-wrap gap-2">
  <Button onclick={() => openAt("center")}>Centered, tall content</Button>
  <Button onclick={() => openAt("top")}>Top-aligned, tall content</Button>
</div>
<LayerDialog.Root bind:open>
  <LayerDialog.Content {verticalAlign}>
    <LayerDialog.Title>Audit log</LayerDialog.Title>
    <LayerDialog.Description>
      The dialog grows with its content until it reaches the viewport cap, then
      only the body scrolls.
    </LayerDialog.Description>
    <LayerDialog.Body>
      <ol class="flex flex-col gap-2">
        {#each entries as entry (entry)}
          <li
            class="rounded-lg border border-kumo-line px-3 py-2 text-kumo-subtle"
          >
            Entry {entry}
          </li>
        {/each}
      </ol>
    </LayerDialog.Body>
    <LayerDialog.Actions>
      <LayerDialog.Action>Export log</LayerDialog.Action>
    </LayerDialog.Actions>
  </LayerDialog.Content>
</LayerDialog.Root>
