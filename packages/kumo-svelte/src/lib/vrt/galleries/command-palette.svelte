<script lang="ts">
  import { Button } from '$lib/components/button';
  import { CommandPalette } from '$lib/components/command-palette';
  import { Folder, Gear, House } from 'phosphor-svelte';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const groups = [
    {
      id: 'commands',
      label: 'Commands',
      items: [
        { id: 'new-project', title: 'Create New Project', icon: Folder },
        { id: 'settings', title: 'Open Settings', icon: Gear },
        { id: 'search', title: 'Search Files', icon: Folder }
      ]
    },
    {
      id: 'pages',
      label: 'Pages',
      items: [
        { id: 'home', title: 'Home', icon: House },
        { id: 'dashboard', title: 'Dashboard', icon: Folder },
        { id: 'users', title: 'Users', icon: Folder }
      ]
    }
  ];

  let openDefault = $state(false);
  let openFiltered = $state(false);
  let openEmpty = $state(false);
  let searchDefault = $state('');
  let searchFiltered = $state('');
  let searchEmpty = $state('zzzz-no-match');

  const filteredDefault = $derived.by(() => {
    if (!searchDefault) return groups;
    const query = searchDefault.toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.title.toLowerCase().includes(query))
      }))
      .filter((group) => group.items.length > 0);
  });

  const filteredFiltered = $derived.by(() => {
    const query = searchFiltered.toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.title.toLowerCase().includes(query))
      }))
      .filter((group) => group.items.length > 0);
  });
</script>

{#snippet groupList(filtered: typeof groups)}
  {#each filtered as group (group.id)}
    <CommandPalette.Group value={group.label}>
      <CommandPalette.GroupLabel>{group.label}</CommandPalette.GroupLabel>
      <CommandPalette.Items>
        {#each group.items as item (item.id)}
          {@const Icon = item.icon}
          <CommandPalette.Item value={item.title}>
            <span class="flex items-center gap-3">
              <span class="text-kumo-subtle"><Icon size={16} /></span>
              <span>{item.title}</span>
            </span>
          </CommandPalette.Item>
        {/each}
      </CommandPalette.Items>
    </CommandPalette.Group>
  {/each}
{/snippet}

<Scenario id="closed" label="closed trigger">
  <Button onclick={() => (openDefault = true)}>Open command palette</Button>
  <CommandPalette.Root bind:open={openDefault} shouldFilter={false}>
    <CommandPalette.Input bind:value={searchDefault} placeholder="Type a command or search..." />
    <CommandPalette.List>
      <CommandPalette.Results>
        {@render groupList(filteredDefault)}
      </CommandPalette.Results>
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
</Scenario>

<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  <Button onclick={() => (openDefault = true)}>Open command palette</Button>
  <CommandPalette.Root bind:open={openDefault} shouldFilter={false}>
    <CommandPalette.Input bind:value={searchDefault} placeholder="Type a command or search..." />
    <CommandPalette.List>
      <CommandPalette.Results>
        {@render groupList(filteredDefault)}
      </CommandPalette.Results>
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
</Scenario>

<Scenario
  id="open-filtered"
  label="open filtered"
  interact={[{ type: 'click' }, { type: 'press', key: 's' }]}
  capture="page"
>
  <Button onclick={() => (openFiltered = true)}>Open command palette</Button>
  <CommandPalette.Root bind:open={openFiltered} shouldFilter={false}>
    <CommandPalette.Input bind:value={searchFiltered} placeholder="Type a command or search..." />
    <CommandPalette.List>
      <CommandPalette.Results>
        {@render groupList(filteredFiltered)}
      </CommandPalette.Results>
      <CommandPalette.Empty>No commands found</CommandPalette.Empty>
    </CommandPalette.List>
    <CommandPalette.Footer>
      <span class="flex items-center gap-2">
        <kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5 text-[10px]">↑↓</kbd>
        <span>Navigate</span>
      </span>
    </CommandPalette.Footer>
  </CommandPalette.Root>
</Scenario>

<Scenario id="open-empty" label="open empty" interact={[{ type: 'click' }]} capture="page">
  <Button onclick={() => (openEmpty = true)}>Open command palette</Button>
  <CommandPalette.Root bind:open={openEmpty} shouldFilter={false}>
    <CommandPalette.Input bind:value={searchEmpty} placeholder="Type a command or search..." />
    <CommandPalette.List>
      <CommandPalette.Results />
      <CommandPalette.Empty>No results found</CommandPalette.Empty>
    </CommandPalette.List>
    <CommandPalette.Footer>
      <span>No matches</span>
    </CommandPalette.Footer>
  </CommandPalette.Root>
</Scenario>
