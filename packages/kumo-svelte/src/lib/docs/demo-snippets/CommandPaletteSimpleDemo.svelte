<script lang="ts">
  import { Button } from '$lib/components/button';
  import { CommandPalette } from '$lib/components/command-palette';

  const simpleItems = [
    { id: '1', title: 'Copy' },
    { id: '2', title: 'Paste' },
    { id: '3', title: 'Cut' },
    { id: '4', title: 'Delete' },
    { id: '5', title: 'Select All' }
  ];

  let open = $state(false);
  let search = $state('');
  const filteredItems = $derived(
    simpleItems.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
  );
</script>

<div>
  <Button onclick={() => (open = true)}>Open Simple Palette</Button>

  <CommandPalette.Root bind:open shouldFilter={false}>
    <CommandPalette.Input bind:value={search} placeholder="Search actions..." />
    <CommandPalette.List>
      {#each filteredItems as item (item.id)}
        <CommandPalette.Item value={item.title} onSelect={() => (open = false)}>
          {item.title}
        </CommandPalette.Item>
      {/each}
      <CommandPalette.Empty>No actions found</CommandPalette.Empty>
    </CommandPalette.List>
  </CommandPalette.Root>
</div>
