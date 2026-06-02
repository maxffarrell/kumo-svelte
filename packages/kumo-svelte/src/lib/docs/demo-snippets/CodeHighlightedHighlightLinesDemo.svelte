<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';
</script>

<CodeHighlighted
  code={`function processData(items: string[]) {
  // Filter out empty items
  const filtered = items.filter(Boolean);

  // Transform to uppercase (highlighted)
  const transformed = filtered.map((item) => item.toUpperCase());

  // Return sorted result
  return transformed.toSorted();
}`}
  lang="typescript"
  highlightLines={[5, 6]}
/>
