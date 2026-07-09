<script lang="ts">
  import type { Snippet } from 'svelte';
  import Info from 'phosphor-svelte/lib/Info';
  import { Button } from '$lib/components/button';
  import { Tooltip } from '$lib/components/tooltip';
  import { cn } from '$lib/utils/cn';

  export const KUMO_LABEL_VARIANTS = {} as const;
  export const KUMO_LABEL_DEFAULT_VARIANTS = {} as const;

  export interface KumoLabelVariantsProps {}

  export function labelVariants(_props: KumoLabelVariantsProps = {}) {
    return cn('m-0 text-base font-medium text-kumo-default');
  }

  export function labelContentVariants() {
    return cn('inline-flex items-center gap-1');
  }

  interface Props extends KumoLabelVariantsProps {
    children?: Snippet;
    class?: string;
    for?: string;
    htmlFor?: string;
    showOptional?: boolean;
    tooltip?: string | Snippet;
    asContent?: boolean;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    for: htmlForAlias,
    htmlFor,
    showOptional = false,
    tooltip,
    asContent = false,
    ...rest
  }: Props = $props();

  const labelFor = $derived(htmlFor ?? htmlForAlias);
</script>

{#snippet content()}
  {@render children?.()}
  {#if showOptional}
    <span class="font-normal text-kumo-subtle">(optional)</span>
  {/if}
  {#if tooltip}
    {#snippet tooltipTrigger(props: Record<string, unknown>)}
      <Button variant="ghost" size="xs" shape="square" aria-label="More information" {...props}>
        <Info class="size-4" />
      </Button>
    {/snippet}
    {#if typeof tooltip === 'string'}
      <Tooltip content={tooltip} trigger={tooltipTrigger} />
    {:else}
      <Tooltip trigger={tooltipTrigger}>
        {@render tooltip()}
      </Tooltip>
    {/if}
  {/if}
{/snippet}

{#if asContent}
  <span class={cn(labelContentVariants(), className)} {...rest}>
    {@render content()}
  </span>
{:else}
  <label class={cn(labelVariants(), labelContentVariants(), className)} for={labelFor} {...rest}>
    {@render content()}
  </label>
{/if}
