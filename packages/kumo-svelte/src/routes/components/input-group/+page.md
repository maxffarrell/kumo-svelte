---
title: "InputGroup"
description: "Compose inputs with addons, icons, buttons, and text for rich form fields."
sourceFile: "components/input-group"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection>
  <ComponentExample demo="InputGroupDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupSuffix } from 'kumo-svelte';
```

### Granular

```typescript
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupSuffix } from 'kumo-svelte/components/input-group';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

### With Built-in Field (Recommended)


Pass the `label` prop to InputGroup to enable the built-in Field wrapper with
  label, description, and error support.


```svelte
<script lang="ts">
import { MagnifyingGlass } from "phosphor-svelte";
  import { InputGroup } from "kumo-svelte";
</script>

<InputGroup label="Search" description="Find pages, components, and more">
  <InputGroup.Addon>
    <MagnifyingGlass />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search..." />
</InputGroup>
```

### Bare InputGroup (Custom Layouts)


For custom form layouts, use InputGroup without `label`. Must provide
  `aria-label` on `InputGroup.Input` for accessibility.


```svelte
<script lang="ts">
import { MagnifyingGlass } from "phosphor-svelte";
  import { InputGroup } from "kumo-svelte";
</script>

<InputGroup>
  <InputGroup.Addon>
    <MagnifyingGlass />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search..." aria-label="Search" />
</InputGroup>
```

</ComponentSection>

<ComponentSection>

## Examples

### Icon


Use Addon to place an icon at the start of the input as a visual identifier.

<ComponentExample demo="InputGroupIconsDemo" />

### Text


Use Addon to place text prefixes or suffixes alongside the input.

<ComponentExample demo="InputGroupTextDemo" />

### Button


Place `InputGroup.Button` inside an Addon for actions that operate directly on
  the input value, such as reveal/hide or clear.

<ComponentExample demo="InputGroupButtonsDemo" />

### Button with Tooltip


Pass a `tooltip` prop to `InputGroup.Button` to show a tooltip on hover. When
  no explicit `aria-label` is provided, the button derives it from a string
  tooltip value.

<ComponentExample demo="InputGroupTooltipButtonDemo" />

### Kbd


Place a keyboard shortcut hint inside an end Addon.

<ComponentExample demo="InputGroupKbdDemo" />

### Loading


Place a Loader inside an end Addon as a status indicator while validating the
  input value.

<ComponentExample demo="InputGroupLoadingDemo" />

### Inline Suffix


Suffix renders text that flows seamlessly next to the typed value — useful for
  domain inputs like `.workers.dev`. Pair with a status icon Addon to show
  validation state.

<ComponentExample demo="InputGroupSuffixDemo" />

### Sizes


Four sizes: `xs`, `sm`, `base` (default), and `lg`. The size applies to the
  entire group.

<ComponentExample demo="InputGroupSizesDemo" />

### States


Various input states including error, disabled, and with description. Pass `label`, `error`, and `description` props directly to `InputGroup`.

<ComponentExample demo="InputGroupStatesDemo" />
</ComponentSection>

<ComponentSection>

## API Reference

### InputGroup


The root container that provides context to all child components. Accepts
  Field props (`label`, `description`, `error`) and wraps content in a Field
  when label is provided.

<PropsTable component="InputGroup" />

### InputGroup.Input


The text input element. Inherits `size`, `disabled`, and `error` from
  InputGroup context. Accepts all standard input attributes except Field-related
  props which are handled by the parent.

<PropsTable component="InputGroup.Input" />

### InputGroup.Addon


Container for icons, text, or compact buttons positioned at the start or end
  of the input.

<PropsTable component="InputGroup.Addon" />

### InputGroup.Button


Button for secondary actions like toggle, copy, or help. Renders inside an
  Addon. Pass a `tooltip` prop to show a tooltip on hover.

<PropsTable component="InputGroup.Button" />

### InputGroup.Suffix


Inline text that flows seamlessly next to the typed value (e.g.,
  `.workers.dev`). The input width adjusts automatically as the user types.

<PropsTable component="InputGroup.Suffix" />

### Validation Error Types


When using `error` as an object, the `match` property corresponds to HTML5 ValidityState values:

<div class="overflow-hidden rounded-lg border border-kumo-hairline">
  <table class="w-full text-sm">
    <thead class="bg-kumo-elevated">
      <tr>
        <th class="px-4 py-3 text-left font-medium">Match</th>
        <th class="px-4 py-3 text-left font-medium">Description</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-kumo-hairline">
      <tr>
        <td class="px-4 py-3 font-mono text-xs">valueMissing</td>
        <td class="px-4 py-3 text-xs">Required field is empty</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-mono text-xs">typeMismatch</td>
        <td class="px-4 py-3 text-xs">Value doesn't match type (e.g., invalid email)</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-mono text-xs">patternMismatch</td>
        <td class="px-4 py-3 text-xs">Value doesn't match pattern attribute</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-mono text-xs">tooShort</td>
        <td class="px-4 py-3 text-xs">Value shorter than minLength</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-mono text-xs">tooLong</td>
        <td class="px-4 py-3 text-xs">Value longer than maxLength</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-mono text-xs">rangeUnderflow</td>
        <td class="px-4 py-3 text-xs">Value less than min</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-mono text-xs">rangeOverflow</td>
        <td class="px-4 py-3 text-xs">Value greater than max</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-mono text-xs">true</td>
        <td class="px-4 py-3 text-xs">Always show error (for server-side validation)</td>
      </tr>
    </tbody>
  </table>
</div>
</ComponentSection>

<ComponentSection>

<h2>Accessibility</h2>

<h3>Label Requirement</h3>

<p>InputGroup requires an accessible name via one of:</p>

<ul>
  <li><code>label</code> prop on InputGroup, which renders a visible label with built-in Field support</li>
  <li><code>aria-label</code> on InputGroup.Input for inputs without a visible label</li>
  <li><code>aria-labelledby</code> on InputGroup.Input for custom label association</li>
</ul>

<p>Missing accessible names trigger console warnings in development.</p>

<h3>Group Role</h3>

<p>InputGroup automatically renders with <code>role="group"</code>, which semantically associates the input with its addons for assistive technologies.</p>
</ComponentSection>
