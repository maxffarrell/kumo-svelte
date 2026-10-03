---
title: "CLI"
description: "Access component documentation and install blocks from your terminal."
---

<script>
  import Callout from '#lib/docs/Callout.svelte';
  import ComponentExample from '#lib/docs/ComponentExample.svelte';
  import ComponentSection from '#lib/docs/ComponentSection.svelte';
  import CLITerminal from '#lib/docs/CLITerminal.svelte';
  import CodeBlock from '#lib/docs/CodeBlock.svelte';
  import PropsTable from '#lib/docs/PropsTable.svelte';
</script>


## Installation

The Kumo CLI is available via npx. No installation required.

```bash
npx kumo-svelte help
```

## Commands

### Blocks

Install copy-paste blocks into your project for full customization.

```bash
# Initialize kumo.json configuration
npx kumo-svelte init

# List all available blocks
npx kumo-svelte blocks

# Install a block to your project
npx kumo-svelte add PageHeader
```

### Component Registry

Access component documentation directly from your terminal.

```bash
# List all Kumo components with categories
npx kumo-svelte ls

# Get detailed documentation for a component
npx kumo-svelte doc Button

# Get documentation for all components
npx kumo-svelte docs
```

### Migration and AI

Export token rename maps for codebase migrations and print the AI usage guide.

```bash
# Show pending token migrations
npx kumo-svelte migrate

# Show class-level mappings
npx kumo-svelte migrate --classes

# Print the AI component usage guide
npx kumo-svelte ai
```

## Try it out

Type commands in the interactive terminal below to explore the CLI.

<CLITerminal />
