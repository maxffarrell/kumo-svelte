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

CodeHighlighted is available from the main package and from the granular code-highlighted entry point.

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

## Overview

A Shiki-powered syntax highlighter. Supports common languages with TextMate grammars, dual light/dark themes, and Kumo-styled copy controls.

</ComponentSection>

<ComponentSection>

## Examples

### Languages

CodeHighlighted supports common Shiki languages. Only use the languages you need.

#### Basic

<ComponentExample demo="CodeHighlightedBasicDemo" />

#### TypeScript, Svelte, Bash, JSON, and CSS

<ComponentExample demo="CodeHighlightedLanguageVariantsDemo" />

### Copy Button

Add a copy-to-clipboard button with `showCopyButton`.

<ComponentExample demo="CodeHighlightedCopyButtonDemo" />

### Highlight Lines

Emphasize specific lines with `highlightLines`. Line numbers are 1-indexed.

<ComponentExample demo="CodeHighlightedHighlightLinesDemo" />

### Custom Highlight Color

Customize the highlight color with the `--kumo-code-highlight-bg` CSS variable.

<ComponentExample demo="CodeHighlightedCustomHighlightColorDemo" />

### Line Numbers

Display line numbers with `showLineNumbers`.

<ComponentExample demo="CodeHighlightedLineNumbersDemo" />

### Full Featured

Combine line numbers, highlighted lines, and a copy button for a complete code display.

<ComponentExample demo="CodeHighlightedFullFeaturedDemo" />

### Shared Blocks

Render multiple code blocks together for related snippets.

<ComponentExample demo="CodeHighlightedSharedBlocksDemo" />

### Internationalization

Customize copy button labels with the `labels` prop.

<ComponentExample demo="CodeHighlightedLabelsDemo" />

### Svelte Example

<ComponentExample demo="CodeHighlightedAliasesDemo" />

</ComponentSection>

<ComponentSection>

## Themes

CodeHighlighted uses fixed themes for visual consistency across Kumo Svelte applications:

- Light mode: `github-light`
- Dark mode: `vesper`

</ComponentSection>

<ComponentSection>

## Bundle Size

Shiki is used only by CodeHighlighted and docs code blocks. Applications that do not render CodeHighlighted avoid the syntax-highlighting work for this component.

</ComponentSection>

<ComponentSection>

## Migration from Code and CodeBlock

Use CodeHighlighted for syntax-highlighted blocks. Keep `Code` for inline code and simple text snippets.

```svelte
<!-- Before -->
<CodeBlock code="const x = 1;" lang="ts" />

<!-- After -->
<CodeHighlighted code="const x = 1;" lang="ts" />
```

</ComponentSection>

<ComponentSection>

## API Reference

<PropsTable component="CodeHighlighted" />

</ComponentSection>
