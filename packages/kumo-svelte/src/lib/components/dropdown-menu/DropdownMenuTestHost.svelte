<script lang="ts">
  import { Button } from '$lib/components/button';
  import { DropdownMenu } from './index';

  let selected = $state(false);
  let lastAction = $state('');

  function handleSelect(action: string) {
    lastAction = action;
  }
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button variant="secondary" aria-label="Open menu">Actions</Button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Label>Actions</DropdownMenu.Label>
    <DropdownMenu.Item onSelect={() => handleSelect('edit')}>Edit</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => handleSelect('duplicate')}>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.CheckboxItem bind:checked={selected}>Show bookmarks</DropdownMenu.CheckboxItem>
    <DropdownMenu.Separator />
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>
        <DropdownMenu.Item onSelect={() => handleSelect('sub')}>Sub action</DropdownMenu.Item>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
    <DropdownMenu.Separator />
    <DropdownMenu.Item disabled>Disabled</DropdownMenu.Item>
    <DropdownMenu.Item variant="danger" onSelect={() => handleSelect('delete')}>Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>

{#if lastAction}
  <p data-testid="last-action">{lastAction}</p>
{/if}
