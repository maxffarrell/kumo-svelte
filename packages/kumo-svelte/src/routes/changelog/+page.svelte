<script lang="ts">
  import { onMount } from 'svelte';
  import GithubLogoIcon from 'phosphor-svelte/lib/GithubLogoIcon';
  import LinkSimple from 'phosphor-svelte/lib/LinkSimple';
  import { Badge, type BadgeVariant } from '$lib/components/badge';
  import { Text } from '$lib/components/text';
  import ChangelogEntry from '$lib/docs/ChangelogEntry.svelte';
  import ChangelogPagination from '$lib/docs/ChangelogPagination.svelte';
  import CopyPageButton from '$lib/docs/CopyPageButton.svelte';
  import StickyDocHeader from '$lib/docs/StickyDocHeader.svelte';
  import type { ChangelogBump, ChangelogVersion } from '$lib/docs/changelog';

  interface Props {
    data: {
      page: number;
      perPage: number;
      totalPages: number;
      totalVersions: number;
      versions: ChangelogVersion[];
    };
  }

  let { data }: Props = $props();

  const badgeConfig: Record<ChangelogBump, { variant: BadgeVariant; label: string }> = {
    major: { variant: 'primary', label: 'Major' },
    minor: { variant: 'secondary', label: 'Minor' },
    patch: { variant: 'outline', label: 'Patch' }
  };

  const sectionLabels: Record<ChangelogBump, string> = {
    major: 'Major changes',
    minor: 'Minor changes',
    patch: 'Patch changes'
  };

  const GITHUB_RELEASE_URL = 'https://github.com/maxffarrell/kumo-svelte/releases/tag/kumo-svelte%40';

  onMount(() => {
    if (!window.location.hash) return;
    document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' });
  });
</script>

<svelte:head>
  <title>Changelog - Kumo Svelte</title>
  <meta name="description" content="Latest updates and features. See what changed in each release." />
</svelte:head>

<div class="flex flex-col">
  <StickyDocHeader title="Changelog" />

  <div id="page-header" class="border-b border-kumo-hairline md:pr-12">
    <div class="mx-auto md:border-r md:border-kumo-hairline">
      <div class="mx-auto max-w-7xl p-12">
        <div class="mb-3 md:hidden">
          <CopyPageButton align="center" />
        </div>
        <div class="mb-3 flex items-center gap-3">
          <h1 class="text-4xl font-bold tracking-tight text-kumo-default">Changelog</h1>
          <div class="hidden md:ml-auto md:block">
            <CopyPageButton />
          </div>
        </div>
        <p class="text-lg text-kumo-strong">Latest updates and features. See what changed in each release.</p>
      </div>
    </div>
  </div>

  <main class="flex grow flex-col md:pr-12">
    <div class="mx-auto w-full grow md:border-r md:border-kumo-hairline">
      <div class="mx-auto max-w-7xl p-12 pr-10">
        <div class="grid grid-cols-1 gap-16 xl:grid-cols-[3fr_1fr]">
          <div class="min-w-0 space-y-6">
            {#each data.versions as version, index (version.version)}
              <article id={`v${version.version}`} class="scroll-mt-24">
                <div class="group relative mb-4 flex flex-wrap items-center gap-3">
                  <a href={`#v${version.version}`} class="no-underline hover:underline">
                    <span
                      class="absolute top-1/2 -left-6 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <LinkSimple class="size-4 text-kumo-subtle" />
                    </span>
                    <Text as="span" variant="heading" size="lg">{version.version}</Text>
                  </a>
                  <Badge variant={badgeConfig[version.bump].variant}>{badgeConfig[version.bump].label}</Badge>
                  <a
                    href={`${GITHUB_RELEASE_URL}${version.version}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="ml-auto text-kumo-subtle transition-colors hover:text-kumo-strong"
                    title="View release on GitHub"
                    aria-label={`View ${version.version} release on GitHub`}
                  >
                    <GithubLogoIcon size={18} weight="fill" />
                  </a>
                </div>

                <div class="space-y-4">
                  {#each version.sections as section (section.type)}
                    <div>
                      <div class="mb-2.5 [&>h3]:m-0">
                        <Text as="h3" bold>{sectionLabels[section.type]}</Text>
                      </div>
                      <ul class="mt-0 mb-0 list-none p-0 md:[&>li]:ml-4 [&>li]:ps-0">
                        {#each section.entries as entry, entryIndex (`${entry.hash ?? 'entry'}-${entryIndex}`)}
                          <ChangelogEntry hash={entry.hash} text={entry.text} />
                        {/each}
                      </ul>
                    </div>
                  {/each}
                </div>

                {#if index < data.versions.length - 1}
                  <div class="mt-6 border-b border-kumo-hairline"></div>
                {/if}
              </article>
            {/each}

            {#if data.totalPages > 1}
              <div class="mt-8">
                <ChangelogPagination
                  page={data.page}
                  perPage={data.perPage}
                  totalCount={data.totalVersions}
                />
              </div>
            {/if}
          </div>
          <aside class="hidden min-w-0 xl:block"></aside>
        </div>
      </div>
    </div>
  </main>
</div>
