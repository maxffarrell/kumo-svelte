---
title: "Sidebar"
description: "A composable sidebar navigation component with contained layouts, peeking, sliding views, resizing, icon-only mode, and responsive mobile support."
sourceFile: "components/sidebar"
---

<script>
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';

  const heroCode = `<script lang="ts">
  import { Sidebar } from 'kumo-svelte';
  import { Globe, House } from 'phosphor-svelte';
<\/script>

<Sidebar.Provider defaultOpen>
  <Sidebar>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuButton icon={House} active>Home</Sidebar.MenuButton>
          <Sidebar.MenuButton icon={Globe}>Domains</Sidebar.MenuButton>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar>
</Sidebar.Provider>`;
  const usageCode = `<script lang="ts">
  import { Sidebar } from 'kumo-svelte';
  import { Code, Gear, House } from 'phosphor-svelte';
<\/script>

<Sidebar.Provider defaultOpen>
  <Sidebar>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuButton icon={House} active>Home</Sidebar.MenuButton>
          <Sidebar.MenuItem>
            <Sidebar.Collapsible>
              <Sidebar.CollapsibleTrigger>
                <Sidebar.MenuButton icon={Code}>
                  Compute <Sidebar.MenuChevron />
                </Sidebar.MenuButton>
              </Sidebar.CollapsibleTrigger>
              <Sidebar.CollapsibleContent>
                <Sidebar.MenuSub>
                  <Sidebar.MenuSubButton>Workers</Sidebar.MenuSubButton>
                </Sidebar.MenuSub>
              </Sidebar.CollapsibleContent>
            </Sidebar.Collapsible>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
      <Sidebar.MenuButton icon={Gear}>Settings</Sidebar.MenuButton>
    </Sidebar.Footer>
  </Sidebar>
  <main class="flex-1">
    <!-- page content -->
  </main>
</Sidebar.Provider>`;

  const basicCode = `<Sidebar.Provider defaultOpen>
  <Sidebar>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuButton icon={House} active>Home</Sidebar.MenuButton>
          <Sidebar.MenuButton icon={ChartBar}>Analytics</Sidebar.MenuButton>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar>
</Sidebar.Provider>`;

  const toggleCode = `<Sidebar.MenuButton icon={House} tooltip="Home" active>
  Home
</Sidebar.MenuButton>

<Sidebar.Footer>
  <Sidebar.Trigger />
</Sidebar.Footer>`;

  const fullCode = `<Sidebar>
  <Sidebar.Header>
    <AccountSwitcher />
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.Menu>
        <Sidebar.MenuButton icon={Lock}>
          Zero Trust
          <Sidebar.MenuBadge>Beta</Sidebar.MenuBadge>
        </Sidebar.MenuButton>
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.MenuButton icon={Gear}>Manage account</Sidebar.MenuButton>
  </Sidebar.Footer>
</Sidebar>`;

  const resizableCode = `<Sidebar.Provider defaultOpen resizable defaultWidth={240} minWidth={180} maxWidth={400}>
  <Sidebar>
    <Sidebar.Content>...</Sidebar.Content>
    <Sidebar.ResizeHandle />
  </Sidebar>
</Sidebar.Provider>`;

  const peekingCode = `<Sidebar.Provider defaultOpen={false} peekable contained>
  <Sidebar>
    <Sidebar.Content>
      <Sidebar.MenuButton icon={House} active>Home</Sidebar.MenuButton>
    </Sidebar.Content>
  </Sidebar>
</Sidebar.Provider>`;

  const slidingCode = `<Sidebar.Provider contained>
  <Sidebar>
    <Sidebar.SlidingViews activeKey={view}>
      <Sidebar.SlidingView value="overview">...</Sidebar.SlidingView>
      <Sidebar.SlidingView value="settings">...</Sidebar.SlidingView>
    </Sidebar.SlidingViews>
  </Sidebar>
</Sidebar.Provider>`;

  const rightCode = `<Sidebar.Provider defaultOpen side="right">
  <main class="flex-1">...</main>
  <Sidebar>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Details</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuButton icon={Gear} active>Properties</Sidebar.MenuButton>
          <Sidebar.MenuButton icon={ChartBar}>Metrics</Sidebar.MenuButton>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar>
</Sidebar.Provider>`;
</script>

<!-- Demo -->

<ComponentSection>
  <ComponentExample demo="SidebarFullDemo" code={heroCode} vrSection="full" vrTitle="Full" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Sidebar } from 'kumo-svelte';
```

### Granular

```typescript
import { Sidebar } from 'kumo-svelte/components/sidebar';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

<p class="mb-4 text-sm text-kumo-strong">
  At minimum you need <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">Provider</code>,
  <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">Sidebar</code>,
  <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">Content</code> (scrollable area),
  <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">Menu</code>, and
  <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">MenuButton</code>.
  Add <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">Header</code> /
  <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">Footer</code> to pin content above or below the scroll area.
  Use <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">Group</code> +
  <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">GroupLabel</code> to organize sections.
</p>

<CodeBlock code={usageCode} lang="svelte" />

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic

<p class="mb-3 text-sm text-kumo-strong">
  The minimum viable sidebar: just groups, menu buttons, and collapsible sub-menus. No header or footer.
  <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">MenuButton</code> and <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">MenuSubButton</code> auto-wrap in <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">&lt;li&gt;</code> — no <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">MenuItem</code> / <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">MenuSubItem</code> needed.
</p>

<ComponentExample demo="SidebarBasicDemo" code={basicCode} vrSection="basic" vrTitle="Basic" />

### Toggle & Collapsed State

<p class="mb-3 text-sm text-kumo-strong">
  Use <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">Sidebar.Trigger</code> in the footer or <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">useSidebar().toggleSidebar</code> programmatically. Pass <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">tooltip</code> to show labels on hover when collapsed.
</p>

<ComponentExample demo="SidebarToggleDemo" code={toggleCode} vrSection="toggle" vrTitle="Toggle & Collapsed State" />

### Resizable

<p class="mb-3 text-sm text-kumo-strong">
  Drag the edge to resize. Dragging below <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">minWidth</code> collapses; dragging outward from collapsed expands.
</p>

<ComponentExample demo="SidebarResizableDemo" code={resizableCode} vrSection="resizable" vrTitle="Resizable" />

### Right Side

<p class="mb-3 text-sm text-kumo-strong">
  Use <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">side="right"</code> for a sidebar on the right edge. Place <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">&lt;main&gt;</code> before <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">&lt;Sidebar&gt;</code> in the DOM.
</p>

<ComponentExample demo="SidebarRightDemo" code={rightCode} vrSection="right-side" vrTitle="Right Side" />

### Peeking

<p class="mb-3 text-sm text-kumo-strong">
  Set <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">peekable</code> on the provider so a collapsed icon sidebar can temporarily reveal its full width on hover or focus.
</p>

<ComponentExample demo="SidebarPeekingDemo" code={peekingCode} vrSection="peeking" vrTitle="Peeking" />

### Sliding Views

<p class="mb-3 text-sm text-kumo-strong">
  Use <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">SlidingViews</code> and
  <code class="rounded bg-kumo-control px-1 py-0.5 text-xs">SlidingView</code> to switch between nested sidebar panels without replacing the provider.
</p>

<ComponentExample demo="SidebarSlidingViewsDemo" code={slidingCode} vrSection="sliding-views" vrTitle="Sliding Views" />

### Full Example

<p class="mb-3 text-sm text-kumo-strong">
  Kitchen sink: header with account switcher, search input, badges, collapsible sub-menus, and a footer action.
</p>

<ComponentExample demo="SidebarFullDemo" code={fullCode} vrSection="full-example" vrTitle="Full Example" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Sidebar

The main sidebar container. Renders as `<aside>` on desktop and as a dialog sheet on mobile.

<PropsTable component="Sidebar" />

### Sidebar.Provider

Context provider managing expand/collapse state and mobile detection.

<PropsTable component="Sidebar.Provider" />

### Sidebar.Content

Scrollable middle section (`flex-1 overflow-y-auto`). Use `Header` / `Footer` to pin content above or below this scroll area.

### Sidebar.MenuButton

Primary interactive element. Supports icons, active state, links, and auto-tooltip when collapsed.

<PropsTable component="Sidebar.MenuButton" />

### Sidebar.MenuSubButton

Button inside a sub-menu for nested navigation.

<PropsTable component="Sidebar.MenuSubButton" />

### Sidebar.Trigger

Button that toggles provider open state.

### Sidebar.ResizeHandle

Keyboard and pointer resize control for resizable sidebars.

### Sidebar.SlidingViews

Container for keyed sliding sidebar panels.

### Sidebar.SlidingView

Panel rendered when its `value` matches the parent `activeKey`.

</ComponentSection>
