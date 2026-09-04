<script lang="ts">
  import { Pagination } from 'kumo-svelte/components/pagination';

  let page = $state(1);
  const hasNextPage = $derived(page < 3);
</script>

<Pagination
  bind:page
  {hasNextPage}
  text={({ page }) => `Page ${page}`}
/>
