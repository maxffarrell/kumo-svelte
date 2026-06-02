<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';

  const svelteCode = `<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';

  const code = \`const x = 1;\`;
<` + `/script>

<CodeHighlighted {code} lang="ts" />`;
</script>

<CodeHighlighted
  code={svelteCode}
  lang="svelte"
  showCopyButton
/>
