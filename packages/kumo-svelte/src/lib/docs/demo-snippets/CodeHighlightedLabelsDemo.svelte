<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte/components/code';
</script>

<CodeHighlighted
  code={`pnpm add kumo-svelte`}
  lang="bash"
  showCopyButton
  labels={{ copy: 'Copy command', copied: 'Copied command' }}
/>
