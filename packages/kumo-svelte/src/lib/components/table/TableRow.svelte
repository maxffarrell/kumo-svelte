<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';
  import {
    KUMO_TABLE_DEFAULT_VARIANTS,
    KUMO_TABLE_VARIANTS,
    type KumoTableRowVariant
  } from './Table.svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    variant?: KumoTableRowVariant;
    [key: string]: unknown;
  }

  let { children, class: className, variant = KUMO_TABLE_DEFAULT_VARIANTS.variant, ...rest }: Props = $props();
</script>

<tr class={cn(KUMO_TABLE_VARIANTS.variant[variant].classes, className)} {...rest}>
  {@render children?.()}
</tr>
