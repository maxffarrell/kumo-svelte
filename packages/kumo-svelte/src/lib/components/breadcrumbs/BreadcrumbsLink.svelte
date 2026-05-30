<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { BreadcrumbsLink } from './Breadcrumbs.svelte';

  interface Props {
    children?: Snippet;
    href: string;
    icon?: Component;
    [key: string]: unknown;
  }

  let { children, href, icon: Icon, ...rest }: Props = $props();
</script>

{@render BreadcrumbsLink({ children, href, icon: Icon, props: rest })}
