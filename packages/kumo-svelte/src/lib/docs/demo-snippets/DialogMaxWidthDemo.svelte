<script lang="ts">
  import X from 'phosphor-svelte/lib/X';
  import { Button } from 'kumo-svelte/components/button';
  import { Dialog } from 'kumo-svelte/components/dialog';

  let open = $state(false);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog
    bind:open
    class="max-w-lg p-8"
  >
    {#snippet trigger(props)}
      <Button {...props}>Open capped dialog</Button>
    {/snippet}
    <div class="mb-4 flex items-start justify-between gap-4">
      <h2 class="text-2xl font-semibold">Max width override</h2>
      <Button variant="secondary" shape="square" aria-label="Close" onclick={() => (open = false)}>
        <X />
      </Button>
    </div>
    <p class="text-kumo-subtle">
      This dialog uses <code>class="max-w-lg"</code> and should stay capped around 512px on desktop.
    </p>
    <div class="mt-4 truncate rounded-md border border-kumo-line bg-kumo-recessed p-3 font-mono text-sm">
      abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
    </div>
  </Dialog>
</div>
