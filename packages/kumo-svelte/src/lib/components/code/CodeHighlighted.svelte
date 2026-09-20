<script lang="ts" module>
  export const KUMO_CODE_HIGHLIGHTED_STYLING = {
    themes: {
      light: 'github-light',
      dark: 'vesper'
    },
    baseTokens: ['bg-kumo-base', 'border-kumo-fill'],
    container: {
      borderRadius: 'rounded-md'
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

  export type CodeHighlightedVariant = 'default' | 'plain';
</script>

<script lang="ts">
  import { Button } from '$lib/components/button';
  import { cn } from '$lib/utils/cn';
  import { highlightCode } from '$lib/utils/highlight-code';

  interface Props {
    code: string;
    variant?: CodeHighlightedVariant;
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
    variant = 'default',
    class: className,
    highlightLines = [],
    lang = 'typescript',
    labels = {},
    showCopyButton = false,
    showLineNumbers = false,
    style,
    ...rest
  }: Props = $props();

  let copied = $state(false);
  const normalizedCode = $derived(
    code
      .replace(/^\n+|\n+$/g, '')
      .replace(/(<script\b[^>]*>)\n{2,}/g, '$1\n')
      .replace(/\n{2,}(<\/script>)/g, '\n$1')
  );
  const highlightLineSet = $derived(new Set(highlightLines));
  const lineCount = $derived(normalizedCode.split('\n').length);
  const isSingleLine = $derived(lineCount === 1);
  const fallbackCodeClasses = $derived(cn(
    'm-0 min-w-0 flex-1 overflow-x-auto font-mono text-sm leading-relaxed text-kumo-subtle',
    variant === 'plain' ? 'p-0' : 'p-4'
  ));
  const highlightedCodeClasses = $derived(cn(
    'kumo-shiki [&_code]:!m-0 [&_code]:!border-0 [&_code]:!bg-transparent [&_code]:!p-0 [&>pre]:!m-0 [&>pre]:!rounded-none [&>pre]:!border-0 [&>pre]:!bg-transparent [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed',
    variant === 'plain' ? '[&>pre]:!p-0 [&_.line-highlighted]:!m-0 [&_.line-highlighted]:!w-full [&_.line-highlighted]:!px-0' : '[&>pre]:!p-4'
  ));

  function decorateHighlightedLines(html: string) {
    let lineNumber = 0;

    return html.replace(/<span class="line">/g, () => {
      lineNumber += 1;
      return `<span class="line${highlightLineSet.has(lineNumber) ? ' line-highlighted' : ''}">`;
    });
  }

  const highlightedCode = $derived(
    highlightCode(normalizedCode, lang).then((html) =>
      decorateHighlightedLines(html)
        .replace(/\s+tabindex="0"/g, '')
        .replace(/(<\/span>)\n(?=<span class="line")/g, '$1')
    )
  );

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(normalizedCode);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (error) {
      console.error('[Kumo CodeHighlighted] Failed to copy to clipboard:', error);
    }
  }
</script>

{#snippet copyButton()}
  {#if showCopyButton}
    <div
      class={cn(
        isSingleLine ? 'shrink-0 px-2' : variant === 'plain' ? 'absolute top-0 right-0' : 'absolute top-2 right-2',
        !copied && 'opacity-0 transition-opacity group-hover:opacity-100'
      )}
    >
      <Button
        variant="secondary"
        size="sm"
        aria-label={copied ? (labels.copied ?? 'Copied!') : (labels.copy ?? 'Copy')}
        onclick={copyCode}
      >
        {copied ? (labels.copied ?? 'Copied!') : (labels.copy ?? 'Copy')}
      </Button>
    </div>
  {/if}
{/snippet}

{#snippet lineNumbers()}
  {#if showLineNumbers && !isSingleLine}
    <div
      class={cn('kumo-line-numbers shrink-0 pr-4 text-right font-mono text-sm opacity-40 select-none', variant === 'plain' ? 'py-0' : 'py-4')}
      aria-hidden="true"
    >
      {#each Array(lineCount) as _, index}
        <div class="leading-relaxed">{index + 1}</div>
      {/each}
    </div>
  {/if}
{/snippet}

<div
  class={cn(
    'not-prose group relative m-0 w-full min-w-0 p-0',
    variant === 'plain' ? 'rounded-none border-0 bg-transparent' : 'rounded-md border border-kumo-fill bg-kumo-base',
    showCopyButton && isSingleLine && 'flex items-center',
    className
  )}
  {style}
  {...rest}
>
  {#await highlightedCode}
    {#if showLineNumbers && !isSingleLine}
      <div class="flex w-full">
        {@render lineNumbers()}
        <pre class={fallbackCodeClasses}><code class="m-0 bg-transparent p-0">{normalizedCode}</code></pre>
      </div>
    {:else}
      <pre class={fallbackCodeClasses}><code class="m-0 bg-transparent p-0">{normalizedCode}</code></pre>
    {/if}
  {:then html}
    {#if showLineNumbers && !isSingleLine}
      <div class="flex w-full">
        {@render lineNumbers()}
        <div class="min-w-0 flex-1 overflow-x-auto">
          <div class={highlightedCodeClasses}>
            {@html html}
          </div>
        </div>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <div class={highlightedCodeClasses}>
          {@html html}
        </div>
      </div>
    {/if}
  {/await}
  {@render copyButton()}
</div>
