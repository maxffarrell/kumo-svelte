<script lang="ts">
  import { Check, Copy } from 'phosphor-svelte';
  import { codeToHtml } from 'shiki';

  interface Props {
    code?: string;
    lang?: string;
  }

  let { code = '', lang = 'txt' }: Props = $props();
  let copied = $state(false);

  const languageAliases: Record<string, string> = {
    cjs: 'javascript',
    cts: 'typescript',
    gql: 'graphql',
    js: 'javascript',
    jsx: 'jsx',
    md: 'markdown',
    mjs: 'javascript',
    mts: 'typescript',
    py: 'python',
    sh: 'bash',
    shell: 'bash',
    svelte: 'svelte',
    ts: 'typescript',
    tsx: 'tsx',
    txt: 'text',
    yml: 'yaml',
    zsh: 'bash',
    jsonc: 'jsonc',
  };

  const normalizedCode = $derived(
    code
      .replace(/^\n+|\n+$/g, '')
      .replace(/(<script\b[^>]*>)\n{2,}/g, '$1\n')
      .replace(/\n{2,}(<\/script>)/g, '\n$1')
  );

  const highlightedCode = $derived(
    codeToHtml(normalizedCode, {
      lang: languageAliases[lang] ?? lang,
      themes: {
        light: 'github-light',
        dark: 'vesper'
      },
      defaultColor: false
    }).then((html) =>
      html
        .replace(/\s+tabindex="0"/g, '')
        .replace(/(<\/span>)\n(?=<span class="line")/g, '$1')
    )
  );

  async function copyCode() {
    await navigator.clipboard?.writeText(normalizedCode);
    copied = true;
    setTimeout(() => (copied = false), 1200);
  }
</script>

<div class="not-prose code-block relative">
  {#await highlightedCode}
    <pre class="shiki shiki-themes github-light vesper"><code>{normalizedCode}</code></pre>
  {:then html}
    {@html html}
  {/await}
  <button
    type="button"
    class="code-block-copy-btn"
    class:copied
    data-copied={copied ? '' : undefined}
    aria-label="Copy code to clipboard"
    onclick={copyCode}
  >
    <span class="code-block-copy-btn__icons">
      <span class="code-block-copy-btn__icon code-block-copy-btn__icon--check" aria-hidden="true">
        <Check size={16} />
      </span>
      <span class="code-block-copy-btn__icon code-block-copy-btn__icon--copy" aria-hidden="true">
        <Copy size={16} />
      </span>
    </span>
  </button>
</div>
