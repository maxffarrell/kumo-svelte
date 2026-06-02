<script lang="ts" module>
  export const KUMO_CODE_HIGHLIGHTED_STYLING = {
    themes: {
      light: 'github-light',
      dark: 'vesper'
    },
    baseTokens: ['bg-kumo-code', 'border-kumo-hairline'],
    container: {
      borderRadius: 'rounded-lg',
      overflow: 'overflow-hidden'
    }
  } as const;

  export type CodeHighlightedLang =
    | 'bash'
    | 'css'
    | 'diff'
    | 'graphql'
    | 'hcl'
    | 'html'
    | 'javascript'
    | 'jsx'
    | 'json'
    | 'jsonc'
    | 'markdown'
    | 'python'
    | 'sql'
    | 'svelte'
    | 'toml'
    | 'ts'
    | 'typescript'
    | 'tsx'
    | 'yaml';
</script>

<script lang="ts">
  import { Check, Copy } from 'phosphor-svelte';
  import { codeToHtml } from 'shiki';
  import { cn } from '$lib/utils/cn';

  interface Props {
    code: string;
    lang?: CodeHighlightedLang;
    highlightLines?: number[];
    labels?: {
      copy?: string;
      copied?: string;
    };
    showCopyButton?: boolean;
    showLineNumbers?: boolean;
    class?: string;
    style?: string;
    [key: string]: unknown;
  }

  let {
    code,
    class: className,
    highlightLines = [],
    lang = 'typescript',
    labels = {},
    showCopyButton = false,
    showLineNumbers = false,
    style,
    ...rest
  }: Props = $props();

  const languageAliases: Record<string, string> = {
    cjs: 'javascript',
    cts: 'typescript',
    gql: 'graphql',
    js: 'javascript',
    md: 'markdown',
    mjs: 'javascript',
    mts: 'typescript',
    py: 'python',
    sh: 'bash',
    shell: 'bash',
    ts: 'typescript',
    yml: 'yaml',
    zsh: 'bash'
  };

  let copied = $state(false);
  const normalizedCode = $derived(
    code
      .replace(/^\n+|\n+$/g, '')
      .replace(/(<script\b[^>]*>)\n{2,}/g, '$1\n')
      .replace(/\n{2,}(<\/script>)/g, '\n$1')
  );
  const highlightLineSet = $derived(new Set(highlightLines));

  function decorateHighlightedLines(html: string) {
    let lineNumber = 0;

    return html.replace(/<span class="line">/g, () => {
      lineNumber += 1;
      return `<span class="line${highlightLineSet.has(lineNumber) ? ' line-highlighted' : ''}" data-line="${lineNumber}">`;
    });
  }

  const highlightedCode = $derived(
    codeToHtml(normalizedCode, {
      lang: languageAliases[lang] ?? lang,
      themes: KUMO_CODE_HIGHLIGHTED_STYLING.themes,
      defaultColor: false
    }).then((html) =>
      decorateHighlightedLines(html)
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

<div
  class={cn(
    'not-prose group relative m-0 w-full min-w-0 rounded-md border border-kumo-fill bg-kumo-base p-0',
    showLineNumbers && 'kumo-shiki-line-numbers',
    className
  )}
  {style}
  {...rest}
>
  {#await highlightedCode}
    <pre class="m-0 min-w-0 flex-1 overflow-x-auto p-4 font-mono text-sm leading-relaxed text-kumo-subtle"><code class="m-0 bg-transparent p-0">{normalizedCode}</code></pre>
  {:then html}
    <div class="overflow-x-auto">
      <div class="kumo-shiki">
        {@html html}
      </div>
    </div>
  {/await}
  {#if showCopyButton}
    <button
      type="button"
      class="code-block-copy-btn"
      class:copied
      data-copied={copied ? '' : undefined}
      aria-label={copied ? (labels.copied ?? 'Copied!') : (labels.copy ?? 'Copy code to clipboard')}
      title={copied ? (labels.copied ?? 'Copied!') : (labels.copy ?? 'Copy')}
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
  {/if}
</div>
