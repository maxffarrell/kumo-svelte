<script lang="ts">
  import { Pagination } from '$lib';

  let paginationPage = $state(1);

  function setPaginationPage(nextPage: number) {
    paginationPage = nextPage;
  }
</script>

<Pagination
  text={({ perPage }) => `Page ${paginationPage} - showing ${perPage} per page`}
  page={paginationPage}
  setPage={setPaginationPage}
  perPage={25}
  totalCount={100}
/>
