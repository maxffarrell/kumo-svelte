<script lang="ts">
  import Pagination from './Pagination.svelte';

  interface Props {
    onPageChange?: (page: number) => void;
  }

  let { onPageChange = () => {} }: Props = $props();
  let page = $state(2);

  function setPage(nextPage: number) {
    page = nextPage;
    onPageChange(nextPage);
  }
</script>

<Pagination bind:page {setPage} perPage={10} totalCount={30} controls="simple" />
