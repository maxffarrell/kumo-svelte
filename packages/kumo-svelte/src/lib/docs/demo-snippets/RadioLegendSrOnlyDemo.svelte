<script lang="ts">
  import { Radio } from '$lib';

  let value = $state('all');
</script>

<Radio.Group defaultValue="all" bind:value>
  <Radio.Legend class="sr-only">Paths</Radio.Legend>
  <Radio.Item label="Allow all paths" value="all" />
  <Radio.Item label="Restrict to specific paths" value="specific" />
</Radio.Group>
