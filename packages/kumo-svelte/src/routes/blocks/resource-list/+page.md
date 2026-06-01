---
title: "Resource List"
description: "A layout component for resource list pages with optional sidebar content."
sourceFile: "blocks/resource-list"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>

<ComponentExample demo="ResourceListCompleteDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

ResourceListPage is a <strong>block</strong> - a CLI-installed component that you own and can customize. Unlike regular components, blocks are copied into your project so you have full control over the code.

**1. Initialize Kumo config (first time only)**

```bash
npx kumo-svelte init
```

**2. Install the block**

```bash
npx kumo-svelte add ResourceListPage
```

**3. Import from your local path**

```svelte
<script lang="ts">
  import { ResourceListPage } from './components/kumo/resource-list/resource-list';
</script>
```

> <strong>Why blocks?</strong> Blocks give you full ownership of the code,
> allowing you to customize layouts to fit your specific needs.
> They're ideal for page-level patterns that often need project-specific
> modifications.

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Surface } from 'kumo-svelte';
  import { ResourceListPage } from './components/kumo/resource-list/resource-list';
  import { Database } from 'phosphor-svelte';
</script>

<ResourceListPage
  title="Databases"
  description="Manage your database instances and configurations"
  icon={Database}
>
  <Surface class="p-6">{/* Your resource list content */}</Surface>
</ResourceListPage>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic

A minimal resource list page with title, description, and icon.

<ComponentExample demo="ResourceListBasicDemo" />

### With Usage Sidebar

Include a sidebar with usage examples or quick start guides.

<ComponentExample demo="ResourceListWithUsageDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<table class="w-full text-sm">
  <thead>
    <tr class="border-b border-kumo-hairline">
      <th class="px-4 py-3 text-left font-semibold">Property</th>
      <th class="px-4 py-3 text-left font-semibold">Type</th>
      <th class="px-4 py-3 text-left font-semibold">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-kumo-hairline">
      <td class="px-4 py-3 font-mono text-xs">title</td>
      <td class="px-4 py-3 font-mono text-xs">string</td>
      <td class="px-4 py-3">Page title displayed at the top of the resource list layout.</td>
    </tr>
    <tr class="border-b border-kumo-hairline">
      <td class="px-4 py-3 font-mono text-xs">description</td>
      <td class="px-4 py-3 font-mono text-xs">string</td>
      <td class="px-4 py-3">Page description displayed below the title.</td>
    </tr>
    <tr class="border-b border-kumo-hairline">
      <td class="px-4 py-3 font-mono text-xs">icon</td>
      <td class="px-4 py-3 font-mono text-xs">Component</td>
      <td class="px-4 py-3">Icon component displayed next to the title.</td>
    </tr>
    <tr class="border-b border-kumo-hairline">
      <td class="px-4 py-3 font-mono text-xs">usage</td>
      <td class="px-4 py-3 font-mono text-xs">Snippet</td>
      <td class="px-4 py-3">Sidebar content for usage examples or quick-start guidance.</td>
    </tr>
    <tr class="border-b border-kumo-hairline">
      <td class="px-4 py-3 font-mono text-xs">additionalContent</td>
      <td class="px-4 py-3 font-mono text-xs">Snippet</td>
      <td class="px-4 py-3">Additional sidebar content, such as resources or links.</td>
    </tr>
    <tr class="border-b border-kumo-hairline">
      <td class="px-4 py-3 font-mono text-xs">children<span class="ml-0.5 text-kumo-danger">*</span></td>
      <td class="px-4 py-3 font-mono text-xs">Snippet</td>
      <td class="px-4 py-3">Main content area for the resource list.</td>
    </tr>
    <tr class="border-b border-kumo-hairline">
      <td class="px-4 py-3 font-mono text-xs">class</td>
      <td class="px-4 py-3 font-mono text-xs">string</td>
      <td class="px-4 py-3">Additional classes merged onto the root element.</td>
    </tr>
  </tbody>
</table>

</ComponentSection>
