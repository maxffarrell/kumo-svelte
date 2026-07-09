<script lang="ts">
  import { Warning } from 'phosphor-svelte';
  import { Button, Dialog } from 'kumo-svelte';

  let open = $state(false);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog bind:open disablePointerDismissal class="p-8">
    {#snippet trigger(props)}
      <Button variant="destructive" {...props}>Delete Project</Button>
    {/snippet}
    <div class="mb-4 flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-kumo-danger/20">
        <Warning size={20} class="text-kumo-danger" />
      </div>
      <h2 class="text-xl font-semibold">Delete Project?</h2>
    </div>
    <p class="text-kumo-subtle">
      This action cannot be undone. This will permanently delete the project and all associated
      data.
    </p>
    <div class="mt-8 flex justify-end gap-2">
      <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
      <Button variant="destructive" onclick={() => (open = false)}>Delete</Button>
    </div>
  </Dialog>
</div>
