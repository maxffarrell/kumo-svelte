---
title: "Select"
description: "Displays a list of options for the user to pick from—triggered by a button."
sourceFile: "components/select"
baseUIComponent: "select"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="SelectBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Select } from 'kumo-svelte';
```

### Granular

```typescript
import { Select } from 'kumo-svelte/components/select';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Select } from 'kumo-svelte';

  let value = $state('apple');
</script>

<Select
  label="Favorite Fruit"
  bind:value
  items={{ apple: 'Apple', banana: 'Banana', cherry: 'Cherry' }}
/>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic


A select with a visible label. When you provide the <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">label</code> prop, the select automatically renders inside a Field wrapper with the label displayed above it.


  <ComponentExample demo="SelectBasicDemo" />
</ComponentSection>

<!-- Sizes -->

<ComponentSection>

### Sizes


Use the <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">size</code> prop
    to match Input sizing (xs, sm, base, lg).


  <ComponentExample demo="SelectSizesDemo" />
</ComponentSection>

<!-- Without Visible Label -->

<ComponentSection>

### Without Visible Label


When a visible label isn't needed (e.g., in compact UIs or when context is clear),
    use `aria-label` for accessibility.


  <ComponentExample demo="SelectWithoutLabelDemo" />
</ComponentSection>

<!-- With Description and Error -->

<ComponentSection>

### With Description and Error


Select integrates with the Field wrapper to show description text and validation errors.


  <ComponentExample demo="SelectWithFieldDemo" />
</ComponentSection>

<!-- Placeholder -->

<ComponentSection>

### Placeholder


Use the <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">placeholder</code> prop
    to show text when no value is selected. When using <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">renderValue</code> to
    customize the display of selected values, the placeholder is shown instead of
    calling <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">renderValue</code> when the value is <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">null</code>.


```svelte
<script lang="ts">
  import { Select } from 'kumo-svelte';

  type User = { id: string; name: string };
  const users: User[] = [
    { id: 'visal', name: 'Visal' },
    { id: 'alice', name: 'Alice' }
  ];
  let user = $state('');
</script>

<Select
  placeholder="Select a user..."
  bind:value={user}
  items={Object.fromEntries(users.map((user) => [user.id, user.name]))}
/>
```

  <ComponentExample demo="SelectPlaceholderDemo" />
</ComponentSection>

<!-- Label Tooltip -->

<ComponentSection>

### Label with Tooltip


Add a tooltip icon next to the label for additional context using <code
      class="rounded bg-kumo-control px-1 py-0.5 text-sm">labelTooltip</code>.


  <ComponentExample demo="SelectWithTooltipDemo" />
</ComponentSection>

<!-- Custom Rendering -->

<ComponentSection>

### Custom Rendering


Use <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">renderValue</code> to customize how the selected value
    appears in the trigger button. This is useful when working with complex object
    data structures instead of simple string values.


<ComponentExample demo="SelectCustomRenderingDemo" />


The <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">renderValue</code> function is only called when a value is selected. Use <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">placeholder</code> to define what to show when no value is selected.


```svelte
<script lang="ts">
  import { Select } from 'kumo-svelte';

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' },
    { value: 'de', label: 'German', emoji: 'DE' }
  ];

  let value = $state('en');
</script>

<Select
  class="w-[200px]"
  placeholder="Select a language..."
  bind:value
  items={languages.map((language) => ({
    value: language.value,
    label: `${language.emoji} ${language.label}`
  }))}
/>
```

</ComponentSection>

<!-- Loading -->

<ComponentSection>

### Loading


A select component with loading state. The loading state is passed to
    the component via the <code
      class="rounded bg-kumo-control px-1 py-0.5 text-sm">loading</code> prop.


  <ComponentExample demo="SelectLoadingDemo" />
</ComponentSection>

<!-- Multiple Item -->

<ComponentSection>

### Multiple Selection


Enable multiple selection with the <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">multiple</code> prop.
    The value becomes an array of selected items. Use <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">placeholder</code> for the empty state
    and <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">renderValue</code> to customize how selections are displayed.


```svelte
<script lang="ts">
  import { Select } from 'kumo-svelte';

  let selectedColumns = $state(['name', 'email']);
</script>

<Select
  multiple
  placeholder="Select columns..."
  bind:value={selectedColumns}
  renderValue={(columns) => columns.join(", ")}
  items={{ name: "Name", email: "Email" }}
/>
```

  <ComponentExample demo="SelectMultipleDemo" />
</ComponentSection>

<!-- More Example -->

<ComponentSection>

### More Example

  <ComponentExample demo="SelectComplexDemo" />
</ComponentSection>

<!-- Disabled Options -->

<ComponentSection>

### Disabled Options


Options can be disabled with the <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">disabled</code> prop.
    Disabled options are greyed out and cannot be selected.


  <ComponentExample demo="SelectDisabledOptionsDemo" />
</ComponentSection>

<!-- Disabled Items via Prop -->

<ComponentSection>

### Disabled Items (via items prop)


The <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">items</code> object-map prop
    accepts descriptor objects with <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">disabled</code> alongside
    plain string values.


  <ComponentExample demo="SelectDisabledItemsDemo" />
</ComponentSection>

<!-- Grouped Options -->

<ComponentSection>

### Grouped Options


Use <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">Select.Group</code>,{" "}
    <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">Select.GroupLabel</code>, and{" "}
    <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">Select.Separator</code> to
    organize options under labeled headers with visual dividers.


  <ComponentExample demo="SelectGroupedDemo" />
</ComponentSection>

<!-- Groups with Disabled -->

<ComponentSection>

### Groups with Disabled Options


Combine groups, separators, and disabled options with info tooltips to
    clearly separate available and unavailable choices.


  <ComponentExample demo="SelectGroupedWithDisabledDemo" />
</ComponentSection>

<!-- Long List - Test scrolling behavior -->

<ComponentSection>

### Long List (Scrolling Test)


A select component with many options to test popup scrolling behavior.
    The popup should scroll smoothly without bounce/overscroll issues.


  <ComponentExample demo="SelectLongListDemo" />
</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Select

  <PropsTable component="Select" />

### Select.Option

<PropsTable component="Select.Option" />

### Select.Group


Groups related options together with an accessible{" "}
  <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">role="group"</code>.
  Use with{" "}
  <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">
    Select.GroupLabel
  </code>{" "}
  to provide a visible heading.


### Select.GroupLabel


A visible heading for a{" "}
  <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">Select.Group</code>.
  Automatically associated with its parent group for accessibility.


### Select.Separator


A visual divider line between option groups. Renders with <code class="rounded bg-kumo-control px-1 py-0.5 text-sm">role="separator"</code>.

</ComponentSection>
