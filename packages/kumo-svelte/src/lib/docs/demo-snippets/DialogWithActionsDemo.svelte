<script lang="ts">
  import X from 'phosphor-svelte/lib/X';
  import { Button } from 'kumo-svelte/components/button';
  import { Dialog } from 'kumo-svelte/components/dialog';

  let open = $state(false);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog
    bind:open
    class="p-8"
  >
    {#snippet trigger(props)}
      <Button {...props}>Delete</Button>
    {/snippet}
    <div class="mb-4 flex items-start justify-between gap-4">
      <h2 class="text-2xl font-semibold">Modal Title</h2>
      <Button variant="secondary" shape="square" aria-label="Close" onclick={() => (open = false)}>
        <X />
      </Button>
    </div>
    <p class="text-kumo-subtle">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>
    <div class="mt-8 flex justify-end gap-2">
      <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
      <Button variant="destructive" onclick={() => (open = false)}>Delete</Button>
    </div>
  </Dialog>
</div>
