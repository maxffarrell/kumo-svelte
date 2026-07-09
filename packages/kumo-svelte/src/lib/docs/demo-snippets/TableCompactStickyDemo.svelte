<script lang="ts">
  import { Badge } from 'kumo-svelte/components/badge';
  import { Button } from 'kumo-svelte/components/button';
  import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';
  import { LayerCard } from 'kumo-svelte/components/layer-card';
  import { Table } from 'kumo-svelte/components/table';
  import DotsThree from 'phosphor-svelte/lib/DotsThree';
  import Eye from 'phosphor-svelte/lib/Eye';
  import PencilSimple from 'phosphor-svelte/lib/PencilSimple';
  import Trash from 'phosphor-svelte/lib/Trash';
  import { emailRows } from './table-demo-data';
</script>

<LayerCard class="w-full max-w-md overflow-x-auto p-0">
  <Table>
    <Table.Header variant="compact">
      <Table.Row>
        <Table.Head>Subject</Table.Head>
        <Table.Head>From</Table.Head>
        <Table.Head>Date</Table.Head>
        <Table.Head>Tags</Table.Head>
        <Table.Head sticky="right">
          <span class="sr-only">Actions</span>
        </Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each emailRows as row (row.id)}
        <Table.Row>
          <Table.Cell class="whitespace-nowrap">{row.subject}</Table.Cell>
          <Table.Cell class="whitespace-nowrap">{row.from}</Table.Cell>
          <Table.Cell class="whitespace-nowrap">{row.date}</Table.Cell>
          <Table.Cell class="whitespace-nowrap">
            {#if row.tags}
              <div class="inline-flex gap-1">
                {#each row.tags as tag}
                  <Badge>{tag}</Badge>
                {/each}
              </div>
            {:else}
              &mdash;
            {/if}
          </Table.Cell>
          <Table.Cell sticky="right" class="text-right">
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
