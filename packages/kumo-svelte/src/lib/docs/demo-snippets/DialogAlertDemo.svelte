<script lang="ts">
  import { Warning } from 'phosphor-svelte';
  import { Button, Dialog } from 'kumo-svelte';

  let open = $state(false);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog bind:open role="alertdialog" class="p-8">
    {#snippet trigger(props)}
      <Button variant="destructive" {...props}>Delete Account</Button>
    {/snippet}
    <div class="mb-4 flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-kumo-danger/20">
        <Warning size={20} class="text-kumo-danger" weight="fill" />
      </div>
      <h2 class="text-xl font-semibold">Delete Account?</h2>
    </div>
    <p class="text-kumo-subtle">
      This action cannot be undone. All your data will be permanently removed from our servers.
      Are you sure you want to proceed?
    </p>
    <div class="mt-8 flex justify-end gap-2">
      <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
      <Button variant="destructive" onclick={() => (open = false)}>Delete Account</Button>
    </div>
  </Dialog>
</div>
