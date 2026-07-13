<script lang="ts">
  import { LayerCard } from 'kumo-svelte/components/layer-card';
  import { Table } from 'kumo-svelte/components/table';
  import { emailRows } from './table-demo-data';
</script>

<LayerCard class="p-0">
  <Table>
    <Table.Header variant="compact">
      <Table.Row>
        <Table.Head>Subject</Table.Head>
        <Table.Head>From</Table.Head>
        <Table.Head>Date</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each emailRows.slice(0, 3) as row (row.id)}
        <Table.Row>
          <Table.Cell>{row.subject}</Table.Cell>
          <Table.Cell>{row.from}</Table.Cell>
          <Table.Cell>{row.date}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table>
</LayerCard>
