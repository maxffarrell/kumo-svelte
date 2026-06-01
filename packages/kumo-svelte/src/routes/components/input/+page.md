---
title: "Input"
description: "A text input field for user input with built-in label, description, and error support."
sourceFile: "components/input"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="InputBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Input, Textarea } from 'kumo-svelte';
```

### Granular

```typescript
import { Input, Textarea } from 'kumo-svelte/components/input';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

### With Built-in Field (Recommended)

Use the `label` prop to enable the built-in Field wrapper with label,
description, and error support.

```svelte
<script lang="ts">
  import { Input } from 'kumo-svelte';
</script>

<Input
  label="Email"
  placeholder="you@example.com"
  description="We'll never share your email"
/>
```

### Bare Input (Custom Layouts)

For custom form layouts, use Input without `label`. Must provide `aria-label`
or `aria-labelledby` for accessibility.

```svelte
<script lang="ts">
  import { Input } from 'kumo-svelte';
</script>

<Input placeholder="Search..." aria-label="Search products" />
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### With Label and Description

The `label` prop enables the built-in Field wrapper with automatic vertical
layout (label above input).

<ComponentExample demo="InputWithLabelDemo" />

### With Error (String)

Pass `error` as a string for simple error messages. Error styling is
automatically applied when the `error` prop is truthy.

<ComponentExample demo="InputErrorStringDemo" />

### With Error (Validation Object)

Pass `error` as an object with `message` and `match` for HTML5 validation.
Error shows when field validity matches.

<ComponentExample demo="InputErrorObjectDemo" />

### Input Sizes

Four sizes available: `xs`, `sm`, `base` (default), `lg`.

<ComponentExample demo="InputSizesDemo" />

### Disabled

<ComponentExample demo="InputDisabledDemo" />

### Optional Field

Set `required={false}` to show "(optional)" text after the label.

<ComponentExample demo="InputOptionalFieldDemo" />

### With Label Tooltip

Use `labelTooltip` to add an info icon with additional context on hover.

<ComponentExample demo="InputLabelTooltipDemo" />

### Snippet Label

The `label` prop accepts a Svelte snippet for rich formatting.

<ComponentExample demo="InputSnippetLabelDemo" />

### Controlled with oninput

The standard Svelte `oninput` handler receives the full event object. Use
`event.currentTarget.value` to get the value.

<ComponentExample demo="InputControlledOnChangeDemo" />

### Controlled with onValueChange

`onValueChange` is a convenience handler that gives you the string value
directly without event unwrapping.

<ComponentExample demo="InputControlledOnValueChangeDemo" />

### Bare Input (No Label)

Input without `label` renders as a bare input. Must provide `aria-label` for
accessibility.

<ComponentExample demo="InputBareDemo" />

### Error Without Label

Error messages and descriptions render even without a visible `label`; use
`aria-label` to keep the input accessible.

<ComponentExample demo="InputErrorWithoutLabelDemo" />

### Input Types

Supports all HTML input types: `text`, `email`, `password`, `number`, `tel`,
`url`, etc.

<ComponentExample demo="InputTypesDemo" />

### Password Manager Overlays

Set `passwordManagerIgnore` on non-credential inputs that password managers
might incorrectly classify as login fields.

<ComponentExample demo="InputPasswordManagerIgnoreDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

Input accepts all standard HTML input attributes plus the following:

<PropsTable component="Input" />

### Validation Error Types

When using `error` as an object, the `match` property corresponds to HTML5 ValidityState values:

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Match</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">valueMissing</td>
        <td class="px-4 py-3 text-xs">Required field is empty</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">typeMismatch</td>
        <td class="px-4 py-3 text-xs">Value doesn't match type (e.g., invalid email)</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">patternMismatch</td>
        <td class="px-4 py-3 text-xs">Value doesn't match pattern attribute</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">tooShort</td>
        <td class="px-4 py-3 text-xs">Value shorter than minLength</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">tooLong</td>
        <td class="px-4 py-3 text-xs">Value longer than maxLength</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">rangeUnderflow</td>
        <td class="px-4 py-3 text-xs">Value less than min</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">rangeOverflow</td>
        <td class="px-4 py-3 text-xs">Value greater than max</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">true</td>
        <td class="px-4 py-3 text-xs">Always show error (for server-side validation)</td>
      </tr>
    </tbody>
  </table>
</div>

</ComponentSection>

<!-- Accessibility -->

<ComponentSection>

## Accessibility

### Label Requirement

Inputs require an accessible name via one of:

<ul class="ml-4 list-disc space-y-1">
  <li>`label` prop (recommended)</li>
  <li>`placeholder` + `aria-label` for bare inputs</li>
  <li>`aria-labelledby` for custom label association</li>
</ul>

### Error Association

Error messages are automatically associated with the input via ARIA attributes
for screen reader announcement.

</ComponentSection>
