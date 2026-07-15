<script lang="ts">
  import Pagination from './Pagination.svelte';
  import PaginationSeparator from './PaginationSeparator.svelte';
</script>

<Pagination page={1} perPage={10} totalCount={50}>
  <PaginationSeparator />
</Pagination>
