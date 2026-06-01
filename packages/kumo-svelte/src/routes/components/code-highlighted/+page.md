---
title: "CodeHighlighted"
description: "Syntax-highlighted code blocks powered by Shiki and styled with Kumo colors."
sourceFile: "components/code-highlighted"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection>
  <ComponentExample demo="CodeHighlightedBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { CodeHighlighted } from 'kumo-svelte';
```

### Granular

```typescript
import { CodeHighlighted } from 'kumo-svelte/components/code-highlighted';
```

</ComponentSection>

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';

  const code = `const status = 'ready';`;
</script>

<CodeHighlighted {code} lang="ts" showCopyButton />
```

</ComponentSection>

<ComponentSection>

## Examples

### TypeScript

<ComponentExample demo="CodeHighlightedBasicDemo" />

### Copy Button

<ComponentExample demo="CodeHighlightedCopyButtonDemo" />

### Language Variants

Use supported Shiki languages for framework, data, shell, and config examples.

<ComponentExample demo="CodeHighlightedLanguageVariantsDemo" />

### Language Aliases

Common aliases such as `js`, `ts`, `md`, and `yml` normalize to the matching highlighter language.

<ComponentExample demo="CodeHighlightedAliasesDemo" />

</ComponentSection>

<ComponentSection>

## API Reference

<PropsTable component="CodeHighlighted" />

</ComponentSection>
