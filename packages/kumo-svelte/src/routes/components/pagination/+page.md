---
title: "Pagination"
description: "A page navigation component for navigating through paginated content."
sourceFile: "components/pagination"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="PaginationBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Pagination, PaginationControls, PaginationInfo, PaginationPageSize, PaginationSeparator } from 'kumo-svelte';
```

### Granular

```typescript
import { Pagination, PaginationControls, PaginationInfo, PaginationPageSize, PaginationSeparator } from 'kumo-svelte/components/pagination';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Pagination } from 'kumo-svelte';
  let page = $state(1);
</script>

<Pagination bind:page perPage={10} totalCount={100} />
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Full Controls (Default)


The default pagination includes first, previous, page input, next, and last
  buttons.

<ComponentExample demo="PaginationFullDemo" />

### Simple Controls


Use `controls="simple"` for a minimal pagination with only previous and next
  buttons.

<ComponentExample demo="PaginationSimpleDemo" />

### Mid-Page State


Pagination in the middle of a dataset with all navigation enabled.

<ComponentExample demo="PaginationMidPageDemo" />

### Large Dataset


Pagination handles large datasets with many pages.

<ComponentExample demo="PaginationLargeDatasetDemo" />

### Custom Text


You can set custom pagination text.

<ComponentExample demo="PaginationCustomTextDemo" />

</ComponentSection>

<!-- Compound Components -->

<ComponentSection>

## Compound Components

  
For more control over layout and features, use the compound component API. This allows you to compose `Pagination.Info`, `Pagination.PageSize`, `Pagination.Controls`, and `Pagination.Separator` in any order.

Import the compound pieces from the package barrel:

```svelte
<script lang="ts">
  import { Pagination } from 'kumo-svelte';

  let page = $state(1);
  let perPage = $state(25);
</script>

<Pagination bind:page {perPage} totalCount={500}>
  <Pagination.Info />
  <Pagination.Separator />
  <Pagination.PageSize bind:value={perPage} onChange={(size) => {
    perPage = size;
    page = 1;
  }} />
  <Pagination.Controls />
</Pagination>
```


### Page Size Selector


Add a dropdown to let users select the number of items per page.

<ComponentExample demo="PaginationPageSizeSelectorDemo" />

### Custom Page Size Options


Customize the available page size options with the `options` prop. Defaults to
  `[25, 50, 100, 250]`.

<ComponentExample demo="PaginationCustomPageSizeOptionsDemo" />

### Custom Info Text


Use a render function to customize the info text.

<ComponentExample demo="PaginationCompoundCustomInfoDemo" />

### Custom Layout


Arrange components in any order. Here the page size selector is on the right.

<ComponentExample demo="PaginationPageSizeRightDemo" />

### Dropdown Page Selector

    
Use `pageSelector="dropdown"` on `Pagination.Controls` to render a dropdown
      select instead of a text input for page navigation. This is useful when you
      want users to pick from a list of available pages rather than typing a number.

<ComponentExample demo="PaginationDropdownSelectorDemo" />
</ComponentSection>

<!-- Internationalization -->

<ComponentSection>

## Internationalization

  
Use the `labels` prop to customize all UI strings for different locales. All labels default to English.


<ComponentExample demo="PaginationI18nDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="Pagination" />
</ComponentSection>
