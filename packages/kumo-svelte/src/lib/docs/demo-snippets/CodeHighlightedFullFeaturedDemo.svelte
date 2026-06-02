<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';

  const svelteCode = `<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';

  interface Props {
    code: string;
    language?: 'svelte' | 'typescript' | 'bash' | 'json';
  }

  let { code, language = 'typescript' }: Props = $props();
<` + `/script>

<CodeHighlighted
  {code}
  lang={language}
  showCopyButton
  showLineNumbers
  highlightLines={[10, 11, 12, 13, 14]}
/>`;
</script>

<CodeHighlighted
  code={svelteCode}
  lang="svelte"
  showCopyButton
  showLineNumbers
  highlightLines={[10, 11, 12, 13, 14]}
/>
