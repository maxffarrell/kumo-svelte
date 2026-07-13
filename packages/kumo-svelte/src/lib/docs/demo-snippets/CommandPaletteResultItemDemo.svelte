<script lang="ts">
  import { Button } from '$lib/components/button';
  import { CommandPalette } from '$lib/components/command-palette';
  import File from 'phosphor-svelte/lib/File';

  const searchResults = [
    { id: '1', title: 'Button', breadcrumbs: ['Components'] },
    { id: '2', title: 'Dialog', breadcrumbs: ['Components'] },
    { id: '3', title: 'Page Header', breadcrumbs: ['Blocks'] }
  ];

  let open = $state(false);
  let search = $state('');
  const filteredResults = $derived(
    searchResults.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
  );
</script>

<div>
  <Button onclick={() => (open = true)}>Open with ResultItem</Button>

  <CommandPalette.Root bind:open shouldFilter={false}>
    <CommandPalette.Input bind:value={search} placeholder="Search documentation..." />
    <CommandPalette.List>
      {#each filteredResults as item (item.id)}
        <CommandPalette.ResultItem
          value={item.title}
          title={item.title}
          breadcrumbs={item.breadcrumbs}
          onSelect={() => (open = false)}
        >
          {#snippet icon()}
            <File size={16} />
          {/snippet}
        </CommandPalette.ResultItem>
      {/each}
      <CommandPalette.Empty>No pages found</CommandPalette.Empty>
    </CommandPalette.List>
    <CommandPalette.Footer>
      <span class="flex items-center gap-2">
        <kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5 text-[10px]">↑↓</kbd>
        <span>Navigate</span>
      </span>
      <span class="flex items-center gap-2">
        <kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5 text-[10px]">⌘↵</kbd>
        <span>Open in new tab</span>
      </span>
    </CommandPalette.Footer>
  </CommandPalette.Root>
</div>
