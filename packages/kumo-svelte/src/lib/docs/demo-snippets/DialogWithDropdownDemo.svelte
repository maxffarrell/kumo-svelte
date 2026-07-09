<script lang="ts">
  import X from 'phosphor-svelte/lib/X';
  import { Button } from 'kumo-svelte/components/button';
  import { Dialog } from 'kumo-svelte/components/dialog';
  import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';

  let open = $state(false);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog
    bind:open
    title="Resource Actions"
    description="Choose an action for the selected resource."
    class="p-8"
  >
    {#snippet trigger(props)}
      <Button {...props}>Open Form</Button>
    {/snippet}
    <Button
      variant="secondary"
      shape="square"
      aria-label="Close"
      class="absolute top-8 right-8"
      onclick={() => (open = false)}
    >
      <X />
    </Button>
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button>Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="danger">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
    <div class="mt-8 flex justify-end">
      <Button variant="secondary" onclick={() => (open = false)}>Close</Button>
    </div>
  </Dialog>
</div>
