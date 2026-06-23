<script lang="ts">
  import { Button, Dialog } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog title="Max width override" description="This dialog uses class=&quot;max-w-lg&quot; and should stay capped around 512px on desktop." class="max-w-lg p-8">
    {#snippet trigger(props)}
      <Button {...props}>Open capped dialog</Button>
    {/snippet}
    <div class="mt-4 truncate rounded-md border border-kumo-line bg-kumo-recessed p-3 font-mono text-sm">
      abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
    </div>
  </Dialog>
</div>
