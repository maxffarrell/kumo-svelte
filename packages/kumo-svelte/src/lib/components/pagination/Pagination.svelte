<script module lang="ts">
  import type { Snippet } from 'svelte';
  import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from 'phosphor-svelte';
  import { InputGroup, InputGroupButton, InputGroupInput } from '$lib/components/input-group';
  import { cn } from '$lib/utils/cn';
  import {
    clamp,
    DEFAULT_PAGINATION_LABELS,
    getPaginationContext,
    setPaginationContext,
    type PaginationLabels
  } from './context';

  type Controls = 'full' | 'simple';
  type PageSelector = 'input' | 'dropdown';

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

  interface RenderProps {
    page: number;
    perPage?: number;
    totalCount?: number;
    pageShowingRange: string;
  }

  interface PaginationInfoProps {
    children?: Snippet<[RenderProps]>;
    class?: string;
    text?: (props: RenderProps) => unknown;
    [key: string]: unknown;
  }

  interface PaginationPageSizeProps {
    value: number;
    onChange: (size: number) => void;
    options?: number[];
    label?: string | Snippet;
    class?: string;
    [key: string]: unknown;
  }

  interface PaginationControlsProps {
    controls?: Controls;
    pageSelector?: PageSelector;
    class?: string;
    [key: string]: unknown;
  }

  interface PaginationSeparatorProps {
    class?: string;
    [key: string]: unknown;
  }

  interface Props {
    children?: Snippet;
    class?: string;
    page?: number;
    setPage?: (page: number) => void;
    perPage?: number;
    totalCount?: number;
    pages?: number;
    controls?: Controls;
    text?: (props: InfoTextProps) => unknown;
    labels?: PaginationLabels;
    [key: string]: unknown;
  }

  const DEFAULT_PAGE_SIZE_OPTIONS = [25, 50, 100, 250] as const;

  function paginationRenderProps(): RenderProps {
    const context = getPaginationContext();

    return {
      page: context.page,
      perPage: context.perPage,
      totalCount: context.totalCount,
      pageShowingRange: context.pageShowingRange
    };
  }

  function paginationText(text: ((props: RenderProps) => unknown) | undefined) {
    return text?.(paginationRenderProps());
  }

  function hasPaginationTotalCount() {
    const totalCount = getPaginationContext().totalCount;

    return totalCount !== undefined && totalCount > 0;
  }

  function pageOptions() {
    const context = getPaginationContext();

    return Array.from({ length: context.maxPage }, (_, index) => {
      const page = index + 1;
      return { label: String(page), value: String(page) };
    });
  }

  function commitPage(nextPage: number) {
    const context = getPaginationContext();
    const clamped = clamp(nextPage, 1, context.maxPage);

    context.setPage(clamped);
    context.setEditingPage(clamped);
  }

  function commitEditingPage() {
    const context = getPaginationContext();

    commitPage(context.editingPage);
  }

  // @ts-ignore Svelte declaration tags are exportable from module script.
  export { PaginationControls, PaginationInfo, PaginationPageSize, PaginationSeparator };
</script>

<script lang="ts">
  let {
    children,
    class: className,
    page = $bindable(1),
    setPage: setPageProp,
    perPage,
    totalCount,
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

{#snippet PaginationInfo({ children, class: className, text, ...rest }: PaginationInfoProps)}
  <div data-slot="pagination-info" class={cn('text-sm text-kumo-subtle', className)} {...rest}>
    {#if children}
      {@render children(paginationRenderProps())}
    {:else if text}
      {paginationText(text)}
    {:else if hasPaginationTotalCount()}
      Showing <span class="tabular-nums">{getPaginationContext().pageShowingRange}</span> of <span class="tabular-nums">{getPaginationContext().totalCount}</span>
    {/if}
  </div>
{/snippet}

{#snippet PaginationControls({
  controls = 'full',
  pageSelector = 'input',
  class: className,
  ...rest
}: PaginationControlsProps)}
  <div data-slot="pagination-controls" class={cn('grow flex flex-col items-end', className)} {...rest}>
    <nav aria-label={getPaginationContext().labels.navigation}>
      <InputGroup focusMode="individual">
        {#if controls === 'full'}
          <InputGroupButton
            variant="secondary"
            aria-label={getPaginationContext().labels.firstPage}
            disabled={getPaginationContext().page <= 1}
            onclick={() => commitPage(1)}
          >
            <CaretDoubleLeft class="size-4" />
          </InputGroupButton>
        {/if}
        <InputGroupButton
          variant="secondary"
          aria-label={getPaginationContext().labels.previousPage}
          disabled={getPaginationContext().page <= 1}
          onclick={() => commitPage(getPaginationContext().page - 1)}
        >
          <CaretLeft class="size-4" />
        </InputGroupButton>
        {#if controls === 'full'}
          {#if pageSelector === 'dropdown'}
            <select
              aria-label={getPaginationContext().labels.pageNumber}
              class="h-9 rounded-none bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-hairline focus:ring-2 focus:ring-kumo-focus/50"
              value={getPaginationContext().page}
              onchange={(event) => commitPage(Number(event.currentTarget.value))}
            >
              {#each pageOptions() as option (option.value)}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          {:else}
            <InputGroupInput
              style="width: 50px"
              class="text-center"
              aria-label={getPaginationContext().labels.pageNumber}
              value={getPaginationContext().editingPage}
              onValueChange={(nextValue: string) => getPaginationContext().setEditingPage(Number(nextValue))}
              onblur={commitEditingPage}
              onkeydown={(event: KeyboardEvent) => {
                if (event.key === 'Enter') commitEditingPage();
              }}
              autocomplete="off"
              data-1p-ignore
              data-lpignore="true"
              data-form-type="other"
            />
          {/if}
        {/if}
        <InputGroupButton
          variant="secondary"
          aria-label={getPaginationContext().labels.nextPage}
          disabled={getPaginationContext().page === getPaginationContext().maxPage}
          onclick={() => commitPage(getPaginationContext().page + 1)}
        >
          <CaretRight class="size-4" />
        </InputGroupButton>
        {#if controls === 'full'}
          <InputGroupButton
            variant="secondary"
            aria-label={getPaginationContext().labels.lastPage}
            disabled={getPaginationContext().page === getPaginationContext().maxPage}
            onclick={() => commitPage(getPaginationContext().maxPage)}
          >
            <CaretDoubleRight class="size-4" />
          </InputGroupButton>
        {/if}
      </InputGroup>
    </nav>
  </div>
{/snippet}

{#snippet PaginationPageSize({
  value,
  onChange,
  options = [...DEFAULT_PAGE_SIZE_OPTIONS],
  label = 'Per page:',
  class: className,
  ...rest
}: PaginationPageSizeProps)}
  <div data-slot="pagination-page-size" class={cn('flex items-center gap-2', className)} {...rest}>
    {#if label}
      <span class="text-sm text-kumo-subtle">
        {#if typeof label === 'function'}
          {@render label()}
        {:else}
          {label}
        {/if}
      </span>
    {/if}
    <select
      aria-label={getPaginationContext().labels.pageSize}
      class="h-9 rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line focus:ring-2 focus:ring-kumo-focus/50"
      {value}
      onchange={(event) => onChange(Number(event.currentTarget.value))}
    >
      {#each options as option (option)}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
{/snippet}

{#snippet PaginationSeparator({ class: className, ...rest }: PaginationSeparatorProps)}
  <div data-slot="pagination-separator" class={cn('mx-2 h-6 border-l border-kumo-hairline', className)} {...rest}></div>
{/snippet}

<div data-slot="pagination" class={cn('flex w-full items-center gap-2', className)} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <PaginationInfo aria-live="polite" aria-atomic="true" class="grow" {text} />
    <PaginationControls {controls} />
  {/if}
</div>
