<script lang="ts">
  import { Pagination } from '$lib';

  let paginationPage = $state(1);

  function setPaginationPage(nextPage: number) {
    paginationPage = nextPage;
  }
</script>

<Pagination
  page={paginationPage}
  setPage={setPaginationPage}
  perPage={10}
  totalCount={100}
  labels={{
    firstPage: 'Première page',
    previousPage: 'Page précédente',
    nextPage: 'Page suivante',
    lastPage: 'Dernière page',
    pageNumber: 'Numéro de page',
    pageSize: 'Taille de page'
  }}
>
  <Pagination.Info>
    {#snippet children({ pageShowingRange, totalCount })}
      Affichage de <span class="tabular-nums">{pageShowingRange}</span> sur
      <span class="tabular-nums">{totalCount}</span>
    {/snippet}
  </Pagination.Info>
  <Pagination.Controls />
</Pagination>
