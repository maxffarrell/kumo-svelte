---
title: "Layer Dialog"
description: "A responsive dialog that becomes a bottom sheet on mobile."
sourceFile: "components/layer-dialog"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection><ComponentExample demo="LayerDialogDemo" /></ComponentSection>

<ComponentSection>

## Installation

```svelte
import { LayerDialog } from 'kumo-svelte';
```

## Behavior

LayerDialog renders as a bottom sheet on small screens and a centered dialog on desktop. Set `dismissDisabled` while asynchronous work is pending. Use `LayerDialog.Alert` when the user must explicitly choose an action.

### Alert dialog

<ComponentExample demo="LayerDialogAlertDemo" />

## API Reference

<PropsTable component="LayerDialog" />
<PropsTable component="LayerDialog.Content" />

</ComponentSection>
