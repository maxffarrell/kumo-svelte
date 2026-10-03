<script lang="ts">
  import { Text } from '#lib/components/text/index.js';
  import { cn } from '#lib/utils/cn.js';
  import { markdownToHtml } from './changelog';

  interface Props {
    hash?: string;
    text: string;
  }

  let { hash, text }: Props = $props();

  const GITHUB_COMMIT_URL = 'https://github.com/maxffarrell/kumo-svelte/commit/';
  const html = $derived(markdownToHtml(text));
  const proseStyles = cn(
    'kumo-prose prose prose-sm max-w-none flex-1',
    '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
    '[&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base',
    '[&_:is(h1,h2,h3)]:font-semibold [&_:is(h1,h2,h3)]:text-kumo-default',
    '[&_pre]:overflow-x-auto [&_pre]:text-base'
  );
</script>

<li class="mb-3 flex flex-col gap-1 last:mb-0 md:mb-0 md:flex-row md:items-baseline md:gap-3.5">
  {#if hash}
    <a
      href={`${GITHUB_COMMIT_URL}${hash}`}
      target="_blank"
      rel="noopener noreferrer"
      class="shrink-0 text-xs text-kumo-subtle transition-colors hover:text-kumo-default"
    >
      <Text as="span" variant="mono-secondary">{hash.slice(0, 7)}</Text>
    </a>
  {:else}
    <span class="hidden shrink-0 text-xs text-kumo-subtle md:block">
      <Text as="span" variant="mono-secondary">release</Text>
    </span>
  {/if}
  <div class={proseStyles}>
    {@html html}
  </div>
</li>
