<script lang="ts">
  import { TableOfContents } from 'kumo-svelte/components/table-of-contents';

  const headings = [
    'Introduction',
    'Installation',
    'Usage',
    'API Reference',
    'Examples'
  ];
</script>

<div class="min-w-48">
  <TableOfContents>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      {#each headings as heading (heading)}
        <TableOfContents.Item class="cursor-pointer">{heading}</TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents>
</div>
