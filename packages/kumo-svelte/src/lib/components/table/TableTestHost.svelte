<script lang="ts">
  import { Table } from '$lib/components/table';

  interface Props {
    variant?: 'default' | 'compact' | 'selected' | 'sticky' | 'fixed';
    onCheckedChange?: (checked: boolean) => void;
  }

  let { variant = 'default', onCheckedChange }: Props = $props();
</script>

{#if variant === 'fixed'}
  <Table layout="fixed" data-testid="table-root">
    <Table.Header>
      <Table.Row>
        <Table.Head>Name</Table.Head>
        <Table.Head>Status</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Worker A</Table.Cell>
        <Table.Cell>Active</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
{:else if variant === 'sticky'}
  <Table data-testid="table-root">
    <Table.Header>
      <Table.Row>
        <Table.Head sticky="left" data-testid="sticky-head">Name</Table.Head>
        <Table.Head>Status</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell sticky="left" data-testid="sticky-cell">Worker A</Table.Cell>
        <Table.Cell>Active</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
{:else if variant === 'selected'}
  <Table data-testid="table-root">
    <Table.Header>
      <Table.Row>
        <Table.Head>Name</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row variant="selected" data-testid="selected-row">
        <Table.Cell>Selected</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
{:else if variant === 'compact'}
  <Table data-testid="table-root">
    <Table.Header variant="compact" data-testid="compact-header">
      <Table.Row>
        <Table.Head>Name</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Worker A</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
{:else}
  <Table data-testid="table-root">
    <Table.Header>
      <Table.Row>
        <Table.CheckHead data-testid="check-head" />
        <Table.Head>Name</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.CheckCell data-testid="check-cell" {onCheckedChange} />
        <Table.Cell>Worker A</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
{/if}
