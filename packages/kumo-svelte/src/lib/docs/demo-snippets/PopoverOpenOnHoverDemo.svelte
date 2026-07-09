<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Popover } from '$lib/components/popover';
</script>

<Popover.Root>
  <Popover.Trigger openOnHover openDelay={200}>
    {#snippet child({ props })}
      <Button variant="secondary" {...props}>Hover Me</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Hover Triggered</Popover.Title>
    <Popover.Description>
      This popover opens on hover with a 200ms delay. It can still contain interactive content like
      buttons and links.
    </Popover.Description>
    <div class="mt-3">
      <Popover.Close>
        {#snippet child({ props })}
          <Button variant="secondary" size="sm" {...props}>Got it</Button>
        {/snippet}
      </Popover.Close>
    </div>
  </Popover.Content>
</Popover.Root>
