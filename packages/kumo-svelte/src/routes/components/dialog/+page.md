---
title: "Dialog"
description: "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
sourceFile: "components/dialog"
baseUIComponent: "dialog"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="DialogWithActionsDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Dialog } from 'kumo-svelte';
```

### Granular

```typescript
import { Dialog } from 'kumo-svelte/components/dialog';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Dialog, Button } from "kumo-svelte";

  let open = $state(false);
</script>

<Dialog bind:open title="Dialog Title" description="Dialog content goes here.">
  {#snippet trigger(props)}
    <Button {...props}>Open</Button>
  {/snippet}

  <div class="flex justify-end gap-2">
    <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
  </div>
</Dialog>
```

</ComponentSection>

<!-- Dialog vs Alert Dialog -->

<ComponentSection>

## Dialog vs Alert Dialog

  
The Dialog component supports two ARIA roles to properly convey semantic
    meaning to assistive technologies:


  <div class="overflow-hidden rounded-lg border border-kumo-hairline">
    <table class="w-full text-sm">
      <thead class="bg-kumo-elevated">
        <tr>
          <th class="px-4 py-3 text-left font-medium">Role</th>
          <th class="px-4 py-3 text-left font-medium">Use Case</th>
          <th class="px-4 py-3 text-left font-medium">Behavior</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-kumo-hairline">
        <tr>
          <td class="px-4 py-3">
            `role="dialog"`
            <span class="ml-2 text-kumo-subtle">(default)</span>
          </td>
          <td class="px-4 py-3">
            General-purpose modals, forms, content display
          </td>
          <td class="px-4 py-3">Dismissible by default</td>
        </tr>
        <tr>
          <td class="px-4 py-3">`role="alertdialog"`</td>
          <td class="px-4 py-3">
            Destructive actions, confirmations, critical warnings
          </td>
          <td class="px-4 py-3">Requires explicit user acknowledgment</td>
        </tr>
      </tbody>
    </table>
  </div>
</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic Dialog

<ComponentExample demo="DialogBasicDemo" />

### Alert Dialog (`role="alertdialog"`)


For destructive or confirmation dialogs, use `role="alertdialog"` on
  `Dialog`. This provides proper accessibility semantics by rendering the
  dialog with `role="alertdialog"` instead of `role="dialog"`.

<div class="mb-4 rounded-lg border border-kumo-info/30 bg-kumo-info/10 p-4 text-sm text-kumo-info">
  <p class="font-medium mb-2 text-sm">
    When to use{" "}
    <code class="bg-kumo-info/20 px-1 rounded">role="alertdialog"</code>:
  </p>
  <ul class="list-disc list-inside space-y-1 ml-2 mb-0">
    <li>Destructive actions (delete, discard, remove)</li>
    <li>Confirmation flows requiring explicit user acknowledgment</li>
    <li>Actions that cannot be undone</li>
    <li>Critical warnings or errors</li>
  </ul>
</div>
<ComponentExample demo="DialogAlertDemo" />

### Confirmation Dialog (with `disablePointerDismissal`)


For confirmation dialogs that should not be dismissed by clicking outside, use
  `disablePointerDismissal` on `Dialog`. This can be combined with
  `role="alertdialog"` for proper accessibility.

<ComponentExample demo="DialogConfirmationDemo" />

### With Actions

<ComponentExample demo="DialogWithActionsDemo" />

### With Select


Dialog containing a Select dropdown.

<ComponentExample demo="DialogWithSelectDemo" />

### With Combobox


Dialog containing a Combobox for searchable selection.

<ComponentExample demo="DialogWithComboboxDemo" />

### With Dropdown

Dialog containing a Dropdown menu.

  <ComponentExample demo="DialogWithDropdownDemo" />
</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Dialog


The main dialog container that renders the modal overlay and popup.

<PropsTable component="Dialog" />

### Dialog.Root


Controls the open state of the dialog. Doesn't render its own HTML element.

<div class="mb-4 overflow-hidden rounded-lg border border-kumo-hairline">
  <table class="w-full text-sm">
    <thead class="bg-kumo-elevated">
      <tr>
        <th class="px-4 py-2 text-left font-medium">Prop</th>
        <th class="px-4 py-2 text-left font-medium">Type</th>
        <th class="px-4 py-2 text-left font-medium">Default</th>
        <th class="px-4 py-2 text-left font-medium">Description</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-kumo-hairline">
      <tr>
        <td class="px-4 py-2 font-mono text-xs">role</td>
        <td class="px-4 py-2 font-mono text-xs">"dialog" | "alertdialog"</td>
        <td class="px-4 py-2 font-mono text-xs">"dialog"</td>
        <td class="px-4 py-2 text-kumo-subtle">
          The ARIA role for the dialog. Use `"alertdialog"` for destructive or
          confirmation flows.
        </td>
      </tr>
      <tr>
        <td class="px-4 py-2 font-mono text-xs">disablePointerDismissal</td>
        <td class="px-4 py-2 font-mono text-xs">boolean</td>
        <td class="px-4 py-2 font-mono text-xs">false</td>
        <td class="px-4 py-2 text-kumo-subtle">
          When true, prevents the dialog from being dismissed by clicking
          outside.
        </td>
      </tr>
    </tbody>
  </table>
</div>
<PropsTable component="Dialog.Root" />

### Dialog.Trigger


A button that opens the dialog when clicked.

<PropsTable component="Dialog.Trigger" />

### Dialog.Title


A heading that labels the dialog for accessibility.

<PropsTable component="Dialog.Title" />

### Dialog.Description


A paragraph providing additional context about the dialog.

<PropsTable component="Dialog.Description" />

### Dialog.Close

A button that closes the dialog when clicked.

  <PropsTable component="Dialog.Close" />
</ComponentSection>
