<script lang="ts">
  import { Button } from '$lib/components/button';
  import Popover from './Popover.svelte';
</script>

<Popover title="Notifications" description="You are all caught up.">
  {#snippet trigger(props)}
    <Button {...props}>Open popover</Button>
  {/snippet}
  <p class="m-0 text-sm text-kumo-subtle">Review notification settings.</p>
  <div class="mt-3 flex gap-2">
    <Button size="sm" variant="secondary">Dismiss</Button>
    <Button size="sm" variant="primary">Save</Button>
  </div>
</Popover>
