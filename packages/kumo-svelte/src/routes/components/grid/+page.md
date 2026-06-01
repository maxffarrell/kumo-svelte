---
title: "Grid"
description: "A responsive grid layout component for organizing content into columns."
sourceFile: "components/grid"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="GridDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Grid, GridItem } from 'kumo-svelte';
```

### Granular

```typescript
import { Grid, GridItem } from 'kumo-svelte/components/grid';
```

</ComponentSection>

<!-- Grid Variants -->

<ComponentSection>

## Grid Variants


The Grid component supports multiple column layouts that adapt responsively
    across breakpoints.

  <ComponentExample demo="GridVariantsDemo" />
</ComponentSection>

<!-- Asymmetric Layouts -->

<ComponentSection>

## Asymmetric Layouts


Use asymmetric variants for sidebar/main content layouts.

  <ComponentExample demo="GridAsymmetricDemo" />
</ComponentSection>

<!-- Gap Sizes -->

<ComponentSection>

## Gap Sizes


Control the spacing between grid items with the gap prop.

  <ComponentExample demo="GridGapDemo" />
</ComponentSection>

<!-- Mobile Dividers -->

<ComponentSection>

## Mobile Dividers


Add dividers between items on mobile with the mobileDivider prop (only works
    with the 4up variant).

  <ComponentExample demo="GridMobileDividerDemo" />
</ComponentSection>

<!-- All Variants -->

<ComponentSection>

## All Variants


Reference for all available grid variants:

  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-kumo-hairline">
          <th class="py-3 pr-4 font-medium">Variant</th>
          <th class="py-3 pr-4 font-medium">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4">`2up`</td>
          <td class="py-3 pr-4">1 column mobile, 2 columns medium+</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4">`side-by-side`</td>
          <td class="py-3 pr-4">Always 2 columns</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4">`2-1`</td>
          <td class="py-3 pr-4">66%/33% split on medium+</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4">`1-2`</td>
          <td class="py-3 pr-4">33%/66% split on medium+</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4">`1-3up`</td>
          <td class="py-3 pr-4">1 column mobile, 3 columns large+</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4">`3up`</td>
          <td class="py-3 pr-4">1 mobile, 2 medium, 3 large</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4">`4up`</td>
          <td class="py-3 pr-4">Progressive: 1 → 2 → 3 → 4 columns</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4">`6up`</td>
          <td class="py-3 pr-4">2 mobile, up to 6 on XL</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4">`1-2-4up`</td>
          <td class="py-3 pr-4">1 mobile, 2 medium, 4 large</td>
        </tr>
      </tbody>
    </table>
  </div>
</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Grid

  <PropsTable component="Grid" />

### Grid.Item


`Grid.Item` is a wrapper component for grid children. It accepts standard div
  props including `class` and `children`.


</ComponentSection>
