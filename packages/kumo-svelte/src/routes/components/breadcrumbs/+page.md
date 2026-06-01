---
title: "Breadcrumbs"
description: "A navigation component that shows the current page's location within a navigational hierarchy."
sourceFile: "components/breadcrumbs"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection>
  <ComponentExample demo="BreadcrumbsWithIconsDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Breadcrumbs } from 'kumo-svelte';
```

### Granular

```typescript
import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
```

</ComponentSection>

<ComponentSection>

## Usage

  <ComponentExample demo="BreadcrumbsDemo" />
</ComponentSection>

<ComponentSection>

## Examples

### Basic

  <ComponentExample demo="BreadcrumbsDemo" />
</ComponentSection>

<ComponentSection>

### Loading

  <ComponentExample demo="BreadcrumbsLoadingDemo" />
</ComponentSection>

<ComponentSection>

### Root

  <ComponentExample demo="BreadcrumbsRootDemo" />
</ComponentSection>

<ComponentSection>

### Clipboard

  <ComponentExample demo="BreadcrumbsWithClipboardDemo" />
</ComponentSection>

<ComponentSection>

## API Reference

### Breadcrumbs

<PropsTable component="Breadcrumbs" />

### Breadcrumbs.Link

<PropsTable component="Breadcrumbs.Link" />

### Breadcrumbs.Current

<PropsTable component="Breadcrumbs.Current" />

### Breadcrumbs.Separator

<PropsTable component="Breadcrumbs.Separator" />

### Breadcrumbs.Clipboard

  <PropsTable component="Breadcrumbs.Clipboard" />
</ComponentSection>
