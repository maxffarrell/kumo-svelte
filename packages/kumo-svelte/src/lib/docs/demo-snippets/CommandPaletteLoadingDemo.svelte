<script lang="ts">
  import { Button, CommandPalette } from '$lib';
  import { ChartLine, Folder, Gear, House, MagnifyingGlass, Users } from 'phosphor-svelte';

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
  let loading = $state(false);
  let search = $state('');
  let timer: ReturnType<typeof setTimeout> | undefined;

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

  function handleOpen() {
    open = true;
    loading = true;
    clearTimeout(timer);
    timer = setTimeout(() => (loading = false), 1500);
  }
</script>

<div>
  <Button onclick={handleOpen}>Open with Loading</Button>

  <CommandPalette.Root bind:open shouldFilter={false}>
    <CommandPalette.Input bind:value={search} placeholder="Search..." />
    <CommandPalette.List>
      {#if loading}
        <CommandPalette.Loading />
      {:else}
        {#each filteredGroups as group (group.id)}
          <CommandPalette.Group value={group.label}>
            <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
            <CommandPalette.Items>
              {#each group.items as item (item.id)}
                <CommandPalette.Item value={item.title} onSelect={() => (open = false)}>
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
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      {/if}
    </CommandPalette.List>
  </CommandPalette.Root>
</div>
