<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import {
    DEFAULT_PAGINATION_LABELS,
    setPaginationContext,
    type PaginationLabels
  } from './context';
  import PaginationControls from './PaginationControls.svelte';
  import PaginationInfo from './PaginationInfo.svelte';

  type Controls = 'full' | 'simple';

  export const KUMO_PAGINATION_VARIANTS = {
    controls: {
      full: {
        classes: '',
        description: 'Full pagination controls with first, previous, page input, next, and last buttons'
      },
      simple: {
        classes: '',
        description: 'Simple pagination controls with only previous and next buttons'
      }
    }
  } as const;

  export const KUMO_PAGINATION_DEFAULT_VARIANTS = {
    controls: 'full'
  } as const;

  export function paginationVariants({
    controls = KUMO_PAGINATION_DEFAULT_VARIANTS.controls
  }: {
    controls?: Controls;
  } = {}) {
    return cn('flex items-center justify-between gap-2', KUMO_PAGINATION_VARIANTS.controls[controls].classes);
  }

  interface InfoTextProps {
    page?: number;
    perPage?: number;
    totalCount?: number;
    pageShowingRange: string;
  }

  interface Props {
    children?: Snippet;
    class?: string;
    page?: number;
    setPage?: (page: number) => void;
    perPage?: number;
    totalCount?: number;
    /** Whether another page exists when no total count or page count is available. */
    hasNextPage?: boolean;
    pages?: number;
    controls?: Controls;
    text?: (props: InfoTextProps) => unknown;
    labels?: PaginationLabels;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    page = $bindable(1),
    setPage: setPageProp,
    perPage,
    totalCount,
    hasNextPage,
    pages,
    controls = KUMO_PAGINATION_DEFAULT_VARIANTS.controls,
    text,
    labels: labelsProp,
    ...rest
  }: Props = $props();

  let editingPage = $derived(page);
  const effectivePerPage = $derived(perPage ?? (pages ? 1 : undefined));
  const effectiveTotalCount = $derived(totalCount ?? pages);
  const maxPage = $derived(Math.max(1, Math.ceil((effectiveTotalCount ?? 1) / (effectivePerPage ?? 1))));
  const labels = $derived({ ...DEFAULT_PAGINATION_LABELS, ...labelsProp });
  const pageShowingRange = $derived.by(() => {
    let lower = page * (effectivePerPage ?? 1) - (effectivePerPage ?? 0) + 1;
    let upper = Math.min(page * (effectivePerPage ?? 0), effectiveTotalCount ?? 0);

    if (Number.isNaN(lower)) lower = 0;
    if (Number.isNaN(upper)) upper = 0;

    return `${lower}-${upper}`;
  });

  function updatePage(nextPage: number) {
    page = nextPage;
    setPageProp?.(nextPage);
  }

  setPaginationContext({
    get page() {
      return page;
    },
    get perPage() {
      return effectivePerPage;
    },
    get totalCount() {
      return effectiveTotalCount;
    },
    get hasNextPage() {
      return hasNextPage;
    },
    get maxPage() {
      return maxPage;
    },
    get pageShowingRange() {
      return pageShowingRange;
    },
    setPage: updatePage,
    get editingPage() {
      return editingPage;
    },
    setEditingPage(nextPage: number) {
      editingPage = nextPage;
    },
    get labels() {
      return labels;
    }
  });
</script>

<div data-slot="pagination" class={cn('flex w-full items-center gap-2', className)} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <PaginationInfo aria-live="polite" aria-atomic="true" class="grow" {text} />
    <PaginationControls {controls} />
  {/if}
</div>
