<script lang="ts">
  import type { Snippet } from 'svelte';
  import Check from 'phosphor-svelte/lib/Check';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<span class={cn('ml-auto', className)} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <Check class="h-4 w-4" />
  {/if}
</span>
