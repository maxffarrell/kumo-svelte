<script lang="ts">
  import { Select } from '$lib';

  let value = $state('free');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[200px]"
      label="Plan"
      bind:value
      items={{
        free: 'Free',
        pro: 'Pro',
        business: { label: 'Business', disabled: true },
        enterprise: { label: 'Enterprise', disabled: true }
      }}
    />
  </div>
</div>
