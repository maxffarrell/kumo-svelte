<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Select } from '$lib/components/select';
  import { cn } from '$lib/utils/cn';
  import { getPaginationContext } from './context';

  const DEFAULT_PAGE_SIZE_OPTIONS = [25, 50, 100, 250] as const;

  interface Props {
    value: number;
    onChange: (size: number) => void;
    options?: number[];
    label?: string | Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    value = $bindable(),
    onChange,
    options = [...DEFAULT_PAGE_SIZE_OPTIONS],
    label = 'Per page:',
    class: className,
    ...rest
  }: Props = $props();

  const context = getPaginationContext();
  const selectOptions = $derived(options.map((size) => ({ label: String(size), value: size })));

  function handleChange(nextValue: unknown) {
    const nextSize = Number(nextValue);
    value = nextSize;
    onChange(nextSize);
  }
</script>

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
  <Select
    aria-label={context.labels.pageSize}
    class="w-max ring-kumo-hairline"
    {value}
    options={selectOptions}
    onValueChange={handleChange}
  />
</div>
