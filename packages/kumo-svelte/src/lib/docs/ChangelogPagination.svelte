<script lang="ts">
  import { Pagination } from '#lib/components/pagination/index.js';

  interface Props {
    page: number;
    perPage: number;
    totalCount: number;
  }

  let { page, perPage, totalCount }: Props = $props();

  function setPage(newPage: number) {
    window.location.href = newPage <= 1 ? '/changelog/' : `/changelog/${newPage}/`;
  }
</script>

<Pagination {page} {setPage} {perPage} totalCount={totalCount} />
