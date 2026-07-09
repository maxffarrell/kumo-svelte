<script lang="ts">
  import Copy from 'phosphor-svelte/lib/Copy';
  import PencilSimple from 'phosphor-svelte/lib/PencilSimple';
  import Trash from 'phosphor-svelte/lib/Trash';
  import { Button } from 'kumo-svelte/components/button';
  import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button>Edit</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item icon={PencilSimple}>Rename</DropdownMenu.Item>
    <DropdownMenu.Item icon={Copy}>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item inset>Move to folder</DropdownMenu.Item>
    <DropdownMenu.Item inset>Add to favorites</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item icon={Trash} variant="danger">Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
