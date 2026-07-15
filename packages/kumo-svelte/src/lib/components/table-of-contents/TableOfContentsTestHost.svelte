<script lang="ts">
  import { TableOfContents } from '$lib/components/table-of-contents';

  interface Props {
    active?: boolean;
    grouped?: boolean;
    groupHref?: boolean;
    withTitle?: boolean;
  }

  let { active = false, grouped = false, groupHref = false, withTitle = false }: Props = $props();
</script>

<TableOfContents data-testid="toc-root">
  {#if withTitle}
    <TableOfContents.Title>On this page</TableOfContents.Title>
  {/if}
  <TableOfContents.List data-testid="toc-list">
    {#if grouped}
      <TableOfContents.Group
        label="Getting Started"
        href={groupHref ? '#guides' : undefined}
        {active}
        data-testid="toc-group"
      >
        <TableOfContents.Item href="#install">Installation</TableOfContents.Item>
      </TableOfContents.Group>
    {:else}
      <TableOfContents.Item href="#intro" {active} data-testid="toc-item">
        Introduction
      </TableOfContents.Item>
    {/if}
  </TableOfContents.List>
</TableOfContents>
