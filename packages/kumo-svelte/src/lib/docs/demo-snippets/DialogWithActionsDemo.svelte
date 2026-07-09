<script lang="ts">
  import X from 'phosphor-svelte/lib/X';
  import { Button } from 'kumo-svelte/components/button';
  import { Dialog } from 'kumo-svelte/components/dialog';

  let open = $state(false);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog
    bind:open
    title="Modal Title"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    class="p-8"
  >
    {#snippet trigger(props)}
      <Button {...props}>Delete</Button>
    {/snippet}
    <Button
      variant="secondary"
      shape="square"
      aria-label="Close"
      class="absolute top-8 right-8"
      onclick={() => (open = false)}
    >
      <X />
    </Button>
    <div class="mt-8 flex justify-end gap-2">
      <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
      <Button variant="destructive" onclick={() => (open = false)}>Delete</Button>
    </div>
  </Dialog>
</div>
