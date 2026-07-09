<script lang="ts">
  import { X } from 'phosphor-svelte';
  import { Button, Dialog } from 'kumo-svelte';

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
      <Button {...props}>Click me</Button>
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
  </Dialog>
</div>
