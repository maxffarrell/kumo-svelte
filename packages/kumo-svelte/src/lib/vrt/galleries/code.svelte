<script lang="ts">
  import { Code, CodeBlock, CodeHighlighted } from '$lib/components/code';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const inlineTs = 'const x = 1;';
  const blockTs = 'const sum = (a: number, b: number) => a + b;';
  const bashSnippet = 'npm install kumo-svelte';
  const cssSnippet = '.badge { color: var(--kumo-brand); }';
  const jsoncSnippet = '{ "enabled": true }';
  const highlightSnippet = `function add(a: number, b: number) {
  const total = a + b;
  return total;
}`;
</script>

<Scenario id="inline-default" label="inline code">
  <Code code={inlineTs} lang="ts" />
</Scenario>

<Scenario id="code-block" label="code block">
  <CodeBlock code={blockTs} lang="ts" />
</Scenario>

<Scenario id="highlighted-default" label="highlighted block">
  <CodeHighlighted code={blockTs} lang="typescript" />
</Scenario>

<Scenario id="highlighted-copy" label="with copy button">
  <CodeHighlighted code={bashSnippet} lang="bash" showCopyButton />
</Scenario>

<Scenario id="lang-bash" label="bash">
  <CodeHighlighted code={bashSnippet} lang="bash" />
</Scenario>

<Scenario id="lang-css" label="css">
  <CodeHighlighted code={cssSnippet} lang="css" />
</Scenario>

<Scenario id="lang-jsonc" label="jsonc">
  <CodeHighlighted code={jsoncSnippet} lang="jsonc" />
</Scenario>

<Scenario id="highlight-lines" label="highlighted lines">
  <CodeHighlighted code={highlightSnippet} lang="typescript" highlightLines={[2, 3]} />
</Scenario>

<Scenario id="line-numbers" label="line numbers">
  <CodeHighlighted code={highlightSnippet} lang="typescript" showLineNumbers />
</Scenario>

<Scenario id="copy-hover" label="copy hover" interact={[{ type: 'hover' }]}>
  <CodeHighlighted code={bashSnippet} lang="bash" showCopyButton />
</Scenario>
