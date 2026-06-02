<script lang="ts">
  import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from 'phosphor-svelte';
  import { InputGroup, InputGroupButton, InputGroupInput } from '$lib/components/input-group';
  import { Select } from '$lib/components/select';
  import { cn } from '$lib/utils/cn';
  import { clamp, getPaginationContext } from './context';

  type Controls = 'full' | 'simple';
  type PageSelector = 'input' | 'dropdown';

  interface Props {
    controls?: Controls;
    pageSelector?: PageSelector;
    class?: string;
    [key: string]: unknown;
  }

  let { controls = 'full', pageSelector = 'input', class: className, ...rest }: Props = $props();
  const context = getPaginationContext();
  const pageOptions = $derived(
    Array.from({ length: context.maxPage }, (_, index) => {
      const page = index + 1;
      return { label: String(page), value: page };
    })
  );

  function commitPage(nextPage: number) {
    const clamped = clamp(nextPage, 1, context.maxPage);
    context.setPage(clamped);
    context.setEditingPage(clamped);
  }

  function commitEditingPage() {
    commitPage(context.editingPage);
  }

</script>

<div data-slot="pagination-controls" class={cn('grow flex flex-col items-end', className)} {...rest}>
  <nav aria-label={context.labels.navigation}>
    <InputGroup focusMode="individual">
      {#if controls === 'full'}
        <InputGroupButton
          variant="secondary"
          aria-label={context.labels.firstPage}
          disabled={context.page <= 1}
          onclick={() => commitPage(1)}
        >
          <CaretDoubleLeft class="size-4" />
        </InputGroupButton>
      {/if}
      <InputGroupButton
        variant="secondary"
        aria-label={context.labels.previousPage}
        disabled={context.page <= 1}
        onclick={() => commitPage(context.page - 1)}
      >
        <CaretLeft class="size-4" />
      </InputGroupButton>
      {#if controls === 'full'}
        {#if pageSelector === 'dropdown'}
          <Select
            aria-label={context.labels.pageNumber}
            class="rounded-none ring-kumo-hairline"
            contentClass="max-h-56"
            value={context.page}
            options={pageOptions}
            onValueChange={(nextPage) => {
              const page = Number(nextPage);
              context.setPage(page);
              context.setEditingPage(page);
            }}
          />
        {:else}
          <InputGroupInput
            style="width: 50px"
            class="text-center"
            aria-label={context.labels.pageNumber}
            value={context.editingPage}
            onValueChange={(nextValue: string) => context.setEditingPage(Number(nextValue))}
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
        aria-label={context.labels.nextPage}
        disabled={context.page === context.maxPage}
        onclick={() => commitPage(context.page + 1)}
      >
        <CaretRight class="size-4" />
      </InputGroupButton>
      {#if controls === 'full'}
        <InputGroupButton
          variant="secondary"
          aria-label={context.labels.lastPage}
          disabled={context.page === context.maxPage}
          onclick={() => commitPage(context.maxPage)}
        >
          <CaretDoubleRight class="size-4" />
        </InputGroupButton>
      {/if}
    </InputGroup>
  </nav>
</div>
