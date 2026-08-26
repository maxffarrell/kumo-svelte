<script lang="ts">
  import { Pagination } from '$lib/components/pagination';
  import Scenario from '$lib/vrt/Scenario.svelte';

  let interactivePage = $state(1);
  let pageSize = $state(25);
</script>

<Scenario id="default" label="default">
  <Pagination page={1} perPage={10} totalCount={95} />
</Scenario>

<Scenario id="with-page-numbers" label="with page numbers">
  <Pagination page={3} perPage={10} totalCount={100}>
    <Pagination.Info />
    <Pagination.Controls />
  </Pagination>
</Scenario>

<Scenario id="with-page-size" label="with page size">
  <Pagination page={2} perPage={pageSize} totalCount={500}>
    <Pagination.Info />
    <Pagination.Separator />
    <Pagination.PageSize value={pageSize} onChange={(size) => (pageSize = size)} />
    <Pagination.Controls />
  </Pagination>
</Scenario>

<Scenario id="disabled-prev" label="disabled prev">
  <Pagination page={1} perPage={10} totalCount={50} />
</Scenario>

<Scenario id="disabled-next" label="disabled next">
  <Pagination page={5} perPage={10} totalCount={50} />
</Scenario>

<Scenario id="simple" label="simple">
  <Pagination page={2} perPage={10} totalCount={30} controls="simple" />
</Scenario>

<Scenario
  id="next-interaction"
  label="next click"
  interact={[{ type: 'click', selector: '[aria-label="Next page"]' }]}
>
  <Pagination bind:page={interactivePage} perPage={10} totalCount={50} />
</Scenario>
