<script lang="ts">
  import { Radio } from '$lib';

  let value = $state('standard');
</script>

<Radio.Group
  legend="Shipping method"
  description="Choose how you'd like to receive your order"
  bind:value
>
  <Radio.Item label="Standard (5-7 days)" value="standard" />
  <Radio.Item label="Express (2-3 days)" value="express" />
  <Radio.Item label="Overnight" value="overnight" />
</Radio.Group>
