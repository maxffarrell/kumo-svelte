<script lang="ts">
  import { TableOfContents } from 'kumo-svelte/components/table-of-contents';
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      <TableOfContents.Item active class="cursor-pointer">Overview</TableOfContents.Item>
      <TableOfContents.Group label="Examples" href="#examples-demo">
        <TableOfContents.Item class="cursor-pointer">Basic example</TableOfContents.Item>
        <TableOfContents.Item class="cursor-pointer">Advanced example</TableOfContents.Item>
      </TableOfContents.Group>
      <TableOfContents.Group label="Getting Started">
        <TableOfContents.Item class="cursor-pointer">Installation</TableOfContents.Item>
        <TableOfContents.Item class="cursor-pointer">Configuration</TableOfContents.Item>
      </TableOfContents.Group>
      <TableOfContents.Group label="API" href="#api-demo">
        <TableOfContents.Item class="cursor-pointer">Props</TableOfContents.Item>
        <TableOfContents.Item class="cursor-pointer">Events</TableOfContents.Item>
      </TableOfContents.Group>
    </TableOfContents.List>
  </TableOfContents>
</div>
