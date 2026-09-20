---
title: "Installation"
description: "Get started with Kumo Svelte by installing the package and importing components."
---

<script>
  import Callout from '$lib/docs/Callout.svelte';

  const kumoVersion = typeof __KUMO_VERSION__ !== 'undefined' ? __KUMO_VERSION__ : 'latest';
</script>

## NPM Registry

The `kumo-svelte` package is published to the public npm registry. No special configuration is required for installation.

## Install Package

Install Kumo Svelte with your preferred package manager. The current version is <code>v{kumoVersion}</code>.

#### npm

```bash
npm install kumo-svelte
```

#### pnpm

```bash
pnpm add kumo-svelte
```

#### yarn

```bash
yarn add kumo-svelte
```

#### Peer Dependencies

Kumo Svelte requires Svelte 5. Chart components also expect ECharts when you render charts.

```bash
pnpm add svelte echarts
```

## Import Components

Import styled components from the main package entry point.

```svelte
<script lang="ts">
  import { Button, Input, LayerCard } from 'kumo-svelte';
</script>
```

Import additional components from the same package entry point.

```svelte
<script lang="ts">
  import { Button, Input } from 'kumo-svelte';
</script>
```

## Bits UI Primitives

The Svelte port uses [Bits UI](https://bits-ui.com) for accessible primitives. Prefer Kumo Svelte's styled components when they exist, and reach for Bits UI directly when you need a lower-level primitive that Kumo does not expose yet.

<Callout type="info">
  Kumo Svelte components keep the original Kumo visual language while using Svelte component APIs, snippets, and bindable state where appropriate.
</Callout>

## Import Styles

If your application uses Tailwind CSS, add Kumo Svelte's source files and import the package styles before Tailwind.

```css
/* app.css */
@source "../node_modules/kumo-svelte/dist/**/*.{js,svelte,ts}";
@import "kumo-svelte/styles.css";
@import "tailwindcss";
```

Adjust the `@source` path if your CSS file lives in a different directory.

## Isolate Your App Root

Kumo's floating components (`Select`, `Combobox`, `Dropdown`, `Popover`, `Tooltip`, `Dialog`, and others) render their popups in a portal at the end of `document.body`. Because Kumo does not apply a `z-index` to these popups, a positive `z-index` in your layout can paint above an open popup.

Add `isolation: isolate` to your application root, as [Bits UI recommends](https://bits-ui.com/docs/child-snippet#dealing-with-z-index):

```css
/* The element that wraps your entire app, e.g. #root or #app */
.root {
  isolation: isolate;
}
```

Or with Tailwind:

```svelte
<div id="app" class="isolate">
  <!-- Your app -->
</div>
```

Apply isolation to the element wrapping your app content, not to `<body>`. This creates a separate stacking context for app content so portaled popups remain above positive `z-index` values inside the layout.

<Callout type="info">
  If a Kumo popup appears below your UI, isolate the app root instead of raising the popup's `z-index` or targeting Bits UI's internal data attributes.
</Callout>

## Usage Example

#### CSS File

```css
@source "../node_modules/kumo-svelte/dist/**/*.{js,svelte,ts}";
@import "kumo-svelte/styles.css";
@import "tailwindcss";
```

#### Component File

```svelte
<script lang="ts">
  import { Button, Input, LayerCard } from 'kumo-svelte';
</script>

<LayerCard class="rounded-lg p-6">
  <h1 class="mb-4 text-2xl font-bold">Welcome to Kumo</h1>
  <Input placeholder="Enter your name..." class="mb-4" />
  <Button variant="primary">Submit</Button>
</LayerCard>
```

## Blocks vs Components

Components are versioned package exports such as `Button`, `Input`, and `Dialog`. Blocks are larger compositions that you copy into your project and own.

```bash
npx kumo-svelte init
npx kumo-svelte blocks
npx kumo-svelte add PageHeader
```

After installation, blocks live in your project and can be customized directly.

## Utilities

```svelte
<script lang="ts">
  import { cn } from 'kumo-svelte';

  const classes = cn('base-class', true && 'conditional-class');
</script>
```

### SSR Random Values

When using SSR, call `provideKumoRandom` once from the root layout to keep
randomized Kumo values stable during hydration. This uses one request-scoped
random sequence for Kumo components that need random values. This integration
requires Svelte 5.56.3 or newer.

Enable Svelte's experimental async compiler option in `svelte.config.js`:

```js
export default {
  compilerOptions: {
    experimental: {
      async: true
    }
  }
};
```

```svelte
<script lang="ts">
  import { provideKumoRandom } from 'kumo-svelte';

  provideKumoRandom();
</script>
```

This is optional for client-only applications. Without the provider,
randomized values retain their normal unseeded behavior.
