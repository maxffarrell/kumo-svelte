<script module>
  export {};
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import { GithubLogoIcon } from 'phosphor-svelte';
  import BaseUIIcon from './BaseUIIcon.svelte';
  import CopyPageButton from './CopyPageButton.svelte';
  import StickyDocHeader from './StickyDocHeader.svelte';
  import TableOfContents from './TableOfContents.svelte';

  interface Props {
    metadata?: Record<string, unknown>;
    children?: Snippet;
  }

  let { metadata = {}, children }: Props = $props();

  const title = $derived(typeof metadata.title === 'string' ? metadata.title : undefined);
  const description = $derived(
    typeof metadata.description === 'string' ? metadata.description : undefined
  );
  const sourceFile = $derived(
    typeof metadata.sourceFile === 'string' ? metadata.sourceFile : undefined
  );
  const wideContent = $derived(metadata.contentLayout === 'wide');
  const bitsUIComponent = $derived(
    typeof metadata.bitsUIComponent === 'string'
      ? metadata.bitsUIComponent
      : typeof metadata.baseUIComponent === 'string'
        ? metadata.baseUIComponent
        : undefined
  );
  const pageTitle = $derived(title ?? 'Kumo');
  const pageDescription = $derived(description ?? 'Kumo - a modern component library');
  const tocHeadings = $derived(
    Array.isArray(metadata.headings)
      ? metadata.headings.filter(
          (heading): heading is { depth: number; slug: string; text: string } =>
            typeof heading === 'object' &&
            heading !== null &&
            typeof heading.depth === 'number' &&
            typeof heading.slug === 'string' &&
            typeof heading.text === 'string'
        )
      : []
  );
  const bitsUIUrl = $derived(
    bitsUIComponent ? `https://bits-ui.com/docs/components/${bitsUIComponent}` : null
  );
  const githubSourceUrl = $derived(
    sourceFile
      ? (() => {
          const repo = 'https://github.com/maxffarrell/kumo-svelte';
          const sourceMap: Record<string, string> = {
            'components/dropdown': 'components/dropdown-menu',
            'components/menubar': 'components/menu-bar',
            'components/toast': 'components/toasty',
            'components/chart/Color.ts': 'components/chart/Color.ts',
            'primitives/skeleton-line': 'components/loader'
          };
          const sourcePath = sourceMap[sourceFile] ?? sourceFile;
          if (sourcePath.startsWith('blocks/')) return `${repo}/tree/main/src/${sourcePath}`;
          if (/\.\w+$/.test(sourceFile)) return `${repo}/blob/main/src/lib/${sourcePath}`;
          return `${repo}/tree/main/src/lib/${sourcePath}`;
        })()
      : null
  );

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function enhanceHeadingAnchors() {
    const content = document.querySelector('.kumo-prose');
    if (!content) return;

    const usedSlugs: string[] = [];

    for (const heading of Array.from(content.querySelectorAll('h2, h3, h4')).filter((element) => !element.closest('.not-prose'))) {
      const text = heading.textContent?.trim() ?? '';
      if (!text) continue;

      let slug = heading.id || slugify(text) || 'section';
      const baseSlug = slug;
      let index = 2;

      while (usedSlugs.includes(slug)) {
        slug = `${baseSlug}-${index}`;
        index += 1;
      }

      usedSlugs.push(slug);
      heading.id = slug;
      heading.classList.add('group', 'relative', 'scroll-mt-24', 'tracking-tight');

      if (heading.querySelector(':scope > a[href^="#"]')) continue;

      const anchor = document.createElement('a');
      anchor.href = `#${slug}`;
      anchor.className = 'no-underline hover:underline';
      anchor.setAttribute('aria-label', `Link to section: ${text}`);

      const icon = document.createElement('span');
      icon.className =
        'heading-anchor-icon absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="size-4 text-kumo-subtle"><path d="M165.66,90.34a8,8,0,0,1,0,11.32l-64,64a8,8,0,0,1-11.32-11.32l64-64A8,8,0,0,1,165.66,90.34ZM209.94,46.06a48,48,0,0,0-67.88,0L112,76.12a8,8,0,0,0,11.31,11.31l30.07-30.06a32,32,0,0,1,45.25,45.25l-30.06,30.07A8,8,0,0,0,179.88,144l30.06-30.06A48,48,0,0,0,209.94,46.06ZM132.69,168.57l-30.07,30.06a32,32,0,0,1-45.25-45.25l30.06-30.07A8,8,0,0,0,76.12,112L46.06,142.06a48,48,0,0,0,67.88,67.88L144,179.88a8,8,0,0,0-11.31-11.31Z"></path></svg>';

      anchor.append(icon, ...Array.from(heading.childNodes));
      heading.append(anchor);
    }
  }

  onMount(enhanceHeadingAnchors);
</script>

<svelte:head>
  <title>{pageTitle} - Kumo Svelte</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="flex flex-col">
  <StickyDocHeader title={pageTitle} {githubSourceUrl} {bitsUIUrl} />

  <div id="page-header" class="border-b border-kumo-hairline md:pr-12">
    <div class="mx-auto md:border-r md:border-kumo-hairline">
      <div class="mx-auto max-w-7xl p-12">
        <div class="mb-3 md:hidden">
          <CopyPageButton align="center" />
        </div>
        <div class="mb-3 flex items-center gap-3">
          <h1 class="text-4xl font-bold tracking-tight text-kumo-default">{pageTitle}</h1>
          {#if githubSourceUrl}
            <a
              href={githubSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-kumo-subtle transition-colors hover:text-kumo-strong"
              title="View source on GitHub"
              aria-label="View source on GitHub"
            >
              <GithubLogoIcon size={28} weight="fill" />
            </a>
          {/if}
          {#if bitsUIUrl}
            <a
              href={bitsUIUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-kumo-subtle transition-colors hover:text-kumo-strong"
              title="View Bits UI documentation"
              aria-label="View Bits UI documentation"
            >
              <BaseUIIcon size={28} />
            </a>
          {/if}
          <div class="hidden md:ml-auto md:block">
            <CopyPageButton />
          </div>
        </div>
        <p class="text-lg text-kumo-strong">{pageDescription}</p>
      </div>
    </div>
  </div>

  <main class="flex grow flex-col md:pr-12">
    <div class="mx-auto w-full grow md:border-r md:border-kumo-hairline">
      <div
        class={wideContent
          ? 'hidden'
          : 'sticky top-24 z-1 border-b border-kumo-hairline bg-kumo-canvas xl:hidden md:top-12'}
      >
        <div class="mx-auto max-w-7xl px-2 py-3 md:px-3">
          <TableOfContents layout="select" headings={tocHeadings} />
        </div>
      </div>

      <div class="mx-auto max-w-7xl p-12 pr-10">
        <div class={wideContent ? 'grid grid-cols-1' : 'grid grid-cols-1 gap-16 xl:grid-cols-[3fr_1fr]'}>
          <div class="kumo-prose prose min-w-0 max-w-none">
            {@render children?.()}
          </div>
          {#if !wideContent}
            <aside class="hidden min-w-0 xl:block">
              <div class="sticky top-24">
                <TableOfContents headings={tocHeadings} />
              </div>
            </aside>
          {/if}
        </div>
      </div>
    </div>
  </main>
</div>
