<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';

  let showSidebar = $state(true);
  let showLineNumbers = $state(false);
  let wordWrap = $state(true);
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button>View Options</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Display</DropdownMenu.Label>
      <DropdownMenu.CheckboxItem bind:checked={showSidebar}>Show sidebar</DropdownMenu.CheckboxItem>
      <DropdownMenu.CheckboxItem bind:checked={showLineNumbers}>Show line numbers</DropdownMenu.CheckboxItem>
      <DropdownMenu.CheckboxItem bind:checked={wordWrap}>Word wrap</DropdownMenu.CheckboxItem>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu>
