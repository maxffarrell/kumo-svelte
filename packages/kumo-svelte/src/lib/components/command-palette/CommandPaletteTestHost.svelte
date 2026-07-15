<script lang="ts">
  import { Button } from '$lib/components/button';
  import { CommandPalette } from './index';

  const groups = [
    {
      id: 'actions',
      label: 'Actions',
      items: [
        { id: 'create', title: 'Create Project' },
        { id: 'settings', title: 'Open Settings' },
        { id: 'search', title: 'Search Files' }
      ]
    },
    {
      id: 'pages',
      label: 'Pages',
      items: [
        { id: 'home', title: 'Home' },
        { id: 'dashboard', title: 'Dashboard' },
        { id: 'users', title: 'Users' }
      ]
    }
  ];

  let open = $state(false);
  let search = $state('');
  let selected = $state<string | null>(null);

  const filteredGroups = $derived.by(() => {
    if (!search) return groups;
    const query = search.toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.title.toLowerCase().includes(query))
      }))
      .filter((group) => group.items.length > 0);
  });

  function handleSelect(title: string) {
    selected = title;
    open = false;
    search = '';
  }
</script>

<Button onclick={() => (open = true)}>Open command palette</Button>
{#if selected}
  <p data-testid="selected">{selected}</p>
{/if}

<CommandPalette.Root bind:open shouldFilter={false}>
  <CommandPalette.Input bind:value={search} placeholder="Search commands..." />
  <CommandPalette.List>
    <CommandPalette.Results>
      {#each filteredGroups as group (group.id)}
        <CommandPalette.Group value={group.label}>
          <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
          <CommandPalette.Items>
            {#each group.items as item (item.id)}
              <CommandPalette.Item value={item.title} onSelect={() => handleSelect(item.title)}>
                {item.title}
              </CommandPalette.Item>
            {/each}
          </CommandPalette.Items>
        </CommandPalette.Group>
      {/each}
    </CommandPalette.Results>
    <CommandPalette.Empty>No commands found</CommandPalette.Empty>
  </CommandPalette.List>
  <CommandPalette.Footer>
    <span>Navigate with ↑↓</span>
    <span>Select with ↵</span>
  </CommandPalette.Footer>
</CommandPalette.Root>
