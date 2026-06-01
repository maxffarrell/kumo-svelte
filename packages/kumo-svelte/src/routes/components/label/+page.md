---
title: "Label"
description: "A label component for form fields with support for required/optional indicators and tooltips."
sourceFile: "components/label"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="LabelBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Label } from 'kumo-svelte';
```

### Granular

```typescript
import { Label } from 'kumo-svelte/components/label';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

### With Form Components (Recommended)

<p>
  Label features are automatically available through form components like `Input`, `Select`, `Checkbox`, and `Switch` via the `required` and `labelTooltip` props.
</p>

```svelte
<script lang="ts">
  import { Input } from 'kumo-svelte';
</script>

<!-- Optional field with "(optional)" text -->
<Input label="Phone" required={false} placeholder="+1 555-0000" />

<!-- With tooltip -->
<Input
  label="API Key"
  labelTooltip="Find this in your dashboard settings"
/>
```

### Standalone Label

<p>For custom form layouts, use the `Label` component directly.</p>

```svelte
<script lang="ts">
  import { Label } from 'kumo-svelte';
</script>

<Label tooltip="This field is mandatory">Username</Label>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Optional Field


Shows gray "(optional)" text when `required={false}`.

<ComponentExample demo="LabelOptionalFieldDemo" />

### With Tooltip


Shows an info icon with a tooltip for additional context.

<ComponentExample demo="LabelWithTooltipDemo" />

### Snippet Label Content


Labels support Snippet content for rich formatting.

<ComponentExample demo="LabelSnippetDemo" />

### Form with Mixed Fields


Real-world example showing required and optional fields together.

<ComponentExample demo="LabelFormMixedDemo" />

### Standalone Label


Use Label directly for custom layouts or non-form contexts.

<ComponentExample demo="LabelStandaloneDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Label Props


Props for the standalone Label component:

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Default</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">children</td>
        <td class="px-4 py-3 font-mono text-xs">Snippet</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Label content (required)</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">showOptional</td>
        <td class="px-4 py-3 font-mono text-xs">boolean</td>
        <td class="px-4 py-3 font-mono text-xs">false</td>
        <td class="px-4 py-3 text-xs">
          Shows gray "(optional)" text (only when required is false)
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">tooltip</td>
        <td class="px-4 py-3 font-mono text-xs">string | Snippet</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Tooltip content shown via info icon</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">class</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Additional CSS classes</td>
      </tr>
    </tbody>
  </table>
</div>

### Form Component Label Props


These props are available on Input, InputArea, Select, Checkbox, Switch,
  SensitiveInput, and Combobox:

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Default</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">label</td>
        <td class="px-4 py-3 font-mono text-xs">string | Snippet</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Label content (enables Field wrapper)</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">required</td>
        <td class="px-4 py-3 font-mono text-xs">boolean</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">
          When false: shows "(optional)" text. Also sets HTML required
          attribute.
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">labelTooltip</td>
        <td class="px-4 py-3 font-mono text-xs">string | Snippet</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">
          Tooltip content shown via info icon next to label
        </td>
      </tr>
    </tbody>
  </table>
</div>

</ComponentSection>

<!-- Design Guidelines -->

<ComponentSection>

<h2>Design Guidelines</h2>

<h3>When to Use Optional Indicators</h3>

<ul>
  <li>Use "(optional)" for optional fields when most fields are required</li>
  <li>Be consistent within a form</li>
  <li>Default fields with no indicator are assumed required by users</li>
</ul>

<h3>When to Use Tooltips</h3>

<ul>
  <li>Provide additional context that doesn't fit in the label</li>
  <li>Explain format requirements or validation rules</li>
  <li>Link to help documentation for complex fields</li>
  <li>Keep tooltip content concise, usually 1-2 sentences</li>
</ul>

<h3>Accessibility</h3>

<ul>
  <li>Optional indicators are purely visual; use the <code>required</code> attribute for validation</li>
  <li>Tooltips are accessible via keyboard focus on the info icon</li>
  <li>Screen readers announce tooltip content when focused</li>
</ul>
</ComponentSection>
