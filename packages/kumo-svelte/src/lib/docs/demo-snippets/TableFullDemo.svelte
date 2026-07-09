<script lang="ts">
  import { Badge } from 'kumo-svelte/components/badge';
  import { Button } from 'kumo-svelte/components/button';
  import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';
  import { LayerCard } from 'kumo-svelte/components/layer-card';
  import { Table } from 'kumo-svelte/components/table';
  import DotsThree from 'phosphor-svelte/lib/DotsThree';
  import EnvelopeSimple from 'phosphor-svelte/lib/EnvelopeSimple';
  import Eye from 'phosphor-svelte/lib/Eye';
  import PencilSimple from 'phosphor-svelte/lib/PencilSimple';
  import Trash from 'phosphor-svelte/lib/Trash';
  import { emailRows } from './table-demo-data';

  let selectedIds = $state<Set<string>>(new Set(['2']));

  function toggleRow(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    selectedIds = next;
  }

  function toggleAll() {
    selectedIds = selectedIds.size === emailRows.length ? new Set() : new Set(emailRows.map((row) => row.id));
  }
</script>

<LayerCard class="w-full overflow-x-auto p-0">
  <Table layout="fixed">
    <colgroup>
      <col />
      <col />
      <col style:width="150px" />
      <col style:width="120px" />
      <col style:width="50px" />
    </colgroup>
    <Table.Header>
      <Table.Row>
        <Table.CheckHead
          checked={selectedIds.size === emailRows.length}
          indeterminate={selectedIds.size > 0 && selectedIds.size < emailRows.length}
          onCheckedChange={toggleAll}
          aria-label="Select all rows"
        />
        <Table.Head>Subject</Table.Head>
        <Table.Head>From</Table.Head>
        <Table.Head>Date</Table.Head>
        <Table.Head></Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each emailRows as row (row.id)}
        <Table.Row variant={selectedIds.has(row.id) ? 'selected' : 'default'}>
          <Table.CheckCell
            checked={selectedIds.has(row.id)}
            onCheckedChange={() => toggleRow(row.id)}
            aria-label={`Select ${row.subject}`}
          />
          <Table.Cell>
            <div class="flex items-center gap-2">
              <EnvelopeSimple size={16} />
              <span class="truncate">{row.subject}</span>
              {#if row.tags}
                <div class="ml-2 inline-flex gap-1">
                  {#each row.tags as tag}
                    <Badge>{tag}</Badge>
                  {/each}
                </div>
              {/if}
            </div>
          </Table.Cell>
          <Table.Cell>
            <span class="truncate">{row.from}</span>
          </Table.Cell>
          <Table.Cell>
            <span class="truncate">{row.date}</span>
          </Table.Cell>
          <Table.Cell class="text-right">
            <DropdownMenu>
              <DropdownMenu.Trigger>
                <Button variant="ghost" size="sm" shape="square" aria-label="More options">
                  <DotsThree weight="bold" size={16} />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item icon={Eye}>View</DropdownMenu.Item>
                <DropdownMenu.Item icon={PencilSimple}>Edit</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item icon={Trash} variant="danger">Delete</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table>
</LayerCard>
