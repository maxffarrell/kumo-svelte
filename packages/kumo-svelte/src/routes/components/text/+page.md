---
title: "Text"
description: "A typography component for various heading and copy styles."
sourceFile: "components/text"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="TextVariantsDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Text } from 'kumo-svelte';
```

### Granular

```typescript
import { Text } from 'kumo-svelte/components/text';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Text } from 'kumo-svelte';
</script>

<Text>Your content here</Text>
```

### Semantic HTML

The `variant` prop controls visual styling only; use `as` to choose semantic HTML. The `heading` variant defaults to a `<span>` so decorative heading text does not silently enter the document outline. Body and monospace variants default to `<p>` and `<span>` respectively.

```svelte
<!-- Real section headings (contribute to the document outline) -->
<Text variant="heading" size="lg" as="h1">Page Title</Text>
<Text variant="heading" as="h2">Section Title</Text>

<!-- Decorative heading-styled text that is NOT a section heading -->
<Text variant="heading">Card label</Text>

<!-- Visually one size, semantically another -->
<Text variant="heading" size="lg" as="h3">Large presentation, semantic h3</Text>
```

The `as` prop accepts headings (`"h1"` through `"h6"`) and common inline or block text elements. The legacy `heading1`, `heading2`, and `heading3` variants remain available for compatibility but are deprecated and still require `as`.

### Restrictions

The `bold` and full `size` range are restricted to body, secondary, success, and error text variants. The new `heading` variant accepts only `size="lg"`; omit it for the default 16px heading.

```svelte
<Text size="sm" bold>Body</Text>
<Text variant="secondary" bold>Body secondary</Text>
<Text variant="success" size="lg">Success</Text>
<Text variant="error">Error</Text>
```


Monospace variants (`mono` and `mono-secondary`) can only set `size` to `lg` and cannot use the `bold` prop:

```svelte
<Text variant="mono">Monospace</Text>
<Text variant="mono" size="lg">Monospace</Text>
<Text variant="mono" bold>Monospace</Text> // Doesn't compile
```


Deprecated numbered headings cannot use `bold` or `size`:

```svelte
<Text variant="heading1" bold>
  Heading 1
</Text> // Doesn't compile
```

</ComponentSection>

<!-- Truncate -->

<ComponentSection>

## Truncate


<p>Use the `truncate` prop to clip overflowing text with an ellipsis. This adds `truncate min-w-0` classes, which is useful when `Text` is inside a flex or grid container.</p>

<ComponentExample demo="TextTruncateDemo" />

```svelte
<Text truncate>This is a long piece of text that will be truncated...</Text>
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="Text" />
</ComponentSection>
