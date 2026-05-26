<script lang="ts">
  import { Button, Tooltip } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="flex gap-4">
    <Tooltip content="Opens after 1 second" delay={1000}><Button variant="secondary">1s open delay</Button></Tooltip>
    <Tooltip content="Stays open 500ms after leaving" closeDelay={500}><Button variant="secondary">500ms close delay</Button></Tooltip>
    <Tooltip content="Instant open, stays 1s" delay={0} closeDelay={1000}><Button variant="secondary">Instant + 1s close</Button></Tooltip>
  </div>
</div>
