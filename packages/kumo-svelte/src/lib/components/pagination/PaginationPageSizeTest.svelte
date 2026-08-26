<script lang="ts">
  import Pagination from './Pagination.svelte';
  import PaginationPageSize from './PaginationPageSize.svelte';

  let pageSize = $state(25);
</script>

<Pagination page={1} perPage={pageSize} totalCount={100}>
  <PaginationPageSize value={pageSize} onChange={(size) => (pageSize = size)} />
</Pagination>
