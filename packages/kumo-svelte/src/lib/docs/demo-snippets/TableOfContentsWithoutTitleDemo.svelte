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
    <TableOfContents.List>
      {#each headings.slice(0, 3) as heading (heading)}
        <TableOfContents.Item active={heading === 'Introduction'} class="cursor-pointer">
          {heading}
        </TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents>
</div>
