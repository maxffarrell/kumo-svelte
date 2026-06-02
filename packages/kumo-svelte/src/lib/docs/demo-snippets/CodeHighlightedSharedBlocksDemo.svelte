<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';
</script>

<div class="space-y-4">
  <CodeHighlighted code={`const config = { theme: "dark" };`} lang="typescript" />
  <CodeHighlighted code={`npm run build`} lang="bash" />
  <CodeHighlighted code={`{ "success": true }`} lang="json" />
</div>
