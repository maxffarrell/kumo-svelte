<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { BreadcrumbsCurrent } from './Breadcrumbs.svelte';

  interface Props {
    children?: Snippet;
    icon?: Component;
    loading?: boolean;
    [key: string]: unknown;
  }

  let { children, icon: Icon, loading = false, ...rest }: Props = $props();
</script>

{@render BreadcrumbsCurrent({ children, icon: Icon, loading, props: rest })}
