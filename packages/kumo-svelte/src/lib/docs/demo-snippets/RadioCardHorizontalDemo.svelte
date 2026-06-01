<script lang="ts">
  import { Radio } from '$lib';

  let value = $state('free');
</script>

<Radio.Group legend="Choose a plan" appearance="card" orientation="horizontal" bind:value>
  <Radio.Item
    label="Free"
    description="For personal or hobby projects that aren't business-critical."
    value="free"
  />
  <Radio.Item
    label="Pro"
    description="For professional websites that aren't business-critical."
    value="pro"
  />
  <Radio.Item
    label="Business"
    description="For small businesses operating online."
    value="business"
  />
  <Radio.Item
    label="Contract"
    description="For mission-critical applications that are core to your business."
    value="contract"
  />
</Radio.Group>
