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

<div class="flex min-h-24 w-full items-center justify-center">

      <Pagination page={paginationPage} setPage={setPaginationPage} perPage={10} totalCount={100} />
    
</div>
