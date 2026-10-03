<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';
  interface Item { title: string; href: string; depth?: number; }
  interface Props { class?: string; items?: Item[]; children?: Snippet; 'aria-label'?: string; [key: string]: unknown; }
  let { class: className, items = [], children, 'aria-label': ariaLabel = 'Table of contents', ...rest }: Props = $props();
</script>

<nav class={className} aria-label={ariaLabel} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <ul class="flex flex-col gap-2 border-l-2 border-kumo-hairline">
      {#each items as item (item.href)}
        <li class="-ml-0.5">
          <a
            class="block w-full truncate border-l-2 border-transparent py-0.5 pl-4 text-left text-sm text-kumo-subtle no-underline hover:border-kumo-line hover:font-medium hover:text-kumo-default"
            style={`padding-left: ${(item.depth ?? 1) * 0.5 + 0.5}rem`}
            href={item.href}
          >
            <span class="block min-w-0 leading-5">{item.title}</span>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</nav>
