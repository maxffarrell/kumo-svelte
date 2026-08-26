<script lang="ts">
  import { TableOfContents } from '$lib/components/table-of-contents';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="without-title" label="without title">
  <TableOfContents>
    <TableOfContents.List>
      <TableOfContents.Item href="#intro">Introduction</TableOfContents.Item>
      <TableOfContents.Item href="#setup">Setup</TableOfContents.Item>
      <TableOfContents.Item href="#usage">Usage</TableOfContents.Item>
    </TableOfContents.List>
  </TableOfContents>
</Scenario>

<Scenario id="with-title" label="with title">
  <TableOfContents>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      <TableOfContents.Item href="#intro">Introduction</TableOfContents.Item>
      <TableOfContents.Item href="#setup" active>Setup</TableOfContents.Item>
      <TableOfContents.Item href="#usage">Usage</TableOfContents.Item>
    </TableOfContents.List>
  </TableOfContents>
</Scenario>

<Scenario id="active-item" label="active item">
  <TableOfContents>
    <TableOfContents.List>
      <TableOfContents.Item href="#intro">Introduction</TableOfContents.Item>
      <TableOfContents.Item href="#setup" active>Setup</TableOfContents.Item>
      <TableOfContents.Item href="#usage">Usage</TableOfContents.Item>
    </TableOfContents.List>
  </TableOfContents>
</Scenario>

<Scenario id="grouped" label="grouped">
  <TableOfContents>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      <TableOfContents.Item href="#intro">Introduction</TableOfContents.Item>
      <TableOfContents.Group label="Getting Started">
        <TableOfContents.Item href="#install">Installation</TableOfContents.Item>
        <TableOfContents.Item href="#config">Configuration</TableOfContents.Item>
      </TableOfContents.Group>
      <TableOfContents.Group label="API" href="#api" active>
        <TableOfContents.Item href="#methods">Methods</TableOfContents.Item>
        <TableOfContents.Item href="#types">Types</TableOfContents.Item>
      </TableOfContents.Group>
    </TableOfContents.List>
  </TableOfContents>
</Scenario>

<Scenario id="group-label-only" label="group label only">
  <TableOfContents>
    <TableOfContents.List>
      <TableOfContents.Group label="Guides">
        <TableOfContents.Item href="#quickstart">Quick start</TableOfContents.Item>
        <TableOfContents.Item href="#advanced">Advanced</TableOfContents.Item>
      </TableOfContents.Group>
    </TableOfContents.List>
  </TableOfContents>
</Scenario>

<Scenario id="hover-inactive" label="hover inactive item" interact={[{ type: 'hover' }]}>
  <TableOfContents>
    <TableOfContents.List>
      <TableOfContents.Item href="#intro">Introduction</TableOfContents.Item>
      <TableOfContents.Item href="#setup">Setup</TableOfContents.Item>
    </TableOfContents.List>
  </TableOfContents>
</Scenario>
