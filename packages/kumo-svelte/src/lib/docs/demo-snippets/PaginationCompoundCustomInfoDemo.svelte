<script lang="ts">
  import { Pagination } from '$lib';

  let paginationPage = $state(1);

  function setPaginationPage(nextPage: number) {
    paginationPage = nextPage;
  }
</script>

<Pagination page={paginationPage} setPage={setPaginationPage} perPage={25} totalCount={100}>
  <Pagination.Info>
    {#snippet children({ page, totalCount })}
      Page {page} of {Math.ceil((totalCount ?? 1) / 25)}
    {/snippet}
  </Pagination.Info>
  <Pagination.Controls />
</Pagination>
