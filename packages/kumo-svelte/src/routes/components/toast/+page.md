---
title: "Toast"
description: "A notification system for displaying brief, non-intrusive messages to users."
sourceFile: "components/toast"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="ToastBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Toasty } from 'kumo-svelte';
```

### Granular

```typescript
import { Toasty } from 'kumo-svelte/components/toasty';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

The toast system consists of two parts: the `Toasty` provider component and the `useKumoToastManager()` hook for triggering toasts.

```svelte
<!-- ToastTrigger.svelte -->
<script lang="ts">
  import { Button, useKumoToastManager } from 'kumo-svelte';

  const toastManager = useKumoToastManager();
</script>

<Button
  onclick={() =>
    toastManager.add({
      title: 'Success!',
      description: 'Your changes have been saved.'
    })}
>
  Save changes
</Button>
```

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import { Toasty } from 'kumo-svelte';
  import ToastTrigger from './ToastTrigger.svelte';
</script>

<Toasty>
  <ToastTrigger />
</Toasty>
```

</ComponentSection>

<!-- Setup -->

<ComponentSection>

## Setup

  
Wrap your application (or a section of it) with the `Toasty` provider. This sets up the toast context and renders the toast viewport.


```svelte
// In your app root or layout
<script lang="ts">
  import { Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {@render children()}
</Toasty>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Title and Description


A complete toast with both title and description.

<ComponentExample demo="ToastBasicDemo" />

### Title Only


A simple toast with just a title for brief messages.

<ComponentExample demo="ToastTitleOnlyDemo" />

### Description Only


A toast with only a description for more detailed messages.

<ComponentExample demo="ToastDescriptionOnlyDemo" />

### Success Variant


Use the success variant for confirmations and positive outcomes.

<ComponentExample demo="ToastSuccessDemo" />

### Multiple Toasts


Multiple toasts stack and animate smoothly. Hover over the stack to expand
  them.

<ComponentExample demo="ToastMultipleDemo" />

### Error Variant


Use the error variant for critical issues that need attention.

<ComponentExample demo="ToastErrorDemo" />

### Warning Variant


Use the warning variant for cautionary messages.

<ComponentExample demo="ToastWarningDemo" />

### Info Variant


Use the info variant for neutral informational messages.

<ComponentExample demo="ToastInfoDemo" />

### Custom Content


Use the content prop to render completely custom toast content.

<ComponentExample demo="ToastCustomContentDemo" />

### Action Buttons


Add action buttons to toasts for user interaction.

<ComponentExample demo="ToastActionsDemo" />

### Promise


Use the promise method to show loading, success, and error states
  automatically.

<ComponentExample demo="ToastPromiseDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Toasty


The provider component that wraps your app and manages the toast system.

<PropsTable component="Toasty" />

### useKumoToastManager()


A hook that returns the toast manager for creating toasts.


```svelte
const toastManager = useKumoToastManager();

// Add a toast
toastManager.add(options);

// Promise-based toast
toastManager.promise(asyncFn(), {
  loading: options,
  success: (data) => options,
  error: (err) => options,
});
```

### Toast Options


Options passed to `toastManager.add()` and promise handlers.

<div class="overflow-x-auto">
  <table class="w-full text-left text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="py-3 pr-4 font-semibold">Prop</th>
        <th class="py-3 pr-4 font-semibold">Type</th>
        <th class="py-3 pr-4 font-semibold">Default</th>
        <th class="py-3 font-semibold">Description</th>
      </tr>
    </thead>
    <tbody class="text-kumo-subtle">
      <tr class="border-b border-kumo-hairline">
        <td class="py-3 pr-4 font-mono text-kumo-default">title</td>
        <td class="py-3 pr-4 font-mono">string</td>
        <td class="py-3 pr-4">—</td>
        <td class="py-3">The toast title displayed prominently.</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="py-3 pr-4 font-mono text-kumo-default">description</td>
        <td class="py-3 pr-4 font-mono">string</td>
        <td class="py-3 pr-4">—</td>
        <td class="py-3">Secondary text displayed below the title.</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="py-3 pr-4 font-mono text-kumo-default">variant</td>
        <td class="py-3 pr-4 font-mono">
          "default" | "success" | "error" | "warning" | "info"
        </td>
        <td class="py-3 pr-4 font-mono">"default"</td>
        <td class="py-3">Visual style of the toast.</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="py-3 pr-4 font-mono text-kumo-default">content</td>
        <td class="py-3 pr-4 font-mono">Snippet</td>
        <td class="py-3 pr-4">—</td>
        <td class="py-3">
          Custom content to render inside the toast. Overrides title and
          description.
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="py-3 pr-4 font-mono text-kumo-default">actions</td>
        <td class="py-3 pr-4 font-mono">ButtonProps[]</td>
        <td class="py-3 pr-4">—</td>
        <td class="py-3">Array of button props to render as action buttons.</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="py-3 pr-4 font-mono text-kumo-default">timeout</td>
        <td class="py-3 pr-4 font-mono">number</td>
        <td class="py-3 pr-4 font-mono">5000</td>
        <td class="py-3">
          Time in milliseconds before the toast auto-dismisses.
        </td>
      </tr>
    </tbody>
  </table>
</div>

</ComponentSection>
