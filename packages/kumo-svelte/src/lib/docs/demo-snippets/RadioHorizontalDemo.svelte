<script lang="ts">
  import { Radio } from '$lib';

  let value = $state('md');
</script>

<Radio.Group legend="Size" orientation="horizontal" bind:value>
  <Radio.Item label="Small" value="sm" />
  <Radio.Item label="Medium" value="md" />
  <Radio.Item label="Large" value="lg" />
</Radio.Group>
