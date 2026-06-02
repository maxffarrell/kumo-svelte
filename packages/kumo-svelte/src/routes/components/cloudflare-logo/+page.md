---
title: "CloudflareLogo"
description: "Official Cloudflare logo component with glyph and full logo variants."
sourceFile: "components/cloudflare-logo"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="CloudflareLogoBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { CloudflareLogo, PoweredByCloudflare } from 'kumo-svelte';
```

### Granular

```typescript
import { CloudflareLogo, PoweredByCloudflare } from 'kumo-svelte/components/cloudflare-logo';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { CloudflareLogo } from 'kumo-svelte';
</script>

<CloudflareLogo class="w-36" />
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Glyph Only


Use <code>variant="glyph"</code> to display just the cloud icon without the
  wordmark.

<ComponentExample demo="CloudflareLogoGlyphDemo" />

### Color Variants


The logo supports three color schemes: brand colors, black, and white.

<ComponentExample demo="CloudflareLogoColorVariantsDemo" />

### Glyph Color Variants

<ComponentExample demo="CloudflareLogoGlyphVariantsDemo" />

### Sizing


Size the logo using CSS width classes. The height adjusts automatically to
  maintain aspect ratio.

<ComponentExample demo="CloudflareLogoSizesDemo" />

### Brand Assets Menu

  
Combine with DropdownMenu to create a brand assets menu. Use <code>generateCloudflareLogoSvg()</code> to
    get copy-paste ready SVG markup.

  <ComponentExample demo="CloudflareLogoCopyDemo" />
</ComponentSection>

<!-- PoweredByCloudflare -->

<ComponentSection>

## PoweredByCloudflare

  
A pre-built "Powered by Cloudflare" badge component for footers and attribution.


### Basic Usage

<ComponentExample demo="PoweredByCloudflareBasicDemo" />

### Color Variants

<ComponentExample demo="PoweredByCloudflareVariantsDemo" />

### Footer Example

  <ComponentExample demo="PoweredByCloudflareFooterDemo" />
</ComponentSection>

<!-- SVG Generation -->

<ComponentSection>

## SVG Generation

  
Use <code>generateCloudflareLogoSvg()</code> to get copy-paste ready SVG markup for non-React contexts.


```ts
import { generateCloudflareLogoSvg } from "kumo-svelte";

// Generate glyph SVG (cloud only)
const glyphSvg = generateCloudflareLogoSvg({ variant: "glyph" });

// Generate full logo SVG
const fullSvg = generateCloudflareLogoSvg({ variant: "full" });

// Generate black logo
const blackSvg = generateCloudflareLogoSvg({ color: "black" });

// Copy to clipboard
await navigator.clipboard.writeText(
  generateCloudflareLogoSvg({ variant: "glyph", color: "color" }),
);
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  
CloudflareLogo extends <code>SVGSVGElement</code> and accepts all standard SVG attributes.

  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-kumo-hairline">
          <th class="py-3 pr-4 font-medium">Prop</th>
          <th class="py-3 pr-4 font-medium">Type</th>
          <th class="py-3 pr-4 font-medium">Default</th>
          <th class="py-3 font-medium">Description</th>
        </tr>
      </thead>
      <tbody class="text-kumo-subtle">
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4 font-mono text-kumo-default">variant</td>
          <td class="py-3 pr-4 font-mono">"glyph" | "full"</td>
          <td class="py-3 pr-4 font-mono">"full"</td>
          <td class="py-3">Logo variant. <code>glyph</code> shows just the cloud icon, <code>full</code> includes the wordmark.</td>
        </tr>
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4 font-mono text-kumo-default">color</td>
          <td class="py-3 pr-4 font-mono">"color" | "black" | "white"</td>
          <td class="py-3 pr-4 font-mono">"color"</td>
          <td class="py-3">Color scheme. <code>color</code> uses brand colors, <code>black</code> and <code>white</code> are solid.</td>
        </tr>
        <tr>
          <td class="py-3 pr-4 font-mono text-kumo-default">class</td>
          <td class="py-3 pr-4 font-mono">string</td>
          <td class="py-3 pr-4 font-mono">-</td>
          <td class="py-3">CSS classes for sizing (e.g., <code>w-36</code>). Height adjusts automatically.</td>
        </tr>
      </tbody>
    </table>
  </div>

### CloudflareLogo.PoweredByCloudflare

  
Extends <code>HTMLAnchorElement</code> and accepts all standard anchor attributes.

  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-kumo-hairline">
          <th class="py-3 pr-4 font-medium">Prop</th>
          <th class="py-3 pr-4 font-medium">Type</th>
          <th class="py-3 pr-4 font-medium">Default</th>
          <th class="py-3 font-medium">Description</th>
        </tr>
      </thead>
      <tbody class="text-kumo-subtle">
        <tr class="border-b border-kumo-hairline">
          <td class="py-3 pr-4 font-mono text-kumo-default">color</td>
          <td class="py-3 pr-4 font-mono">"color" | "black" | "white"</td>
          <td class="py-3 pr-4 font-mono">"color"</td>
          <td class="py-3">Color scheme for the logo and text.</td>
        </tr>
        <tr>
          <td class="py-3 pr-4 font-mono text-kumo-default">href</td>
          <td class="py-3 pr-4 font-mono">string</td>
          <td class="py-3 pr-4 font-mono">"https://www.cloudflare.com"</td>
          <td class="py-3">Link destination. Opens in a new tab by default.</td>
        </tr>
      </tbody>
    </table>
  </div>
</ComponentSection>
