---
title: "Autocomplete"
description: "A free-form text input with an optional filtered suggestion list. Unlike Combobox, the value is not constrained to the items list."
sourceFile: "components/autocomplete"
---

<script>
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="AutocompleteDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Autocomplete } from 'kumo-svelte';
```

### Granular

```typescript
import { Autocomplete } from 'kumo-svelte/components/autocomplete';
```

</ComponentSection>

<!-- When to use -->

<ComponentSection>

## When to use


Use `Autocomplete` when the input value can be free-form text and suggestions
  are optional hints. Use `Combobox` instead when the selected value must come
  from the predefined list.

</ComponentSection>

<!-- Controlled -->

<ComponentSection>

## Controlled


Pass `value` and `onValueChange` for controlled usage.

<ComponentExample demo="AutocompleteControlledDemo" />
</ComponentSection>

<!-- With Field -->

<ComponentSection>

## With Field


Add `label`, `description`, and `required` to enable the built-in Field wrapper.

<ComponentExample demo="AutocompleteWithFieldDemo" />
</ComponentSection>

<!-- Error State -->

<ComponentSection>

## Error State


Display validation errors with the `error` prop.

<ComponentExample demo="AutocompleteErrorDemo" />
</ComponentSection>

<!-- Grouped -->

<ComponentSection>

## Grouped


Group items into categories using `Autocomplete.Group` and `Autocomplete.GroupLabel`.

<ComponentExample demo="AutocompleteGroupedDemo" />
</ComponentSection>

<!-- Sizes -->

<ComponentSection>

## Sizes


The `size` prop on `Autocomplete.InputGroup` supports four variants matching the
  Input component: `xs`, `sm`, `base` (default), and `lg`.

<ComponentExample demo="AutocompleteSizesDemo" />
</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## Filtering

Filtering is case- and accent-insensitive by default, powered by
`Intl.Collator` under the hood. For string items, no custom `filter` is needed.

When filtering on a property of object items, use `Autocomplete.useFilter()` to
preserve the built-in accent-insensitive matching:

```svelte
<script lang="ts">
  import { Autocomplete } from "kumo-svelte";

  const { contains } = Autocomplete.useFilter();

  const languages = [
    { value: "pt", label: "Portuguese", emoji: "🇵🇹" },
    { value: "es", label: "Spanish", emoji: "🇪🇸" }
  ];

  const filter = (item, query) => contains(item.label, query);
</script>

<Autocomplete items={languages} {filter}>
  <!-- ... -->
</Autocomplete>
```

To disable filtering entirely (for example, when results come from a server),
pass `filter={null}`:

```svelte
<Autocomplete items={results} filter={null}>
  <!-- ... -->
</Autocomplete>
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Autocomplete


Root component. Wraps all sub-components and manages state.

<PropsTable component="Autocomplete" />

### Autocomplete.InputGroup


Autocomplete text input with Input component styling.

<PropsTable component="Autocomplete.InputGroup" />

### Autocomplete.Content


Dropdown popup container.

<PropsTable component="Autocomplete.Content" />

### Autocomplete.List


Scrollable list container with render prop.

<PropsTable component="Autocomplete.List" />

### Autocomplete.Item


Individual suggestion item in the list.

<PropsTable component="Autocomplete.Item" />

### Autocomplete.Group


Groups items under a heading.

<PropsTable component="Autocomplete.Group" />

### Autocomplete.GroupLabel


Heading label for a group.

<PropsTable component="Autocomplete.GroupLabel" />

### Autocomplete.Collection


Item container within a group.

<PropsTable component="Autocomplete.Collection" />

### Autocomplete.Separator


Horizontal divider between items.

<PropsTable component="Autocomplete.Separator" />
</ComponentSection>
