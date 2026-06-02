<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';
</script>

<CodeHighlighted
  code={`function greet(name: string) {
  // This line is highlighted
  console.log(\`Hello, \${name}!\`);

  return name.toUpperCase();
}`}
  lang="typescript"
  highlightLines={[2, 3]}
  style="--kumo-code-highlight-bg: hsla(220, 80%, 50%, 0.1)"
/>
