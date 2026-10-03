---
title: "Component Registry"
description: "AI-readable component metadata for LLMs and code generation tools. Auto-generated from TypeScript types and component variants."
---

<script>
  import Callout from '#lib/docs/Callout.svelte';
  import ComponentExample from '#lib/docs/ComponentExample.svelte';
  import ComponentSection from '#lib/docs/ComponentSection.svelte';
  import ComponentRegistryView from '#lib/docs/ComponentRegistryView.svelte';
  import CodeBlock from '#lib/docs/CodeBlock.svelte';
  import PropsTable from '#lib/docs/PropsTable.svelte';
</script>


## Overview

The component registry is a machine-readable JSON file that describes all Kumo components, their props, variants, examples, and semantic tokens. It's designed for AI agents, code generators, and other tooling.

[View JSON API](/api/component-registry)

## Accessing the Registry

### Via CLI

```bash
# List all components
npx kumo-svelte ls

# Get docs for a specific component
npx kumo-svelte doc Button
```

### Via HTTP API

```bash
# JSON endpoint
curl https://kumo-ui.com/api/component-registry
```

### Via jq (Local)

```bash
# Get Button props
jq '.components.Button.props' packages/kumo/ai/component-registry.json

# List components by category
jq '.search.byCategory' packages/kumo/ai/component-registry.json
```

## Registry Contents

<Callout type="info">
  The registry includes: component props with types and defaults, variant
  options with descriptions, real code examples from stories, semantic color
  tokens used, and sub-components for compound patterns.

</Callout>

<ComponentRegistryView />
