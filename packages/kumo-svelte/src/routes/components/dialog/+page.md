---
title: "Dialog"
description: "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
sourceFile: "components/dialog"
baseUIComponent: "dialog"
---

<script>
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';

  const barrelCode = `import { Dialog } from 'kumo-svelte';`;
  const granularCode = `import { Dialog } from 'kumo-svelte/components/dialog';`;
  const usageCode = `<script lang="ts">
  import { Dialog, Button } from "kumo-svelte";

  let open = $state(false);
<\/script>

<Dialog bind:open title="Dialog Title" description="Dialog content goes here.">
  {#snippet trigger(props)}
    <Button {...props}>Open</Button>
  {/snippet}

  <div class="flex justify-end gap-2">
    <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
  </div>
</Dialog>`;
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="DialogWithActionsDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

<CodeBlock code={barrelCode} lang="ts" />

### Granular

<CodeBlock code={granularCode} lang="ts" />

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

<CodeBlock code={usageCode} lang="svelte" />

</ComponentSection>

<!-- Dialog vs Alert Dialog -->

<ComponentSection>

## Dialog vs Alert Dialog

The Dialog component supports two ARIA roles to properly convey semantic
meaning to assistive technologies:

  <div class="not-prose overflow-hidden rounded-lg border border-kumo-hairline">
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
            <code>role="dialog"</code>
            <span class="ml-2 text-kumo-subtle">(default)</span>
          </td>
          <td class="px-4 py-3">
            General-purpose modals, forms, content display
          </td>
          <td class="px-4 py-3">Dismissible by default</td>
        </tr>
        <tr>
          <td class="px-4 py-3"><code>role="alertdialog"</code></td>
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

### Sizes

The `size` prop controls the fixed width of the dialog on desktop. Content that
overflows the dialog width will scroll horizontally within the dialog rather
than stretching it.

<ComponentExample demo="DialogSizesDemo" />

### Alert Dialog (`role="alertdialog"`)

For destructive or confirmation dialogs, use `role="alertdialog"` on
`Dialog`. This provides proper accessibility semantics by rendering the
dialog with `role="alertdialog"` instead of `role="dialog"`.

<div class="mb-4 rounded-lg border border-kumo-info/30 bg-kumo-info/10 p-4 text-sm text-kumo-info">
  <p class="font-medium mb-2 text-sm">
    When to use
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

### Custom Max Width

Consumer max-width utilities such as `max-w-lg` should cap the dialog on
desktop, even when the dialog contains wide intrinsic content.

<ComponentExample demo="DialogMaxWidthDemo" />

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

<div class="not-prose mb-4 overflow-hidden rounded-lg border border-kumo-hairline">
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
          The ARIA role for the dialog. Use <code>"alertdialog"</code> for destructive or
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
<PropsTable component="Dialog" />
</ComponentSection>
