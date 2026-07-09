<script lang="ts">
  import Plus from 'phosphor-svelte/lib/Plus';
  import { Button } from 'kumo-svelte/components/button';
  import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button icon={Plus}>Add</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Worker</DropdownMenu.Item>
    <DropdownMenu.Item>Pages</DropdownMenu.Item>
    <DropdownMenu.Item>KV Namespace</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
