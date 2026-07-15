<script lang="ts">
  import { Button } from '$lib/components/button';
  import { DropdownMenu } from '$lib/components/dropdown-menu';
  import Scenario from '$lib/vrt/Scenario.svelte';

  let showBookmarks = $state(true);
</script>

<Scenario id="default" label="closed">
  <div class="flex h-[400px] w-[400px] items-start justify-start pt-4 pl-4">
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button variant="secondary">Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item disabled>Disabled</DropdownMenu.Item>
        <DropdownMenu.Item variant="danger">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  </div>
</Scenario>

<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  <div class="flex h-[600px] w-[400px] items-start justify-start pt-4 pl-4">
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button variant="secondary">Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem bind:checked={showBookmarks}>Show bookmarks</DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Sub action</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item disabled>Disabled</DropdownMenu.Item>
        <DropdownMenu.Item variant="danger">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  </div>
</Scenario>
