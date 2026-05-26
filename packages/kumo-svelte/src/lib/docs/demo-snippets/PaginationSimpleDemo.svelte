<script lang="ts">
  import { Pagination } from '$lib';

  let paginationPage = $state(1);

  function setPaginationPage(nextPage: number) {
    paginationPage = nextPage;
  }
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Pagination page={paginationPage} setPage={setPaginationPage} perPage={10} totalCount={100} controls="simple" />
</div>
