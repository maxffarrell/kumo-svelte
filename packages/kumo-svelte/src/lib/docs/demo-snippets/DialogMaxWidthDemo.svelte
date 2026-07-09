<script lang="ts">
  import X from 'phosphor-svelte/lib/X';
  import { Button } from 'kumo-svelte/components/button';
  import { Dialog } from 'kumo-svelte/components/dialog';

  let open = $state(false);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog
    bind:open
    title="Max width override"
    description='This dialog uses class="max-w-lg" and should stay capped around 512px on desktop.'
    class="max-w-lg p-8"
  >
    {#snippet trigger(props)}
      <Button {...props}>Open capped dialog</Button>
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
    <div class="mt-4 truncate rounded-md border border-kumo-line bg-kumo-recessed p-3 font-mono text-sm">
      abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
    </div>
  </Dialog>
</div>
