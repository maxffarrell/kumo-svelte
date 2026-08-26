<script lang="ts">
  import { onMount } from 'svelte';
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import { cn } from '$lib/utils/cn';

  export interface TocHeading {
    depth: number;
    slug: string;
    text: string;
  }

  interface HeadingGroup {
    h2: TocHeading;
    h3s: TocHeading[];
  }

  interface Props {
    headings?: TocHeading[];
    layout?: 'sidebar' | 'select';
  }

  let { headings: headingsProp = [], layout = 'sidebar' }: Props = $props();
  let activeId = $state('');
  const headings = $derived(headingsProp.filter((heading) => heading.depth <= 3));
  let suppressObserver = false;
  let suppressTimer: ReturnType<typeof setTimeout> | undefined;

  const ITEM_BASE =
    'block w-full truncate border-l-2 border-transparent py-0.5 pl-4 text-left text-sm no-underline';
  const ITEM_DEFAULT =
    'text-kumo-subtle hover:border-kumo-line hover:text-kumo-default hover:font-medium';
  const ITEM_ACTIVE = 'border-kumo-brand font-medium text-kumo-default';

  function groupHeadings(items: TocHeading[]): HeadingGroup[] {
    const groups: HeadingGroup[] = [];
    for (const heading of items) {
      if (heading.depth === 2) {
        groups.push({ h2: heading, h3s: [] });
      } else if (heading.depth === 3 && groups.length > 0) {
        groups[groups.length - 1].h3s.push(heading);
      }
    }
    return groups;
  }

  function jumpTo(slug: string) {
    activeId = slug;
    suppressObserver = true;
    clearTimeout(suppressTimer);
    suppressTimer = setTimeout(() => {
      suppressObserver = false;
    }, 1000);
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' });
  }

  onMount(() => {
    let observer: IntersectionObserver | undefined;
    const initialize = () => {
      activeId = headings[0]?.slug ?? '';

      const elements = headings
        .map((heading) => document.getElementById(heading.slug))
        .filter((element): element is HTMLElement => element !== null);

      if (elements.length === 0) return;

      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          if (suppressObserver) return;

          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop
            );

          if (visible.length > 0) {
            activeId = visible[0].target.id;
            return;
          }

          const first = document.getElementById(headings[0]?.slug);
          const last = document.getElementById(headings.at(-1)?.slug ?? '');

          if (first && window.scrollY < first.offsetTop) {
            activeId = headings[0]?.slug ?? '';
          } else if (last && window.scrollY >= last.offsetTop) {
            activeId = headings.at(-1)?.slug ?? '';
          }
        },
        { rootMargin: '-10% 0px -70% 0px', threshold: [0, 1] }
      );

      for (const element of elements) observer.observe(element);
    };

    initialize();

    return () => {
      clearTimeout(suppressTimer);
      observer?.disconnect();
    };
  });

  const groups = $derived(groupHeadings(headings));
</script>

{#if headings.length > 0}
  {#if layout === 'select'}
    <nav aria-label="Table of contents" class="relative">
      <select
        aria-label="Jump to section"
        value={activeId}
        class="w-full appearance-none rounded-lg border border-kumo-hairline bg-kumo-base px-4 py-2.5 pr-10 text-sm text-kumo-default"
        onchange={(event) => jumpTo(event.currentTarget.value)}
      >
        {#each groups as group (group.h2.slug)}
          <optgroup label={group.h2.text}>
            <option value={group.h2.slug}>{group.h2.text}</option>
            {#each group.h3s as h3 (h3.slug)}
              <option value={h3.slug}>{`  ${h3.text}`}</option>
            {/each}
          </optgroup>
        {/each}
      </select>
      <CaretDown
        size={16}
        class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-kumo-subtle"
        aria-hidden="true"
      />
    </nav>
  {:else}
    <nav aria-label="Table of contents">
      <p class="mb-3 text-xs font-semibold tracking-wide text-kumo-subtle uppercase">On this page</p>
      <ul class="flex flex-col gap-2 border-l-2 border-kumo-hairline">
        {#each groups as group (group.h2.slug)}
          {#if group.h3s.length === 0}
            <li class="-ml-0.5">
              <a
                href={`#${group.h2.slug}`}
                aria-current={activeId === group.h2.slug ? 'true' : undefined}
                class={cn(ITEM_BASE, activeId === group.h2.slug ? ITEM_ACTIVE : ITEM_DEFAULT)}
                onclick={() => jumpTo(group.h2.slug)}
              >
                <span class="block min-w-0 leading-5">{group.h2.text}</span>
              </a>
            </li>
          {:else}
            <li class="-ml-0.5 flex flex-col gap-2">
              <a
                href={`#${group.h2.slug}`}
                aria-current={activeId === group.h2.slug ? 'true' : undefined}
                class={cn(ITEM_BASE, activeId === group.h2.slug ? ITEM_ACTIVE : ITEM_DEFAULT)}
                onclick={() => jumpTo(group.h2.slug)}
              >
                <span class="block min-w-0 leading-5">{group.h2.text}</span>
              </a>
              <ul class="flex flex-col gap-2 border-l-2 border-kumo-hairline [&>li>a]:pl-7">
                {#each group.h3s as h3 (h3.slug)}
                  <li class="-ml-0.5">
                    <a
                      href={`#${h3.slug}`}
                      aria-current={activeId === h3.slug ? 'true' : undefined}
                      class={cn(ITEM_BASE, activeId === h3.slug ? ITEM_ACTIVE : ITEM_DEFAULT)}
                      onclick={() => jumpTo(h3.slug)}
                    >
                      <span class="block min-w-0 leading-5">{h3.text}</span>
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {/if}
        {/each}
      </ul>
    </nav>
  {/if}
{/if}
