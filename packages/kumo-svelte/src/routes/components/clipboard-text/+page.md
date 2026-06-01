---
title: "Clipboard Text"
description: "A text component with a copy-to-clipboard button."
sourceFile: "components/clipboard-text"
---

<script>
  import { ClipboardText } from '$lib/components/clipboard-text';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="ClipboardTextBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { ClipboardText } from 'kumo-svelte';
```

### Granular

```typescript
import { ClipboardText } from 'kumo-svelte/components/clipboard-text';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { ClipboardText } from 'kumo-svelte';
</script>

<ClipboardText text="Copy this text" />
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Short Text

<ComponentExample demo="ClipboardTextShortDemo" />

### API Key

<ComponentExample demo="ClipboardTextApiKeyDemo" />

### Copy Alternate Text

<ComponentExample demo="ClipboardTextAlternateDemo" />

### Long Text

<ComponentExample demo="ClipboardTextLongDemo" />

### With Tooltip

Shows "Copy" tooltip on hover, "Copied!" toast on click.

<ComponentExample demo="ClipboardTextTooltipDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="ClipboardText" />
</ComponentSection>
