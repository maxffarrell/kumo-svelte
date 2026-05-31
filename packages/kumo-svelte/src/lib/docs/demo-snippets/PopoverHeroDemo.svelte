<script lang="ts">
  import { Bell } from 'phosphor-svelte';
  import { Button, Popover } from '$lib';
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props }: { props: Record<string, unknown> })}
      <Button shape="square" icon={Bell} aria-label="Notifications" {...props} />
    {/snippet}
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Notifications</Popover.Title>
    <Popover.Description>You are all caught up. Good job!</Popover.Description>
  </Popover.Content>
</Popover.Root>
