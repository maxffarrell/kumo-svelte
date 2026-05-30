<script lang="ts">
  import { BreadcrumbsSeparator } from './Breadcrumbs.svelte';

  interface Props {
    [key: string]: unknown;
  }

  let { ...rest }: Props = $props();
</script>

{@render BreadcrumbsSeparator({ props: rest })}
