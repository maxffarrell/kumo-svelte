<script lang="ts">
  import { Pagination } from '$lib/components/pagination';

  let paginationPage = $state(1);

  function setPaginationPage(nextPage: number) {
    paginationPage = nextPage;
  }
</script>

<Pagination page={paginationPage} setPage={setPaginationPage} perPage={10} totalCount={100} />
