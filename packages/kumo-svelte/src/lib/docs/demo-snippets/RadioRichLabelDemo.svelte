<script lang="ts">
  import { Badge, Radio } from '$lib';

  let value = $state('pro');
</script>

{#snippet freeLabel()}
  <span class="flex items-center gap-2">
    Free
    <Badge variant="neutral">$0</Badge>
  </span>
{/snippet}

{#snippet proLabel()}
  <span class="flex items-center gap-2">
    Pro
    <Badge variant="primary">Popular</Badge>
  </span>
{/snippet}

<Radio.Group legend="Choose a plan" appearance="card" bind:value>
  <Radio.Item label={freeLabel} description="For personal or hobby projects." value="free" />
  <Radio.Item label={proLabel} description="For professional websites." value="pro" />
</Radio.Group>
