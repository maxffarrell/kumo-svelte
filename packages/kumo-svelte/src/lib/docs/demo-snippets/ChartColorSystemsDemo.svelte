<script lang="ts">
  import { LayerCard, Table } from 'kumo-svelte';
  import { colorSystemRows } from './chart-color-demo-data';
</script>

<LayerCard>
  <LayerCard.Secondary class="!m-0 !p-0" />
  <Table class="!m-0 !p-0 [&_tbody]:text-sm [&_tbody]:font-medium [&_tbody]:text-kumo-default">
    <colgroup>
      <col class="w-[14%]" />
      <col class="w-[38%]" />
      <col class="w-[16%]" />
      <col class="w-[32%]" />
    </colgroup>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="!pl-6">System</Table.Cell>
        <Table.Cell>When to use</Table.Cell>
        <Table.Cell>User task</Table.Cell>
        <Table.Cell>Examples</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  <LayerCard.Primary class="!m-0 !p-0">
    <Table layout="fixed" class="!m-0 !p-0 w-full [&_td]:align-top [&_td]:text-kumo-default">
      <colgroup>
        <col class="w-[14%]" />
        <col class="w-[38%]" />
        <col class="w-[16%]" />
        <col class="w-[32%]" />
      </colgroup>
      <Table.Body>
        {#each colorSystemRows as { system, when, task, examples }}
          <Table.Row>
            <Table.Cell class="!pl-6">{system}</Table.Cell>
            <Table.Cell>{when}</Table.Cell>
            <Table.Cell>{task}</Table.Cell>
            <Table.Cell>{examples}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table>
  </LayerCard.Primary>
</LayerCard>
