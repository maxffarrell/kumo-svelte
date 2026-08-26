# Kumo Svelte

Cloudflare's component library for building modern web applications, ported to Svelte.

> This is an independent community package and is not affiliated with, sponsored by, or endorsed by Cloudflare.

The expanded fidelity test coverage was contributed by [axel-rock](https://github.com/axel-rock/kumo-svelte).

Kumo Svelte provides accessible, design-system-compliant UI components built on [Bits UI](https://bits-ui.com/). It handles keyboard navigation, focus management, and ARIA attributes so you can build accessible applications without thinking through every detail.

<img width="2560" height="1456" alt="Kumo UI preview" src="https://github.com/user-attachments/assets/032f5a0e-b686-4440-b1ca-6182379479aa" />

## Installation

```bash
pnpm add kumo-svelte
```

### Peer Dependencies

```bash
pnpm add svelte bits-ui
```

## Usage

```svelte
<script lang="ts">
  import { Button, Input, Dialog } from 'kumo-svelte';
  import 'kumo-svelte/styles.css';
</script>
```

### Granular Imports (Tree-Shaking)

```svelte
<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
</script>
```

### Bits UI Primitives

Kumo Svelte re-exports primitives for advanced use cases:

```svelte
<script lang="ts">
  import { Popover } from 'kumo-svelte/primitives';
</script>
```

## CLI

Kumo Svelte includes the ported Kumo CLI for component discovery, block installation, migration helpers, and AI usage docs.

```bash
npx kumo-svelte help
npx kumo-svelte init
npx kumo-svelte blocks
npx kumo-svelte add PageHeader
npx kumo-svelte ls
npx kumo-svelte doc Button
npx kumo-svelte migrate --classes
npx kumo-svelte ai
```

## Development

This repository contains the Svelte package and MDSX-powered documentation site.

### Quick Start

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

### Creating Components

Port components file-by-file from [cloudflare/kumo](https://github.com/cloudflare/kumo), preserving the original Tailwind classes and Kumo semantic color tokens. Framework differences should be limited to Svelte snippets, bindings, events, Bits UI primitive APIs, and the Svelte-orange logo treatment in the top-left site mark.

## Documentation

- **Original Live Docs**: [kumo-ui.com](https://kumo-ui.com)
- **Original Source**: [cloudflare/kumo](https://github.com/cloudflare/kumo)

## Contributors

- [Teddy (@uhteddy)](https://github.com/uhteddy) contributed the Bits UI primitive integration, keyboard-navigation tests, and prop documentation for the Combobox and Autocomplete components.

## License

MIT
