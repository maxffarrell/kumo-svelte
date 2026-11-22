---
title: "Layer Dialog"
description: "A responsive dialog that becomes a bottom sheet on mobile."
sourceFile: "components/layer-dialog"
---

<script>
  import ComponentExample from '#lib/docs/ComponentExample.svelte';
  import ComponentSection from '#lib/docs/ComponentSection.svelte';
  import PropsTable from '#lib/docs/PropsTable.svelte';
</script>

<ComponentSection><ComponentExample demo="LayerDialogActionDemo" /></ComponentSection>

<ComponentSection>

## Installation

```svelte
import { LayerDialog } from 'kumo-svelte/components/layer-dialog';
```

## Composition rules

Place one `Title` and one `Body` inside `Content`. Add a `Description` beneath the title when the dialog needs supporting copy. With `Actions`, the footer provides a dismiss button and one primary action. Without actions, the title area has an icon close button. On mobile the dialog opens as a bottom sheet.

</ComponentSection>

<ComponentSection>

## Informational dialog

<ComponentExample demo="LayerDialogInformationalDemo" />

</ComponentSection>

<ComponentSection>

## Standard action

<ComponentExample demo="LayerDialogActionDemo" />

</ComponentSection>

<ComponentSection>

## Native forms

<ComponentExample demo="LayerDialogFormDemo" />

</ComponentSection>

<ComponentSection>

## Search and pickers

<ComponentExample demo="LayerDialogSearchDemo" />

</ComponentSection>

<ComponentSection>

## Dividing body content

<ComponentExample demo="LayerDialogSeparatorDemo" />

</ComponentSection>

<ComponentSection>

## Multiple primary actions

<ComponentExample demo="LayerDialogSplitActionDemo" />

</ComponentSection>

<ComponentSection>

## Cancellation wording

<ComponentExample demo="LayerDialogCancelDemo" />

</ComponentSection>

<ComponentSection>

## Confirmation and destructive actions

<ComponentExample demo="LayerDialogAlertDemo" />

</ComponentSection>

<ComponentSection>

## Nested dialogs

<ComponentExample demo="LayerDialogNestedDemo" />

</ComponentSection>

<ComponentSection>

## Pending work

<ComponentExample demo="LayerDialogPendingDemo" />

</ComponentSection>

<ComponentSection>

## Cleanup

<ComponentExample demo="LayerDialogCleanupDemo" />

</ComponentSection>

<ComponentSection>

## Desktop width

<ComponentExample demo="LayerDialogSizeDemo" />

</ComponentSection>

<ComponentSection>

## Desktop placement

<ComponentExample demo="LayerDialogTopAlignDemo" />

</ComponentSection>

<ComponentSection>

## Maximum height

<ComponentExample demo="LayerDialogMaxHeightDemo" />

</ComponentSection>

<ComponentSection>

## API Reference

<PropsTable component="LayerDialog" />
<PropsTable component="LayerDialog.Content" />
<PropsTable component="LayerDialog.Action" />

</ComponentSection>
