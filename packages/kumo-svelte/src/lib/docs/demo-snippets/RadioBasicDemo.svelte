<script lang="ts">
  import { Radio } from '$lib';

  let value = $state('email');
</script>

<Radio.Group legend="Notification preference" bind:value>
  <Radio.Item label="Email" value="email" />
  <Radio.Item label="SMS" value="sms" />
  <Radio.Item label="Push notification" value="push" />
</Radio.Group>
