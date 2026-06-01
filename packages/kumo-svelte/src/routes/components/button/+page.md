---
title: "Button"
description: "Displays a button or a component that looks like a button."
sourceFile: "components/button"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Demo -->

<ComponentSection>
  <ComponentExample demo="ButtonBasicDemo" vrSection="basic" vrTitle="Basic" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Button, LinkButton, RefreshButton } from 'kumo-svelte';
```

### Granular

```typescript
import { Button, LinkButton, RefreshButton } from 'kumo-svelte/components/button';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Button } from 'kumo-svelte';
</script>

<Button variant="secondary">Click me</Button>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

<!-- Variants -->

### Variants

#### Primary

<ComponentExample
  demo="ButtonPrimaryDemo"
  vrSection="variant-primary"
  vrTitle="Variant: Primary"
 />

#### Secondary

<ComponentExample
  demo="ButtonSecondaryDemo"
  vrSection="variant-secondary"
  vrTitle="Variant: Secondary"
 />

#### Ghost

<ComponentExample
  demo="ButtonGhostDemo"
  vrSection="variant-ghost"
  vrTitle="Variant: Ghost"
 />

#### Destructive

<ComponentExample
  demo="ButtonDestructiveDemo"
  vrSection="variant-destructive"
  vrTitle="Variant: Destructive"
 />

#### Outline

<ComponentExample
  demo="ButtonOutlineDemo"
  vrSection="variant-outline"
  vrTitle="Variant: Outline"
 />

#### Secondary Destructive

<ComponentExample
  demo="ButtonSecondaryDestructiveDemo"
  vrSection="variant-secondary-destructive"
  vrTitle="Variant: Secondary Destructive"
 />

<!-- Sizes -->

### Sizes

<ComponentExample demo="ButtonSizesDemo" vrSection="sizes" vrTitle="Sizes" />

<!-- With Icon -->

### With Icon

<ComponentExample
  demo="ButtonWithIconDemo"
  vrSection="with-icon"
  vrTitle="With Icon"
 />

<!-- Icon Only -->

### Icon Only


For icon-only buttons, use `shape="square"` or `shape="circle"` with the
  `icon` prop.
  **Always include `aria-label`**
  for accessibility — without visible text, screen readers need the label to
  convey the button's purpose.

<ComponentExample
  demo="ButtonIconOnlyDemo"
  vrSection="icon-only"
  vrTitle="Icon Only"
 />

<!-- Loading State -->

### Loading State

<ComponentExample
  demo="ButtonLoadingDemo"
  vrSection="loading"
  vrTitle="Loading State"
 />

<!-- Disabled State -->

### Disabled State

<ComponentExample
  demo="ButtonDisabledDemo"
  vrSection="disabled"
  vrTitle="Disabled State"
 />

<!-- Title (Tooltip) -->

### Title


Use the `title` prop to wrap the button in a tooltip. This is useful for
    icon-only buttons or whenever additional context helps the user understand
    the action.

  <ComponentExample
    demo="ButtonTitleDemo"
    vrSection="title"
    vrTitle="Title"
   />

### Link as Button


Use `Button.LinkButton` when the interaction should navigate somewhere but still look
  like a button. Use `Button` for in-place actions like submitting, opening, or
  toggling UI.

<ComponentExample
  demo="ButtonLinkAsButtonDemo"
  vrSection="link-as-button"
  vrTitle="Link as Button"
 />
</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="Button" />
</ComponentSection>

<!-- trigger-vr -->
