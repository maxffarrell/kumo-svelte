---
title: "Tabs"
description: "A set of layered sections of content, known as tab panels, displayed one at a time."
sourceFile: "components/tabs"
bitsUIComponent: "tabs"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="TabsDefaultDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Tabs } from 'kumo-svelte';
```

### Granular

```typescript
import { Tabs } from 'kumo-svelte/components/tabs';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
import { Tabs } from "kumo-svelte";
</script>

<Tabs
  tabs={[
    { value: "overview", label: "Overview" },
    { value: "settings", label: "Settings" },
  ]}
  selectedValue="overview"
/>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Variants

#### Segmented (Default)

A pill-shaped indicator slides between tabs on a subtle background.

<ComponentExample demo="TabsSegmentedDemo" />

#### Underline

A bottom border with a primary-colored indicator. The active tab has bolder
text for emphasis.

<ComponentExample demo="TabsUnderlineDemo" />

### Small Size

Use `size="sm"` for a compact tab bar that matches `Input size="sm"` height (h-6.5 / 26px).
Useful inside toolbars and filter rows.

<ComponentExample demo="TabsSmDemo" />

### Controlled

Use the `value` and `onValueChange` props for controlled state.

<ComponentExample demo="TabsControlledDemo" />

### Many Tabs

Tabs automatically scroll horizontally when there are many items.

<ComponentExample demo="TabsManyDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="Tabs" />

### TabsItem

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Property</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Required</th>
      </tr>
    </thead>
    <tbody class="text-kumo-subtle">
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">value</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">Yes</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">label</td>
        <td class="px-4 py-3 font-mono text-xs">string | Snippet</td>
        <td class="px-4 py-3 font-mono text-xs">Yes</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">disabled</td>
        <td class="px-4 py-3 font-mono text-xs">boolean</td>
        <td class="px-4 py-3 font-mono text-xs">No</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">class</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">No</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">className</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">No</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">content</td>
        <td class="px-4 py-3 font-mono text-xs">Snippet</td>
        <td class="px-4 py-3 font-mono text-xs">No</td>
      </tr>
    </tbody>
  </table>
</div>

</ComponentSection>
