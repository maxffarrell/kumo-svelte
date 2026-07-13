<script lang="ts">
  import { Button } from '$lib/components/button';
  import { CommandPalette } from '$lib/components/command-palette';
  import ChartLine from 'phosphor-svelte/lib/ChartLine';
  import Folder from 'phosphor-svelte/lib/Folder';
  import Gear from 'phosphor-svelte/lib/Gear';
  import House from 'phosphor-svelte/lib/House';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import Users from 'phosphor-svelte/lib/Users';

  const sampleGroups = [
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
</script>

<div class="flex flex-col items-start gap-4">
  <Button onclick={() => (open = true)}>Open Palette (No Autocomplete)</Button>

  <CommandPalette.Root bind:open shouldFilter={false}>
    <CommandPalette.Input
      bind:value={search}
      placeholder="Search commands..."
      autocomplete="off"
      autocorrect="off"
      autocapitalize="none"
      spellcheck={false}
      data-1p-ignore="true"
      data-lpignore="true"
    />
    <CommandPalette.List>
      {#each filteredGroups as group (group.id)}
        <CommandPalette.Group value={group.label}>
          <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
          <CommandPalette.Items>
            {#each group.items as item (item.id)}
              {@const Icon = item.icon}
              <CommandPalette.Item value={item.title} onSelect={() => ((open = false), (search = ''))}>
                <span class="flex items-center gap-3">
                  <span class="text-kumo-subtle">
                    <Icon size={16} />
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
  </CommandPalette.Root>
</div>
