<script lang="ts">
  import { DotsThree } from 'phosphor-svelte';
  import { Button, Popover } from '$lib';

  const rows = [
    { id: '1', name: 'api-gateway', status: 'Active' },
    { id: '2', name: 'auth-service', status: 'Active' },
    { id: '3', name: 'worker-prod', status: 'Paused' }
  ];

  let selectedRow = $state<string | null>(null);
  let anchorRect = $state<DOMRect | null>(null);
  let open = $state(false);

  const selectedName = $derived(rows.find((row) => row.id === selectedRow)?.name);
  const anchor = $derived.by(() => {
    if (!anchorRect) return null;
    const rect = anchorRect;
    return { getBoundingClientRect: () => rect };
  });

  function handleEdit(id: string, event: MouseEvent) {
    const row = (event.currentTarget as HTMLElement).closest('tr');
    if (!row) return;

    anchorRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    selectedRow = id;
    open = true;
  }

  $effect(() => {
    if (!open) {
      selectedRow = null;
      anchorRect = null;
    }
  });
</script>

<div class="w-full">
  <div class="overflow-hidden rounded-lg border border-kumo-hairline">
    <table class="w-full text-sm">
      <thead class="bg-kumo-elevated">
        <tr>
          <th class="px-4 py-2 text-left font-medium">Name</th>
          <th class="px-4 py-2 text-left font-medium">Status</th>
          <th class="w-12 px-4 py-2"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-kumo-hairline">
        {#each rows as row (row.id)}
          <tr
            class={selectedRow === row.id ? 'bg-kumo-recessed' : 'bg-kumo-base'}
          >
            <td class="px-4 py-2 font-mono">{row.name}</td>
            <td class="px-4 py-2 text-kumo-subtle">{row.status}</td>
            <td class="px-4 py-2">
              <Button
                size="xs"
                variant="ghost"
                shape="square"
                icon={DotsThree}
                aria-label={`Actions for ${row.name}`}
                onclick={(event: MouseEvent) => handleEdit(row.id, event)}
              />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <Popover.Root bind:open>
    <Popover.Content side="left" {anchor}>
      <Popover.Title>Edit {selectedName}</Popover.Title>
      <Popover.Description>
        The popover anchors to the selected row, not the icon button.
      </Popover.Description>
      <div class="mt-3">
        <Popover.Close>
          {#snippet child({ props }: { props: Record<string, unknown> })}
            <Button size="sm" variant="secondary" {...props}>Close</Button>
          {/snippet}
        </Popover.Close>
      </div>
    </Popover.Content>
  </Popover.Root>
</div>
