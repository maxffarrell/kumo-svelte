---
title: "Badge"
description: "Displays a small label for status, categorization, or metadata."
sourceFile: "components/badge"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentExample demo="BadgeSemanticVariantsDemo" />

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Badge } from 'kumo-svelte';
```

### Granular

```typescript
import { Badge } from 'kumo-svelte/components/badge';
```

</ComponentSection>

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Badge } from 'kumo-svelte';
</script>

<Badge variant="secondary">New</Badge>
```

## Examples

### Primary Badges

<ComponentExample demo="BadgeSemanticVariantsDemo" />

### Other variants

Other variants for specific products/use cases where the semantic badges aren't enough to convey intended meaning or status.

<ComponentExample demo="BadgeColorVariantsDemo" />

### Dot appearance

Use `appearance="dot"` with `success`, `warning`, `error`, or `neutral` variants to show a compact status indicator.

<ComponentExample demo="BadgeDotDemo" />

### With an icon

Filled badges can render an icon before their label.

<ComponentExample demo="BadgeIconDemo" />

### As a link

Wrap a badge in `Link` to make it interactive. Linked badges automatically show a hover ring.

<ComponentExample demo="BadgeLinkDemo" />

### In a sentence

<ComponentExample demo="BadgeInSentenceDemo" />

## API Reference

<PropsTable component="Badge" />

</ComponentSection>
