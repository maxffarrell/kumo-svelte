<script lang="ts">
  import RadioGroup from './RadioGroup.svelte';
  import RadioItem from './RadioItem.svelte';

  let pageSize = $state<number>(10);
</script>

<RadioGroup legend="Items per page" bind:value={pageSize}>
  <RadioItem label="10" value={10} />
  <RadioItem label="25" value={25} />
  <RadioItem label="50" value={50} />
</RadioGroup>

<output aria-label="Selected page size">{pageSize}</output>
