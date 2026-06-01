---
title: "Table"
description: "A table component for displaying tabular data with support for selection, row variants, and column sizing."
sourceFile: "components/table"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="TableBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Table, TableBody, TableCell, TableCheckCell, TableCheckHead, TableFooter, TableHead, TableHeader, TableResizeHandle, TableRow } from 'kumo-svelte';
```

### Granular

```typescript
import { Table, TableBody, TableCell, TableCheckCell, TableCheckHead, TableFooter, TableHead, TableHeader, TableResizeHandle, TableRow } from 'kumo-svelte/components/table';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { LayerCard, Table } from 'kumo-svelte';
</script>

<LayerCard class="p-0">
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.Head>Name</Table.Head>
        <Table.Head>Email</Table.Head>
        <Table.Head>Role</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>John Doe</Table.Cell>
        <Table.Cell>john@example.com</Table.Cell>
        <Table.Cell>Admin</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</LayerCard>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### With Checkboxes

Add row selection with `Table.CheckHead` and `Table.CheckCell`. Both accept
`onCheckedChange`, which matches the underlying `Checkbox` component's
signature.

The older `onValueChange` prop still works but is deprecated and will be
removed in a future major version. Migrate by renaming the prop:

```svelte
<!-- Before (deprecated) -->
<Table.CheckCell onValueChange={(checked) => toggleRow(id)} />

<!-- After -->
<Table.CheckCell onCheckedChange={(checked) => toggleRow(id)} />
```

<ComponentExample demo="TableWithCheckboxDemo" />

### Compact Header

Use `variant="compact"` on `Table.Header` for a more condensed header style.

<ComponentExample demo="TableWithCompactHeaderDemo" />

### Selected Row

Use `variant="selected"` on `Table.Row` to highlight selected rows.

<ComponentExample demo="TableSelectedRowDemo" />

### Fixed Layout with Column Sizes

For precise control over column widths, set `layout="fixed"` and use
`colgroup` with `col` elements.

<ComponentExample demo="TableFixedLayoutDemo" />

### Sticky Column

Pin a column to the left or right edge of the scroll container with
`sticky="left"` or `sticky="right"` on `Table.Head` and `Table.Cell`. The
component automatically adds an opaque background and gradient fade. Wrap the
table in an `overflow-x-auto` container.

<ComponentExample demo="TableStickyColumnDemo" />

### Compact Header with Sticky Column

Combining `variant="compact"` on `Table.Header` with `sticky` columns.

<ComponentExample demo="TableCompactStickyDemo" />

### Full Example

Complete table with checkboxes, badges, action buttons, and fixed column
widths.

<ComponentExample demo="TableFullDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Table

Root table component. Renders a semantic `<table>` element.

<PropsTable component="Table" />

### Table.Header

Table header section. Renders `<thead>`. Set `sticky` to pin the header row to the top of the scroll container.

### Table.Body

Table body section. Renders `<tbody>`.

### Table.Row

Table row. Supports `variant="selected"` for highlighting.

<PropsTable component="Table.Row" />

### Table.Head

Header cell. Renders `<th>`. Accepts `sticky="left"` or `sticky="right"` to pin the column.

### Table.Cell

Body cell. Renders `<td>`. Accepts `sticky="left"` or `sticky="right"` to pin the column.

### Table.CheckHead

Header cell with checkbox for "select all" functionality.

<PropsTable component="Table.CheckHead" />

### Table.CheckCell

Body cell with checkbox for row selection.

<PropsTable component="Table.CheckCell" />

### Table.ResizeHandle

Draggable handle for column resizing. Use with TanStack Table or custom resize
logic.

</ComponentSection>

<!-- TanStack Table Integration -->

<ComponentSection>

## TanStack Table Integration

For advanced features like sorting, filtering, and resizable columns, integrate with <a href="https://tanstack.com/table" class="text-kumo-link hover:underline" target="_blank" rel="noopener noreferrer">TanStack Table</a>. The Table component is designed to work with TanStack's headless API.

```svelte
<script lang="ts">
  import { Table } from 'kumo-svelte';
</script>

<Table layout="fixed">
  <colgroup>
    {#each table.getAllColumns() as column}
      <col style:width={`${column.getSize()}px`} />
    {/each}
  </colgroup>
  <Table.Header>
    {#each table.getHeaderGroups() as headerGroup}
      <Table.Row>
        {#each headerGroup.headers as header}
          <Table.Head>
            {flexRender(header.column.columnDef.header, header.getContext())}
            <Table.ResizeHandle
              onmousedown={header.getResizeHandler()}
              ontouchstart={header.getResizeHandler()}
            />
          </Table.Head>
        {/each}
      </Table.Row>
    {/each}
  </Table.Header>
  <Table.Body>
    {#each table.getRowModel().rows as row}
      <Table.Row>
        {#each row.getVisibleCells() as cell}
          <Table.Cell>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Table.Cell>
        {/each}
      </Table.Row>
    {/each}
  </Table.Body>
</Table>
```

</ComponentSection>

<!-- Accessibility -->

<ComponentSection>

## Accessibility

### Semantic HTML

Table uses semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>` elements for proper screen reader navigation.

### Checkbox Labels

Always provide `aria-label` for `Table.CheckHead` and `Table.CheckCell` to
describe their purpose.

### Keyboard Navigation

<kbd class="rounded bg-kumo-control px-1.5 py-0.5">Tab</kbd> moves focus
through interactive elements. Checkboxes respond to
<kbd class="rounded bg-kumo-control px-1.5 py-0.5">Space</kbd>.

</ComponentSection>
