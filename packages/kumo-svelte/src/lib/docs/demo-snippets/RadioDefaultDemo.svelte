<script lang="ts">
  import { Radio } from '$lib';

  let value = $state('personal');
</script>

<Radio.Group legend="Account type" bind:value>
  <Radio.Item label="Personal" value="personal" />
  <Radio.Item label="Business" value="business" />
  <Radio.Item label="Enterprise" value="enterprise" />
</Radio.Group>
