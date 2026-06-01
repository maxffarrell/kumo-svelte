---
title: "Flow"
description: "A group of components for building directed flow diagrams with nodes and connectors."
sourceFile: "components/flow"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="FlowParallelDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Flow, FlowAnchor, FlowList, FlowNode, FlowParallel, FlowRoot } from 'kumo-svelte';
```

### Granular

```typescript
import { Flow, FlowAnchor, FlowList, FlowNode, FlowParallel, FlowRoot } from 'kumo-svelte/components/flow';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

  
The Flow components work together to create directed flow diagrams. Use
    `Flow` as the container,
    `Flow.Node` for individual
    steps, and
    `Flow.Parallel` to create
    branching paths.


```svelte
<script lang="ts">
import { Flow } from "kumo-svelte";
</script>

    <Flow>
      <Flow.Node>Step 1</Flow.Node>
      <Flow.Node>Step 2</Flow.Node>
      <Flow.Node>Step 3</Flow.Node>
    </Flow>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Sequential Flow


A simple linear flow with nodes connected in sequence.

<ComponentExample demo="FlowBasicDemo" />

### Parallel Branches


Use `Flow.Parallel` to create branching paths that run in parallel.

<ComponentExample demo="FlowParallelDemo" />

### Custom Node Styling


Use the `bare` prop to remove the default card styling, then pass your own
  content and classes inside the node.

<ComponentExample demo="FlowCustomContentDemo" />

### Centered Alignment


Use the `align` prop to vertically center nodes. This is useful when nodes
  have different heights.

<ComponentExample demo="FlowCenteredDemo" />

### Complex Flow


Combine sequential and parallel nodes to build complex workflows.

<ComponentExample demo="FlowComplexDemo" />

### Custom Anchor Points


By default, connectors attach to the center of each node. Use `Flow.Anchor`
  around custom content to specify attachment points. The `type` prop
  controls whether the anchor serves as a `"start"` point (where connectors
  leave) or `"end"` point (where connectors arrive).

<ComponentExample demo="FlowAnchorDemo" />

### Panning Large Diagrams


When a diagram exceeds its container, Flow automatically enables panning. Drag
  to pan the viewport, or use the scroll wheel. Scrollbars appear on hover to
  indicate available scroll area.

<ComponentExample demo="FlowPanningDemo" />

### Disabled Nodes


Use the `disabled` prop on a node to visually indicate it's inactive.
  Connectors linking to disabled nodes are rendered with reduced opacity.

<ComponentExample demo="FlowDisabledDemo" />

### Parallel Node Alignment

  
Use the
    `align` prop on
    `Flow.Parallel`
    to control how nodes with different widths are aligned. Use
    `"start"`
    (default) to align left, or
    `"end"` to align
    right.

  <ComponentExample demo="FlowParallelAlignEndDemo" />
</ComponentSection>

<!-- Known Issue -->

<ComponentSection>

## Known Issue: Sidebar / Layout Shift

  
Toggling the sidebar shifts the Flow container's viewport position. Because
    connector coordinates are computed from stale `getBoundingClientRect` values
    stored in state (captured before the layout shift), the connector lines jump
    out of alignment until the next remeasure is triggered. Scroll the page
    while the sidebar is open to hit the same bug via the scroll path.

  <ComponentExample demo="FlowSidebarBugDemo" />
</ComponentSection>

<!-- Other Examples -->

<ComponentSection>

## Other Examples

### Nested Node Lists in Parallel

  
Use
    `Flow.List`
    inside
    `Flow.Parallel`
    to create parallel branches where each branch contains a sequence of connected
    nodes.

  <ComponentExample demo="FlowParallelNestedListDemo" />
</ComponentSection>

<!-- Components -->

<ComponentSection>

## Components

### Flow


The root container for flow diagrams. Provides panning and scrolling for large
  diagrams.

<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">orientation</td>
        <td class="px-4 py-3 font-mono">"horizontal" | "vertical"</td>
        <td class="px-4 py-3">Layout direction for the flow</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">align</td>
        <td class="px-4 py-3 font-mono">"start" | "center"</td>
        <td class="px-4 py-3">
          Vertical alignment of nodes. `"start"` (default) aligns to top,
          `"center"` vertically centers nodes.
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">class</td>
        <td class="px-4 py-3 font-mono">string</td>
        <td class="px-4 py-3">Additional CSS classes for the container</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">canvas</td>
        <td class="px-4 py-3 font-mono">boolean</td>
        <td class="px-4 py-3">Enables the scrollable canvas wrapper</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">padding</td>
        <td class="px-4 py-3 font-mono">&#123; x?: number; y?: number &#125;</td>
        <td class="px-4 py-3">Canvas padding in pixels</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">children</td>
        <td class="px-4 py-3 font-mono">Snippet</td>
        <td class="px-4 py-3">Flow.Node and Flow.Parallel components</td>
      </tr>
    </tbody>
  </table>
</div>

### Flow.Node


A single node in the flow diagram. Renders as a styled card with automatic
  connector points. Use `bare` and `class` to customize the element chrome.

<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">disabled</td>
        <td class="px-4 py-3 font-mono">boolean</td>
        <td class="px-4 py-3">
          When true, connectors linking to this node are rendered with reduced
          opacity
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">id</td>
        <td class="px-4 py-3 font-mono">string</td>
        <td class="px-4 py-3">Stable node id used for connector registration</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">children</td>
        <td class="px-4 py-3 font-mono">Snippet</td>
        <td class="px-4 py-3">Content to display inside the node</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">bare</td>
        <td class="px-4 py-3 font-mono">boolean</td>
        <td class="px-4 py-3">Removes the default node card styling</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">class</td>
        <td class="px-4 py-3 font-mono">string</td>
        <td class="px-4 py-3">Additional CSS classes for the node</td>
      </tr>
    </tbody>
  </table>
</div>

### Flow.Anchor


A component that marks a custom attachment point for connectors within a
  Flow.Node. Use this to control exactly where connector lines attach instead of
  the default node center by wrapping the anchor point content.

<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">type</td>
        <td class="px-4 py-3 font-mono">"start" | "end"</td>
        <td class="px-4 py-3">
          Whether this anchor serves as a "start" point (outgoing connectors) or
          "end" point (incoming connectors). When omitted, serves as both.
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">children</td>
        <td class="px-4 py-3 font-mono">Snippet</td>
        <td class="px-4 py-3">Content to render at the anchor point</td>
      </tr>
    </tbody>
  </table>
</div>

### Flow.Parallel


A container for parallel branches. Child Flow.Node components are displayed in
  parallel with junction connectors.

<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">align</td>
        <td class="px-4 py-3 font-mono">"start" | "end"</td>
        <td class="px-4 py-3">
          Controls horizontal alignment of nodes within the parallel group.
          `"start"` (default) aligns left, `"end"` aligns right.
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">children</td>
        <td class="px-4 py-3 font-mono">Snippet</td>
        <td class="px-4 py-3">
          Flow.Node or Flow.List components to display in parallel
        </td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono">class</td>
        <td class="px-4 py-3 font-mono">string</td>
        <td class="px-4 py-3">Additional CSS classes for the parallel group</td>
      </tr>
    </tbody>
  </table>
</div>

### Flow.List

  
A container for a sequence of Flow.Node components with automatic
    connectors between them. Use inside Flow.Parallel to create branches
    with multiple sequential steps.

  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-kumo-hairline">
          <th class="px-4 py-3 text-left font-semibold">Prop</th>
          <th class="px-4 py-3 text-left font-semibold">Type</th>
          <th class="px-4 py-3 text-left font-semibold">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono">children</td>
          <td class="px-4 py-3 font-mono">Snippet</td>
          <td class="px-4 py-3">Flow.Node components to display in sequence</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono">class</td>
          <td class="px-4 py-3 font-mono">string</td>
          <td class="px-4 py-3">Additional CSS classes for the list</td>
        </tr>
      </tbody>
    </table>
  </div>
</ComponentSection>
