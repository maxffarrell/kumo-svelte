<script lang="ts">
  import { Banner } from '$lib';
  import { Info, Warning, WarningCircle } from 'phosphor-svelte';
</script>

<div class="w-full space-y-3">
  <Banner icon={Info} title="Update available" description="A new version is ready to install." />
  <Banner
    icon={Warning}
    variant="alert"
    title="Session expiring"
    description="Your session will expire in 5 minutes."
  />
  <Banner
    icon={WarningCircle}
    variant="error"
    title="Save failed"
    description="We couldn't save your changes. Please try again."
  />
  <Banner
    icon={Info}
    variant="secondary"
    title="Maintenance scheduled"
    description="This service will be unavailable for 10 minutes."
  />
</div>
