<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte/components/code';

  const svelteCode = `<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte/components/code';

  const code = \`const x = 1;\`;
<` + `/script>

<CodeHighlighted {code} lang="ts" />`;
</script>

<CodeHighlighted
  code={svelteCode}
  lang="svelte"
  showCopyButton
/>
