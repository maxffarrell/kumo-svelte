<script lang="ts">
  import { Button, Popover } from '$lib';
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props }: { props: Record<string, unknown> })}
      <Button {...props}>Open Settings</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Settings</Popover.Title>
    <Popover.Description>Configure your preferences below.</Popover.Description>
    <div class="mt-3">
      <Popover.Close>
        {#snippet child({ props }: { props: Record<string, unknown> })}
          <Button variant="secondary" size="sm" {...props}>Close</Button>
        {/snippet}
      </Popover.Close>
    </div>
  </Popover.Content>
</Popover.Root>
