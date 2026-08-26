<script lang="ts">
  import { Table } from '$lib/components/table';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="default" label="header and rows">
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.Head>Name</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Region</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Worker A</Table.Cell>
        <Table.Cell>Active</Table.Cell>
        <Table.Cell>us-east</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Worker B</Table.Cell>
        <Table.Cell>Idle</Table.Cell>
        <Table.Cell>eu-west</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</Scenario>

<Scenario id="compact-header" label="compact header">
  <Table>
    <Table.Header variant="compact">
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
</Scenario>

<Scenario id="selected-row" label="selected row">
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.Head>Name</Table.Head>
        <Table.Head>Status</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row variant="selected">
        <Table.Cell>Selected worker</Table.Cell>
        <Table.Cell>Active</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Other worker</Table.Cell>
        <Table.Cell>Idle</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</Scenario>

<Scenario id="fixed-layout" label="fixed layout">
  <Table layout="fixed" class="max-w-md">
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
</Scenario>

<Scenario id="sticky-column" label="sticky column">
  <div class="max-w-xs overflow-x-auto">
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head sticky="left">Name</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Region</Table.Head>
          <Table.Head>Created</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell sticky="left">Worker A</Table.Cell>
          <Table.Cell>Active</Table.Cell>
          <Table.Cell>us-east</Table.Cell>
          <Table.Cell>2024-01-01</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
</Scenario>

<Scenario id="with-checkboxes" label="with checkboxes">
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.CheckHead checked />
        <Table.Head>Name</Table.Head>
        <Table.Head>Status</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row variant="selected">
        <Table.CheckCell checked />
        <Table.Cell>Worker A</Table.Cell>
        <Table.Cell>Active</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.CheckCell />
        <Table.Cell>Worker B</Table.Cell>
        <Table.Cell>Idle</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</Scenario>

<Scenario id="resize-handle" label="resize handle">
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.Head class="group relative">
          Name
          <Table.ResizeHandle />
        </Table.Head>
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
</Scenario>

<Scenario id="hover-resize-handle" label="hover resize handle" interact={[{ type: 'hover', selector: 'th' }]}>
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.Head class="group relative">
          Name
          <Table.ResizeHandle />
        </Table.Head>
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
</Scenario>
