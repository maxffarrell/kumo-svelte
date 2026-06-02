<script lang="ts">
  import Pagination from './Pagination.svelte';
  import PaginationControls from './PaginationControls.svelte';

  interface Props {
    page?: number;
    setPage?: (page: number) => void;
  }

  let { page = 1, setPage = () => {} }: Props = $props();
</script>

<Pagination {page} {setPage} perPage={10} totalCount={30}>
  <PaginationControls pageSelector="dropdown" />
</Pagination>
