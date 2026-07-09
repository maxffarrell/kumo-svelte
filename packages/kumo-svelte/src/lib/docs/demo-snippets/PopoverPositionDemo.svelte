<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Popover } from '$lib/components/popover';
</script>

<div class="flex flex-wrap gap-4">
  <Popover.Root>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button variant="secondary" {...props}>Bottom</Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content side="bottom">
      <Popover.Title>Bottom</Popover.Title>
      <Popover.Description>Popover on bottom (default).</Popover.Description>
    </Popover.Content>
  </Popover.Root>

  <Popover.Root>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button variant="secondary" {...props}>Top</Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content side="top">
      <Popover.Title>Top</Popover.Title>
      <Popover.Description>Popover on top.</Popover.Description>
    </Popover.Content>
  </Popover.Root>

  <Popover.Root>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button variant="secondary" {...props}>Left</Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content side="left">
      <Popover.Title>Left</Popover.Title>
      <Popover.Description>Popover on left.</Popover.Description>
    </Popover.Content>
  </Popover.Root>

  <Popover.Root>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button variant="secondary" {...props}>Right</Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content side="right">
      <Popover.Title>Right</Popover.Title>
      <Popover.Description>Popover on right.</Popover.Description>
    </Popover.Content>
  </Popover.Root>
</div>
