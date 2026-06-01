---
title: "Dropdown Menu"
description: "Displays a menu to the user—such as a set of actions or functions—triggered by a button."
sourceFile: "components/dropdown"
bitsUIComponent: "dropdown-menu"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="DropdownBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { DropdownMenu } from 'kumo-svelte';
```

### Granular

```typescript
import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script>
  import { DropdownMenu, Button } from "kumo-svelte";
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props}>Menu</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item onSelect={() => console.log("edit")}>
      Edit
    </DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => console.log("duplicate")}>
      Duplicate
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item
      variant="danger"
      onSelect={() => console.log("delete")}
    >
      Delete
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic Dropdown

<ComponentExample demo="DropdownBasicDemo" />

### Inset Items


Use `inset` on items without an icon to align their text with items that have one.

<ComponentExample demo="DropdownInsetDemo" />

### Handling Item Clicks


Use `onSelect` on `DropdownMenu.Item` to handle actions. Each item receives a standard menu select event handler.

<ComponentExample demo="DropdownOnClickDemo" />

### Checkbox Items


Use `DropdownMenu.CheckboxItem` for toggleable options that can be
  independently checked or unchecked.

<ComponentExample demo="DropdownCheckboxDemo" />

### Nested Menu with Radio Selection


Use `DropdownMenu.Sub`, `DropdownMenu.SubTrigger`, and
  `DropdownMenu.SubContent` to create nested submenus. For single-selection
  lists like language or timezone, use `DropdownMenu.RadioGroup` and
  `DropdownMenu.RadioItem`.

<ComponentExample demo="DropdownNestedDemo" />

### Custom Trigger with Avatar


Use the `child` snippet to customize the trigger element while passing children
  to render inside it. This is useful when you need a non-button trigger (like
  an avatar) wrapped in an accessible button element.

<ComponentExample demo="DropdownAvatarTriggerDemo" />

### Navigation Links


Use `DropdownMenu.LinkItem` for menu items that navigate to a URL.
  This renders a semantic `<a>` element with full control over link attributes like `target` and `rel`.

<ComponentExample demo="DropdownLinkItemDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### DropdownMenu


Root component that manages the dropdown state.

<PropsTable component="DropdownMenu" />

### DropdownMenu.Trigger


Button that opens the dropdown when clicked.

<PropsTable component="DropdownMenu.Trigger" />

### DropdownMenu.Item


Individual menu item for actions.

<PropsTable component="DropdownMenu.Item" />

### DropdownMenu.LinkItem


A menu item that navigates to a URL. Renders a semantic `<a>` element. Use this instead of `Item` for navigation links.

<PropsTable component="DropdownMenu.LinkItem" />

### DropdownMenu.CheckboxItem


A menu item that can be toggled on or off. Use for independent boolean
  options.

<PropsTable component="DropdownMenu.CheckboxItem" />

### DropdownMenu.Sub


Root component for a nested submenu. Wrap SubTrigger and SubContent inside
  this.

<PropsTable component="DropdownMenu.Sub" />

### DropdownMenu.SubTrigger


Menu item that opens a nested submenu when hovered or clicked. Displays a
  caret icon automatically.

<PropsTable component="DropdownMenu.SubTrigger" />

### DropdownMenu.SubContent


Container for submenu items. Positioned relative to the SubTrigger.

<PropsTable component="DropdownMenu.SubContent" />

### DropdownMenu.Separator


A visual divider between menu items.

<PropsTable component="DropdownMenu.Separator" />

### DropdownMenu.RadioGroup


Groups radio items for single-selection behavior. Only one item can be
  selected at a time.

<PropsTable component="DropdownMenu.RadioGroup" />

### DropdownMenu.RadioItem


A menu item that works like a radio button. Must be used inside a RadioGroup.

<PropsTable component="DropdownMenu.RadioItem" />

### DropdownMenu.RadioItemIndicator


Shows the selected state for a RadioItem. Displays a checkmark by default.

<PropsTable component="DropdownMenu.RadioItemIndicator" />

</ComponentSection>
