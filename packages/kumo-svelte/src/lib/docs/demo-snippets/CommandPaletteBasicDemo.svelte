<script lang="ts">
  import { Button, CommandPalette } from '$lib';
  import { ChartLine, Folder, Gear, House, MagnifyingGlass, Users } from 'phosphor-svelte';

  interface CommandItem {
    id: string;
    title: string;
    icon: typeof Folder;
  }

  interface CommandGroup {
    id: string;
    label: string;
    items: CommandItem[];
  }

  const sampleGroups: CommandGroup[] = [
    {
      id: 'commands',
      label: 'Commands',
      items: [
        { id: 'new-project', title: 'Create New Project', icon: Folder },
        { id: 'settings', title: 'Open Settings', icon: Gear },
        { id: 'search', title: 'Search Files', icon: MagnifyingGlass }
      ]
    },
    {
      id: 'pages',
      label: 'Pages',
      items: [
        { id: 'home', title: 'Home', icon: House },
        { id: 'dashboard', title: 'Dashboard', icon: ChartLine },
        { id: 'users', title: 'Users', icon: Users }
      ]
    }
  ];

  let open = $state(false);
  let search = $state('');
  let selectedItem = $state<string | null>(null);

  const filteredGroups = $derived.by(() => {
    if (!search) return sampleGroups;
    const lowerQuery = search.toLowerCase();
    return sampleGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.title.toLowerCase().includes(lowerQuery))
      }))
      .filter((group) => group.items.length > 0);
  });

  function handleSelect(item: CommandItem) {
    selectedItem = item.title;
    open = false;
    search = '';
  }
</script>

<div class="flex flex-col items-start gap-4">
  <Button onclick={() => (open = true)}>Open Command Palette</Button>
  {#if selectedItem}
    <p class="text-sm text-kumo-subtle">
      Last selected: <span class="text-kumo-default">{selectedItem}</span>
    </p>
  {/if}

  <CommandPalette.Root bind:open shouldFilter={false}>
    <CommandPalette.Input bind:value={search} placeholder="Type a command or search..." />
    <CommandPalette.List>
      {#each filteredGroups as group (group.id)}
        <CommandPalette.Group value={group.label}>
          <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
          <CommandPalette.Items>
            {#each group.items as item (item.id)}
              <CommandPalette.Item value={item.title} onSelect={() => handleSelect(item)}>
                <span class="flex items-center gap-3">
                  <span class="text-kumo-subtle">
                    <item.icon size={16} />
                  </span>
                  <span>{item.title}</span>
                </span>
              </CommandPalette.Item>
            {/each}
          </CommandPalette.Items>
        </CommandPalette.Group>
      {/each}
      <CommandPalette.Empty>No commands found</CommandPalette.Empty>
    </CommandPalette.List>
    <CommandPalette.Footer>
      <span class="flex items-center gap-2">
        <kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5 text-[10px]">↑↓</kbd>
        <span>Navigate</span>
      </span>
      <span class="flex items-center gap-2">
        <kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5 text-[10px]">↵</kbd>
        <span>Select</span>
      </span>
    </CommandPalette.Footer>
  </CommandPalette.Root>
</div>
