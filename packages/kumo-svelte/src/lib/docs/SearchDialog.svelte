<script lang="ts">
  import BookOpenIcon from 'phosphor-svelte/lib/BookOpenIcon';
  import CubeIcon from 'phosphor-svelte/lib/CubeIcon';
  import MagnifyingGlassIcon from 'phosphor-svelte/lib/MagnifyingGlassIcon';
  import SquaresFourIcon from 'phosphor-svelte/lib/SquaresFourIcon';
  import StackIcon from 'phosphor-svelte/lib/StackIcon';
  import { fade, scale } from 'svelte/transition';
  import { Badge } from '$lib/components/badge';
  import { cn } from '$lib/utils/cn';
  import { componentItems, blockItems, type NavItem } from './nav';

  interface SearchItem {
    name: string;
    type: 'component' | 'block' | 'layout' | 'page';
    description: string;
    category: string;
    url: string;
  }

  interface SearchGroup {
    label: string;
    items: SearchItem[];
  }

  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

  const STATIC_PAGES: SearchItem[] = [
    {
      name: 'Installation',
      description: 'How to install and set up Kumo in your project.',
      url: '/installation',
      category: 'Getting Started',
      type: 'page'
    },
    {
      name: 'Contributing',
      description: 'Guidelines for contributing to the Kumo component library.',
      url: '/contributing',
      category: 'Getting Started',
      type: 'page'
    },
    {
      name: 'Accessibility',
      description: 'Accessibility standards and best practices in Kumo components.',
      url: '/accessibility',
      category: 'Getting Started',
      type: 'page'
    },
    {
      name: 'Components vs Blocks',
      description: 'Understanding the difference between components and blocks.',
      url: '/components-vs-blocks',
      category: 'Getting Started',
      type: 'page'
    },
    {
      name: 'Colors',
      description: "Explore Kumo's semantic color tokens and theming system.",
      url: '/colors',
      category: 'Guides',
      type: 'page'
    },
    {
      name: 'Chart Colors',
      description: 'Semantic, categorical, and sequential color guidance for charts.',
      url: '/charts/colors',
      category: 'Guides',
      type: 'page'
    },
    {
      name: 'CLI',
      description: 'Use the Kumo CLI to add components and blocks to your project.',
      url: '/cli',
      category: 'Guides',
      type: 'page'
    },
    {
      name: 'Streaming',
      description: 'Server-side rendering and streaming support in Kumo.',
      url: '/streaming',
      category: 'Guides',
      type: 'page'
    },
    {
      name: 'Figma',
      description: 'Using Kumo components in Figma with the Kumo Figma plugin.',
      url: '/figma',
      category: 'Guides',
      type: 'page'
    },
    {
      name: 'Component Registry',
      description: 'Browse and explore the full Kumo component registry.',
      url: '/registry',
      category: 'Guides',
      type: 'page'
    },
    {
      name: 'CodeHighlighted',
      description: 'Syntax-highlighted code blocks powered by Shiki.',
      url: '/components/code-highlighted',
      category: 'Components',
      type: 'component'
    },
    {
      name: 'Flow',
      description: 'A diagram component for visualizing sequential and parallel workflows.',
      url: '/components/flow',
      category: 'Components',
      type: 'component'
    }
  ];

  const COMPONENT_DESCRIPTIONS: Record<string, string> = {
    autocomplete: 'A text input with filtered suggestions.',
    badge: 'Displays a small label for status, categorization, or metadata.',
    banner: 'Displays contextual inline messages for informational, alert, or error states.',
    breadcrumbs: "Shows the current page's location within a navigational hierarchy.",
    button: 'Displays a button or a component that looks like a button.',
    checkbox: 'A control that allows the user to toggle between checked and not checked.',
    'clipboard-text': 'A text component with a copy-to-clipboard button.',
    'cloudflare-logo': 'Cloudflare brand mark component.',
    'code-highlighted': 'Syntax-highlighted code blocks powered by Shiki.',
    collapsible: 'A vertically stacked set of interactive headings that each reveal content.',
    combobox: 'A searchable select component for filtering and selecting from options.',
    'command-palette': 'A keyboard-driven command menu for searching and navigating.',
    'date-picker': 'Date selection controls.',
    dialog: 'A modal window overlaid on the primary window or another dialog.',
    dropdown: 'Displays a menu of actions or functions triggered by a button.',
    empty: 'A placeholder component for empty states with illustration and actions.',
    flow: 'A diagram component for visualizing sequential and parallel workflows.',
    grid: 'Layout primitives for responsive grids.',
    input: 'A text input field with built-in label, description, and error support.',
    'input-area': 'A multi-line text input for longer content.',
    'input-group': 'Grouped input controls with labels, addons, and suffixes.',
    label: 'A label component for form fields with required/optional indicators.',
    'layer-card': 'A card with a layered visual effect for navigation or highlights.',
    link: 'Text link styling.',
    loader: 'A loading spinner to indicate loading state.',
    'menu-bar': 'A horizontal menu bar with icon buttons for toolbars.',
    meter: 'A visual indicator showing a value within a known range.',
    pagination: 'Navigation controls for paginated content.',
    popover: 'An accessible popup anchored to a trigger element.',
    radio: 'A control that allows selecting one option from a set.',
    select: 'Displays a list of options for the user to pick from.',
    'sensitive-input': 'A masked input for sensitive values like API keys and passwords.',
    sidebar: 'A composable sidebar navigation component.',
    'skeleton-line': 'A skeleton loading placeholder for text content.',
    switch: 'A two-state toggle button that can be either on or off.',
    table: 'A table component for displaying tabular data with selection support.',
    'table-of-contents': 'Presentational section navigation with active indicators.',
    tabs: 'Layered sections of content displayed one at a time.',
    text: 'A typography component for various heading and copy styles.',
    toast: 'Displays brief, non-intrusive notifications that appear temporarily.',
    tooltip: 'A popup that displays information on hover or focus.'
  };

  let { open, onOpenChange }: Props = $props();
  let query = $state('');
  let activeIndex = $state(0);
  let inputRef = $state<HTMLInputElement>();

  function slugFromHref(href: string) {
    return href.split('/').filter(Boolean).at(-1) ?? '';
  }

  function fromNav(item: NavItem, type: SearchItem['type'], category: string): SearchItem {
    const slug = slugFromHref(item.href);
    return {
      name: slug === 'toast' ? 'Toasty' : item.label,
      type,
      description: COMPONENT_DESCRIPTIONS[slug] ?? `${item.label} documentation and examples.`,
      category,
      url: item.href
    };
  }

  const allItems = $derived([
    ...STATIC_PAGES,
    ...componentItems
      .filter((item) => !['/components/code-highlighted', '/components/flow'].includes(item.href))
      .map((item) => fromNav(item, 'component', 'Components')),
    ...blockItems.map((item) => fromNav(item, 'block', 'Block'))
  ]);

  function score(item: SearchItem, value: string) {
    const q = value.trim().toLowerCase();
    if (!q) return 1;
    const name = item.name.toLowerCase();
    const description = item.description.toLowerCase();
    const category = item.category.toLowerCase();
    if (name === q) return 100;
    if (name.startsWith(q)) return 80;
    if (name.includes(q)) return 60;
    if (category.includes(q)) return 40;
    if (description.includes(q)) return 20;
    return 0;
  }

  function groupByCategory(items: SearchItem[]): SearchGroup[] {
    const grouped = new Map<string, SearchItem[]>();
    for (const item of items) grouped.set(item.category, [...(grouped.get(item.category) ?? []), item]);
    const order = (category: string) => {
      if (category === 'Getting Started') return 0;
      if (category === 'Guides') return 1;
      if (category === 'Block' || category === 'Layout') return 100;
      return 50;
    };
    return [...grouped.entries()]
      .sort(([a], [b]) => order(a) - order(b) || a.localeCompare(b))
      .map(([label, items]) => ({ label, items }));
  }

  const filtered = $derived(
    query.trim()
      ? allItems
          .map((item) => ({ item, score: score(item, query) }))
          .filter((entry) => entry.score > 0)
          .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
          .map((entry) => entry.item)
      : allItems
  );

  const groups = $derived(query.trim() ? (filtered.length ? [{ label: 'Results', items: filtered }] : []) : groupByCategory(filtered));
  const flatItems = $derived(groups.flatMap((group) => group.items));
  const totalResults = $derived(flatItems.length);

  $effect(() => {
    if (open) {
      query = '';
      activeIndex = 0;
      setTimeout(() => inputRef?.focus(), 0);
    }
  });

  function close() {
    onOpenChange(false);
  }

  function openItem(item: SearchItem, newTab = false) {
    if (newTab) {
      window.open(item.url, '_blank');
    } else {
      window.location.href = item.url;
    }
    close();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, Math.max(flatItems.length - 1, 0));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      return;
    }
    if (event.key === 'Enter' && flatItems[activeIndex]) {
      event.preventDefault();
      openItem(flatItems[activeIndex], event.metaKey || event.ctrlKey);
    }
  }

  function highlight(text: string, value: string) {
    const q = value.trim();
    if (!q) return [{ text, hit: false }];
    const index = text.toLowerCase().indexOf(q.toLowerCase());
    if (index === -1) return [{ text, hit: false }];
    return [
      { text: text.slice(0, index), hit: false },
      { text: text.slice(index, index + q.length), hit: true },
      { text: text.slice(index + q.length), hit: false }
    ];
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-[60] px-4"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    onkeydown={handleKeydown}
  >
    <button
      class="fixed inset-0 cursor-default bg-kumo-overlay opacity-80 transition-all duration-150"
      aria-label="Close search"
      onclick={close}
      transition:fade={{ duration: 150 }}
    ></button>
    <div
      class={cn(
        'fixed top-[10vh] left-1/2 w-full max-w-2xl -translate-x-1/2',
        'overflow-hidden rounded-lg bg-kumo-base shadow-xs ring ring-kumo-line',
        'duration-150'
      )}
      transition:scale={{ duration: 150, start: 0.9, opacity: 0 }}
    >
      <div class="flex max-h-[60vh] flex-col overflow-hidden rounded-lg bg-kumo-elevated">
      <div class="flex items-center gap-3 bg-kumo-base px-4 py-3 focus-within:ring-2 focus-within:ring-kumo-brand">
        <MagnifyingGlassIcon size={16} weight="bold" class="h-4 w-4 shrink-0 text-kumo-subtle" />
        <input
          bind:this={inputRef}
          bind:value={query}
          class="flex-1 border-none bg-transparent text-base kumo-input-placeholder outline-none"
          placeholder="Search docs..."
          aria-label="Search docs"
        />
      </div>

      <div class="relative min-h-0 flex-1 overflow-y-auto rounded-b-lg bg-kumo-base px-2 py-2 scroll-py-2 ring-1 ring-kumo-hairline">
        {#if groups.length === 0}
          <div class="p-8 text-center">
            <p class="text-kumo-subtle">
              {query.trim() ? `No results found for "${query}"` : 'Type to search docs'}
            </p>
          </div>
        {:else}
          <div class="space-y-3">
          {#each groups as group (group.label)}
            <div class="space-y-0.5">
              <div class="mb-2 px-2 pt-1 text-xs font-semibold text-kumo-subtle">{group.label}</div>
              <div>
                {#each group.items as item (item.url)}
                  {@const index = flatItems.indexOf(item)}
                  <button
                    class={cn(
                      'group flex w-full items-center gap-3 px-2 py-1.5 text-left text-base transition-colors',
                      'cursor-pointer rounded-lg',
                      index === activeIndex ? 'bg-kumo-overlay' : undefined
                    )}
                    onmouseenter={() => (activeIndex = index)}
                    onclick={(event) => openItem(item, event.metaKey || event.ctrlKey)}
                  >
                    <div class="flex w-full items-center gap-3">
                      <div class="flex-shrink-0 text-kumo-subtle">
                        {#if item.type === 'block'}
                          <StackIcon size={16} weight="duotone" />
                        {:else if item.type === 'layout'}
                          <SquaresFourIcon size={16} weight="duotone" />
                        {:else if item.type === 'page'}
                          <BookOpenIcon size={16} weight="duotone" />
                        {:else}
                          <CubeIcon size={16} weight="duotone" />
                        {/if}
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-2">
                        <span class="text-base font-medium text-kumo-default">
                          {#each highlight(item.name, query) as part, partIndex (partIndex)}
                            {#if part.hit}<mark class="rounded-sm bg-kumo-warning/50 text-kumo-default">{part.text}</mark>{:else}{part.text}{/if}
                          {/each}
                        </span>
                        {#if query.trim() && item.type !== 'component'}
                          <Badge variant="neutral">{item.type === 'page' ? 'Guide' : item.type[0].toUpperCase() + item.type.slice(1)}</Badge>
                        {/if}
                        </div>
                        <span class="block truncate text-sm text-kumo-subtle">
                        {#each highlight(item.description, query) as part, partIndex (partIndex)}
                          {#if part.hit}<mark class="rounded-sm bg-kumo-warning/50 text-kumo-default">{part.text}</mark>{:else}{part.text}{/if}
                        {/each}
                        </span>
                      </div>
                    </div>
                  </button>
                {/each}
              </div>
            </div>
          {/each}
          </div>
        {/if}
      </div>

      <div class="flex items-center justify-between rounded-b-lg bg-kumo-elevated px-4 py-3 text-xs text-kumo-subtle">
        <span class="text-kumo-subtle">{totalResults ? `${totalResults} result${totalResults === 1 ? '' : 's'}` : ''}</span>
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1"><kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5">↑</kbd><kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5">↓</kbd><span>navigate</span></span>
          <span class="flex items-center gap-1"><kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5">↵</kbd><span>open</span></span>
          <span class="flex items-center gap-1"><kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5">⌘↵</kbd><span>new tab</span></span>
          <span class="flex items-center gap-1"><kbd class="rounded border border-kumo-hairline bg-kumo-base px-1.5 py-0.5">esc</kbd><span>close</span></span>
        </div>
      </div>
      </div>
    </div>
  </div>
{/if}
