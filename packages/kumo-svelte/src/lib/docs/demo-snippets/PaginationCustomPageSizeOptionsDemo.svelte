<script lang="ts">
  import { Pagination } from '$lib';

  let paginationPage = $state(1);
  let paginationPerPage = $state(10);

  function setPaginationPage(nextPage: number) {
    paginationPage = nextPage;
  }

  function setPaginationPerPage(nextPerPage: number) {
    paginationPerPage = nextPerPage;
  }
</script>

<Pagination page={paginationPage} setPage={setPaginationPage} perPage={paginationPerPage} totalCount={200}>
  <Pagination.Info />
  <Pagination.Separator />
  <Pagination.PageSize
    value={paginationPerPage}
    onChange={(size) => {
      setPaginationPerPage(size);
      setPaginationPage(1);
    }}
    options={[10, 20, 50]}
  />
  <Pagination.Controls />
</Pagination>
