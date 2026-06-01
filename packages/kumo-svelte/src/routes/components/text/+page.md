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

The `variant` prop controls visual styling only - it does not determine the HTML element rendered. Heading variants **require** the `as` prop to avoid silently excluding real section headings from the document outline. Body and monospace variants have sensible defaults (`<p>` and `<span>` respectively) and accept `as` optionally.

```svelte
<!-- Heading variants REQUIRE `as` — TypeScript will flag usages missing it -->
<Text variant="heading1">Page Title</Text> <!-- Doesn't compile -->

<!-- Real section headings (contribute to the document outline) -->
<Text variant="heading1" as="h1">Page Title</Text>
<Text variant="heading2" as="h2">Section Title</Text>

<!-- Decorative heading-styled text that is NOT a section heading -->
<Text variant="heading1" as="span">Big bold card label</Text>

<!-- Visually one size, semantically another -->
<Text variant="heading1" as="h3">Visually large, but semantically h3</Text>
```


The `as` prop accepts: `"h1"` through `"h6"`, `"p"`, and `"span"`. Body variants default to `"p"`, monospace variants default to `"span"`, and heading variants have no default - you must choose explicitly.

### Restrictions

The `bold` and `size` props are intentionally restricted to the `base`, `secondary`, `success`, and `error` text variants.

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


Headings (i.e. `heading1`, `heading2` and `heading3` variants) cannot use these props at all:

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
