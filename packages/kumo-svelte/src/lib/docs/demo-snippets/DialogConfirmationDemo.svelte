<script lang="ts">
  import { Dialog } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog title="Edit Profile" description="Make changes and save when you are done.">
    {#snippet trigger()}<span class="inline-flex h-9 cursor-pointer items-center rounded-lg bg-kumo-base px-3 text-base font-medium text-kumo-default shadow-xs ring ring-kumo-hairline">Click me</span>{/snippet}
    <div class="grid gap-3">
      <p class="text-sm text-kumo-subtle">Dialog content goes here.</p>
    </div>
  </Dialog>
</div>
