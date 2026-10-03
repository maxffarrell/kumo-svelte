---
title: "Page Header"
description: "A composite component that combines breadcrumbs and tabs for page navigation."
sourceFile: "blocks/page-header"
---

<script>
  import ComponentExample from '#lib/docs/ComponentExample.svelte';
  import ComponentSection from '#lib/docs/ComponentSection.svelte';
  import PropsTable from '#lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>

<ComponentExample demo="PageHeaderHeroDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

PageHeader is a <strong>block</strong> - a CLI-installed component that you own and can customize. Unlike regular components, blocks are copied into your project so you have full control over the code.

**1. Initialize Kumo config (first time only)**

```bash
npx kumo-svelte init
```

**2. Install the block**

```bash
npx kumo-svelte add PageHeader
```

**3. Import from your local path**

```svelte
<script lang="ts">
  import { PageHeader } from './components/kumo/page-header/page-header';
</script>
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte';
  import { PageHeader } from './components/kumo/page-header/page-header';

  let activeTab = $state('overview');
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Link href="#">Projects</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>My Project</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader
  breadcrumbContent={breadcrumbs}
  tabs={[
    { label: 'Overview', value: 'overview' },
    { label: 'Settings', value: 'settings' }
  ]}
  defaultTab="overview"
  bind:activeTab
  onValueChange={(value) => {
    console.log(value);
  }}
/>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic

<ComponentExample demo="PageHeaderBasicDemo" />

### With Icons

<ComponentExample demo="PageHeaderWithIconsDemo" />

### With Tabs

<ComponentExample demo="PageHeaderWithTabsDemo" />

### With Actions

<ComponentExample demo="PageHeaderWithActionsDemo" />

### With Title

<ComponentExample demo="PageHeaderWithTitleDemo" />

### With Title and Description

<ComponentExample demo="PageHeaderWithTitleDescriptionDemo" />

### Complete Example

Combining breadcrumbs, title, description, tabs, and actions.

<ComponentExample demo="PageHeaderCompleteDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<PropsTable component="PageHeader" />

### TabsItem

<table class="w-full text-sm">
  <thead>
    <tr class="border-b border-kumo-hairline">
      <th class="px-4 py-3 text-left font-semibold">Property</th>
      <th class="px-4 py-3 text-left font-semibold">Type</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-kumo-hairline">
      <td class="px-4 py-3 font-mono text-xs">label</td>
      <td class="px-4 py-3 font-mono text-xs">string</td>
    </tr>
    <tr class="border-b border-kumo-hairline">
      <td class="px-4 py-3 font-mono text-xs">value</td>
      <td class="px-4 py-3 font-mono text-xs">string</td>
    </tr>
  </tbody>
</table>

</ComponentSection>
