<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  const ITEM_BASE = 'block w-full truncate border-l-2 border-transparent py-0.5 pl-4 text-left text-sm no-underline';
  const NESTED_UL_CLASSES = 'flex flex-col gap-2 border-l-2 border-kumo-hairline [&>li>a]:pl-7 [&>li>button]:pl-7';

  interface Props {
    children?: Snippet;
    label: string;
    href?: string;
    active?: boolean;
    class?: string;
    [key: string]: unknown;
  }

  let { children, label, href, active = false, class: className, ...rest }: Props = $props();
</script>

<li class={cn('-ml-0.5 flex flex-col gap-2', className)} {...rest}>
  {#if href}
    <a
      {href}
      aria-current={active ? 'true' : undefined}
      data-kumo-component="TableOfContents"
      data-kumo-part="group-link"
      class={cn(
        ITEM_BASE,
        active
          ? 'border-kumo-brand font-medium text-kumo-default'
          : 'text-kumo-subtle hover:border-kumo-line hover:font-medium hover:text-kumo-default'
      )}
    >
      <span class="block min-w-0 leading-5">{label}</span>
    </a>
  {:else}
    <p class="py-0.5 pl-4 text-sm leading-5 font-medium text-kumo-subtle">{label}</p>
  {/if}
  <ul class={NESTED_UL_CLASSES}>
    {@render children?.()}
  </ul>
</li>
