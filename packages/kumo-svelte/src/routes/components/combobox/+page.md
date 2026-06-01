---
title: "Combobox"
description: "A searchable select component that allows users to filter and select from a list of options."
sourceFile: "components/combobox"
baseUIComponent: "combobox"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="ComboboxDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Combobox } from 'kumo-svelte';
```

### Granular

```typescript
import { Combobox } from 'kumo-svelte/components/combobox';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  let value = $state<string | null>(null);
</script>

<Combobox bind:value items={fruits}>
  <Combobox.TriggerInput placeholder="Select a fruit" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(item)}
        <Combobox.Item value={item}>{item}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Sizes


The Combobox supports four size variants that match the Input component: `xs`,
  `sm`, `base` (default), and `lg`.

<ComponentExample demo="ComboboxSizesDemo" />


Size also applies to `TriggerValue` (searchable inside variant):

  <ComponentExample demo="ComboboxSizesSearchableInsideDemo" />
</ComponentSection>

<ComponentSection>

### Searchable Item (Inside)


A searchable select component inside popup that allows users to filter and
    select.

  <ComponentExample demo="ComboboxSearchableInsideDemo" />
</ComponentSection>

<ComponentSection>

### Searchable Select with Placeholder


Use `TriggerValue` with a `placeholder` prop to create a searchable Select-style field.
    The placeholder is displayed until a value is selected.

  <ComponentExample demo="ComboboxSearchableSelectDemo" />
</ComponentSection>

<ComponentSection>

### Custom Trigger


Use <code>Combobox.Trigger</code> with a <code>render</code> prop to replace the default input-like trigger with your own element. Pair with <code>Combobox.Value</code> to display the selected value. Useful for account switchers, sidebar navigation, or anywhere the default chrome doesn't fit.

<ComponentExample demo="ComboboxCustomTriggerDemo" />

</ComponentSection>

<ComponentSection>

### Grouped


Group items into categories using the Group and GroupLabel components.

  <ComponentExample demo="ComboboxGroupedDemo" />
</ComponentSection>

<ComponentSection>

### Multiple


Allow users to select multiple options from the list.

  <ComponentExample demo="ComboboxMultipleDemo" />
</ComponentSection>

<ComponentSection>

### With Field


Add label and description using the built-in Field wrapper.

  <ComponentExample demo="ComboboxWithFieldDemo" />
</ComponentSection>

<ComponentSection>

### Disabled


Pass the `disabled` prop to prevent interaction. Works with both `TriggerInput` and `TriggerValue`.

  <ComponentExample demo="ComboboxDisabledDemo" />
</ComponentSection>

<ComponentSection>

### Disabled Items


Pass the `disabled` prop to an individual `Combobox.Item` to make it non-selectable. Disabled rows are rendered with a muted style and skipped during keyboard navigation selection.

  <ComponentExample demo="ComboboxDisabledItemsDemo" />
</ComponentSection>

<ComponentSection>

### Error State


Display validation errors with the error prop.

  <ComponentExample demo="ComboboxErrorDemo" />
</ComponentSection>

<ComponentSection>

## Filtering

Filtering is case- and accent-insensitive by default, powered by
`Intl.Collator` under the hood. For string items, no custom `filter` is needed.

When filtering on a property of object items, use `Combobox.useFilter()` to
preserve the built-in accent-insensitive matching:

```svelte
<script lang="ts">
  import { Combobox } from "kumo-svelte";

  const { contains } = Combobox.useFilter();

  const languages = [
    { value: "pt", label: "Portuguese", emoji: "🇵🇹" },
    { value: "es", label: "Spanish", emoji: "🇪🇸" }
  ];

  const filter = (item, query) => contains(item.label, query);
</script>

<Combobox items={languages} {filter}>
  <!-- ... -->
</Combobox>
```

To disable filtering entirely (for example, when results come from a server),
pass `filter={null}`:

```svelte
<Combobox items={results} filter={null}>
  <!-- ... -->
</Combobox>
```

</ComponentSection>

<ComponentSection>

## Customizing Dropdown Height


By default, <code class="text-surface">Combobox.Content</code> has a max height of <code class="text-surface">24rem</code> (384px) or the available viewport space, whichever is smaller. The dropdown scrolls automatically when content exceeds this height.


To customize the max height, pass a class to <code class="text-surface">Combobox.Content</code>:


```svelte
// Shorter dropdown (200px)
<Combobox.Content class="max-h-[200px]">

// Taller dropdown (500px)
<Combobox.Content class="max-h-[500px]">

// Use Tailwind presets
<Combobox.Content class="max-h-64">  // 256px
<Combobox.Content class="max-h-96">  // 384px (same as default)
```

</ComponentSection>

<ComponentSection>

## API Reference

### Combobox


Root component for the searchable select.

<PropsTable component="Combobox" />

### Combobox.Content


Dropdown container for the list.

<PropsTable component="Combobox.Content" />

### Combobox.Item


Individual selectable option.

<PropsTable component="Combobox.Item" />

### Additional Sub-components

  <ul class="list-disc list-inside space-y-1">
    <li>`Combobox.TriggerInput` - Single-select input trigger</li>
    <li>`Combobox.TriggerValue` - Button trigger showing selected value</li>
    <li>`Combobox.TriggerMultipleWithInput` - Multi-select with chips</li>
    <li>`Combobox.Input` - Search input inside dropdown</li>
    <li>`Combobox.List` - List container with render prop</li>
    <li>`Combobox.Group` - Group container for categorized items</li>
    <li>`Combobox.GroupLabel` - Header label for a group</li>
    <li>`Combobox.Collection` - Items container within a group</li>
    <li>`Combobox.Chip` - Selected item chip</li>
    <li>`Combobox.Empty` - Empty state message</li>
  </ul>
</ComponentSection>
