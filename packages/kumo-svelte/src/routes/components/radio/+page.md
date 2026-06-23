---
title: "Radio"
description: "A control that allows the user to select one option from a set. Always used within a Radio.Group."
sourceFile: "components/radio"
baseUIComponent: "radio-group"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="RadioBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Radio, RadioGroup, RadioItem, RadioLegend } from 'kumo-svelte';
```

### Granular

```typescript
import { Radio, RadioGroup, RadioItem, RadioLegend } from 'kumo-svelte/components/radio';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
import { Radio } from "kumo-svelte";
</script>

<Radio.Group legend="Choose an option" defaultValue="a">
  <Radio.Item label="Option A" value="a" />
  <Radio.Item label="Option B" value="b" />
</Radio.Group>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Default (Vertical)


Radio groups display vertically by default. Each radio has a label displayed
  to its right.

<ComponentExample demo="RadioDefaultDemo" />

### Horizontal


Use `orientation="horizontal"` for inline layouts. Items wrap when there isn't
  enough space.

<ComponentExample demo="RadioHorizontalDemo" />

### With Description


Add helper text below the radio items using the `description` prop.

<ComponentExample demo="RadioDescriptionDemo" />

### Control Position


Use `controlPosition="end"` to place labels before radio buttons.

<ComponentExample demo="RadioControlPositionDemo" />

### Radio Card


Use `appearance="card"` on the group to display each option as a selectable
  card. Combine with the `description` prop on each item for richer content.

<ComponentExample demo="RadioCardDemo" />

### Radio Card (Control on the Left)


Use `controlPosition="start"` on a card radio group to place the radio control
  on the left of the label and description.

<ComponentExample demo="RadioCardControlStartDemo" />

### Rich Label Content


The `label` prop on `Radio.Item` accepts Svelte snippets, so you can embed icons,
  badges, or other markup alongside the text.

<ComponentExample demo="RadioRichLabelDemo" />

### Radio Card (Horizontal)


Combine `appearance="card"` with `orientation="horizontal"` for a side-by-side
  card layout.

<ComponentExample demo="RadioCardHorizontalDemo" />

### With Error


Show validation errors at the group level using the `error` prop.

<ComponentExample demo="RadioErrorDemo" />

### Disabled


Disable the entire group or individual items.

<ComponentExample demo="RadioDisabledDemo" />

### Visually Hidden Legend


Use `Radio.Legend` with `class="sr-only"` to keep the legend accessible to
  screen readers while hiding it visually. This is useful when the radio group
  is already labeled by a parent `Field` or heading, and showing the legend
  would create a redundant label.

<ComponentExample demo="RadioLegendSrOnlyDemo" />

### Custom Legend Styling


`Radio.Legend` accepts `class` for full control over legend presentation.
  Use it instead of the `legend` string prop when you need custom typography,
  colors, or layout.

<ComponentExample demo="RadioLegendCustomDemo" />

### Typed Values

Use generic values when radio options are numbers, enums, or other non-string
  values.

<ComponentExample demo="RadioTypedValueDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Radio.Group


Container for radio buttons with legend, description, and error support.

<PropsTable component="Radio.Group" />

### Radio.Legend


Composable legend sub-component for Radio.Group. Accepts `class` for full
  styling control (e.g. `class="sr-only"` to visually hide). Use instead of
  the `legend` string prop when you need custom legend styling.

<PropsTable component="Radio.Legend" />

### Radio.Item


Individual radio button within Radio.Group.

<PropsTable component="Radio.Item" />

</ComponentSection>

<!-- Accessibility -->

<ComponentSection>

<h2>Accessibility</h2>

<h3>Semantic HTML</h3>

<p>Radio.Group uses semantic <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> elements for proper grouping and screen reader announcement.</p>

<h3>Keyboard Navigation</h3>

<p><kbd class="rounded bg-kumo-control px-1.5 py-0.5">Arrow Up/Down</kbd> or <kbd class="rounded bg-kumo-control px-1.5 py-0.5">Arrow Left/Right</kbd> moves between options. <kbd class="rounded bg-kumo-control px-1.5 py-0.5">Space</kbd> selects the focused option. <kbd class="rounded bg-kumo-control px-1.5 py-0.5">Tab</kbd> moves focus to and from the radio group.</p>

<h3>Screen Readers</h3>

<p>Each radio is announced with its label and selection state. The group legend provides context for all options.</p>
</ComponentSection>
