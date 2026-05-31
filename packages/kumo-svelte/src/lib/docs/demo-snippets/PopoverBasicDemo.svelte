<script lang="ts">
  import { Button, Popover } from '$lib';
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props }: { props: Record<string, unknown> })}
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
