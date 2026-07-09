<script lang="ts">
  import Bell from 'phosphor-svelte/lib/Bell';
  import { Button } from '$lib/components/button';
  import { Popover } from '$lib/components/popover';
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button shape="square" icon={Bell} aria-label="Notifications" {...props} />
    {/snippet}
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Notifications</Popover.Title>
    <Popover.Description>You are all caught up. Good job!</Popover.Description>
  </Popover.Content>
</Popover.Root>
