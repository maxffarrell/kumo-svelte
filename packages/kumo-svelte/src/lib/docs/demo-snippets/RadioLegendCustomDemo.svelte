<script lang="ts">
  import { Radio } from '$lib';

  let value = $state('email');
</script>

<Radio.Group bind:value>
  <Radio.Legend class="text-sm font-normal text-kumo-subtle">
    Notification preference
  </Radio.Legend>
  <Radio.Item label="Email" value="email" />
  <Radio.Item label="SMS" value="sms" />
  <Radio.Item label="Push notification" value="push" />
</Radio.Group>
