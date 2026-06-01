<script lang="ts">
  import { Pagination } from '$lib';

  let paginationPage = $state(1);
  let paginationPerPage = $state(25);

  function setPaginationPage(nextPage: number) {
    paginationPage = nextPage;
  }

  function setPaginationPerPage(nextPerPage: number) {
    paginationPerPage = nextPerPage;
  }
</script>

<Pagination page={paginationPage} setPage={setPaginationPage} perPage={paginationPerPage} totalCount={500}>
  <Pagination.Info />
  <div class="flex items-center gap-2">
    <Pagination.Controls />
    <Pagination.Separator />
    <Pagination.PageSize
      value={paginationPerPage}
      onChange={(size) => {
        setPaginationPerPage(size);
        setPaginationPage(1);
      }}
    />
  </div>
</Pagination>
