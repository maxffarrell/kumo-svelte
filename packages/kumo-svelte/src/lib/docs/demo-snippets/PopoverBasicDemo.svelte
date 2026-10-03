<script lang="ts">
  import { Button } from '#lib/components/button/index.js';
  import { Popover } from '#lib/components/popover/index.js';
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Open Popover</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Popover Title</Popover.Title>
    <Popover.Description>
      This is a basic popover with a title and description.
    </Popover.Description>
  </Popover.Content>
</Popover.Root>
