---
title: "Link"
description: "A styled anchor component for inline text links with multiple variants and composition support."
sourceFile: "components/link"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="LinkBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Link, LinkExternalIcon } from 'kumo-svelte';
```

### Granular

```typescript
import { Link, LinkExternalIcon } from 'kumo-svelte/components/link';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

### Basic Link

The default Link component renders an underlined anchor with primary color styling.

```svelte
<script lang="ts">
import { Link } from 'kumo-svelte';
</script>

<p>
  Read our <Link href="/docs">documentation</Link> for more details.
</p>
```

### External Links

Use `LinkExternalIcon` to indicate links that open in a new tab.

```svelte
<script lang="ts">
import { Link, LinkExternalIcon } from 'kumo-svelte';
</script>

<Link
  href="https://cloudflare.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Visit Cloudflare <LinkExternalIcon />
</Link>
```

### SvelteKit Links

SvelteKit uses native anchors for client-side navigation, so pass destinations
with `href`.

```svelte
<script lang="ts">
import { Link } from 'kumo-svelte';
</script>

<Link href="/dashboard" variant="inline">Dashboard</Link>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Inline in Paragraph

Links flow naturally within paragraph text with proper underline offset.

<ComponentExample demo="LinkInParagraphDemo" />

### External Link with Icon

Use `LinkExternalIcon` to visually indicate links that navigate away from your site.

<ComponentExample demo="LinkExternalDemo" />

### Current Variant (Color Inheritance)

The `current` variant inherits color from its parent, useful for links within
colored contexts like alerts.

<ComponentExample demo="LinkCurrentVariantDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Link Props

Extends all native anchor element attributes.

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Default</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">variant</td>
        <td class="px-4 py-3 font-mono text-xs">KumoLinkVariant</td>
        <td class="px-4 py-3 font-mono text-xs">"inline"</td>
        <td class="px-4 py-3 text-xs">Visual style variant</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">href</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Link destination URL.</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">to</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Deprecated. Use `href` instead.</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">class</td>
        <td class="px-4 py-3 font-mono text-xs">string</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Additional CSS classes</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">children</td>
        <td class="px-4 py-3 font-mono text-xs">Snippet</td>
        <td class="px-4 py-3 font-mono text-xs">-</td>
        <td class="px-4 py-3 text-xs">Link content</td>
      </tr>
    </tbody>
  </table>
</div>

### Variants

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Variant</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
        <th class="px-4 py-3 text-left font-semibold">Use Case</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">inline</td>
        <td class="px-4 py-3 text-xs">Primary color with underline</td>
        <td class="px-4 py-3 text-xs">Default for inline text links</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">current</td>
        <td class="px-4 py-3 text-xs">Inherits parent text color with underline</td>
        <td class="px-4 py-3 text-xs">Links within colored contexts (alerts, errors)</td>
      </tr>
      <tr class="border-b border-kumo-hairline">
        <td class="px-4 py-3 font-mono text-xs">plain</td>
        <td class="px-4 py-3 text-xs">Primary color without underline</td>
        <td class="px-4 py-3 text-xs">Navigation links, menus, footers</td>
      </tr>
    </tbody>
  </table>
</div>

### Link.ExternalIcon

SVG icon component to indicate external links. Accepts SVG element attributes.

```svelte
<script lang="ts">
  import { Link, LinkExternalIcon } from 'kumo-svelte';
</script>

<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site <LinkExternalIcon />
</Link>
```

</ComponentSection>

<!-- Design Guidelines -->

<ComponentSection>

## Design Guidelines

<div class="space-y-4 text-sm">
  <div>

    ### When to Use Each Variant

    <ul class="ml-4 list-disc space-y-1">
      <li><strong>inline</strong>: Default choice for links within body text</li>
      <li><strong>current</strong>: Links inside alerts, banners, or other colored containers</li>
      <li><strong>plain</strong>: Navigation menus, footers, or where underlines are distracting</li>
    </ul>
  </div>
  <div>

    ### External Link Indicators

    <ul class="ml-4 list-disc space-y-1">
      <li>Always use `LinkExternalIcon` for links that open in new tabs</li>
      <li>Set `target="_blank"` and `rel="noopener noreferrer"` for security</li>
      <li>The icon provides a visual cue that users will leave the current site</li>
    </ul>
  </div>
  <div>

    ### Framework Integration

    <ul class="ml-4 list-disc space-y-1">
      <li>Use `href` for SvelteKit navigation.</li>
      <li>The `to` prop is deprecated; use `href` for all link destinations.</li>
    </ul>
  </div>
  <div>

    ### Accessibility

    <ul class="ml-4 list-disc space-y-1">
      <li>Links are keyboard focusable by default</li>
      <li>The external icon has `aria-hidden="true"`; add descriptive text for screen readers</li>
      <li>Ensure sufficient color contrast for all variants</li>
      <li>Use descriptive link text (avoid "click here")</li>
    </ul>
  </div>
</div>

</ComponentSection>
