---
title: "Tooltip"
description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
sourceFile: "components/tooltip"
baseUIComponent: "tooltip"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="TooltipHeroDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Tooltip, TooltipProvider } from 'kumo-svelte';
```

### Granular

```typescript
import { Tooltip, TooltipProvider } from 'kumo-svelte/components/tooltip';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
import { Tooltip, Button } from "kumo-svelte";
</script>

<Tooltip content="Tooltip text">
  <Button>Hover me</Button>
</Tooltip>
```

For delay grouping across multiple tooltips, see [TooltipProvider](#tooltipprovider).

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic Tooltip

<ComponentExample demo="TooltipBasicDemo" />

### Multiple Tooltips

<ComponentExample demo="TooltipMultipleDemo" />

### Long Content / Overflow

Tooltips with long content automatically constrain their width to the available
viewport space using `--available-width` from Bits UI's floating positioning.
Hover over the edge buttons to see the tooltip wrap instead of overflowing the
viewport.

<ComponentExample demo="TooltipOverflowDemo" />

### Delay Control


Use `delay` to control how long to wait before opening (default: 600ms) and
  `closeDelay` to control how long to wait before closing (default: 0ms).

<ComponentExample demo="TooltipDelayDemo" />

</ComponentSection>

<!-- TooltipProvider -->

<span id="tooltipprovider"></span>

<ComponentSection>
## TooltipProvider


`TooltipProvider` groups multiple tooltips so that after the first tooltip has
  been shown, switching to another skips the open delay. Place it once at your
  app root or layout — not around each individual `Tooltip`.


```svelte
// Wrap your app or layout once
<TooltipProvider>
  <App />
</TooltipProvider>

// Then use Tooltip anywhere inside
<Tooltip content="Add">
  <Button shape="square" aria-label="Add">
    <PlusIcon />
  </Button>
</Tooltip>
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Tooltip

<PropsTable component="Tooltip" />

### TooltipProvider

<PropsTable component="Tooltip.Provider" />

</ComponentSection>
