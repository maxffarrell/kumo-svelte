<script lang="ts">
  import { Banner } from '$lib/components/banner';
  import Info from 'phosphor-svelte/lib/Info';
</script>

<Banner
  icon={Info}
  variant="secondary"
  title="Maintenance scheduled"
  description="This service will be unavailable for 10 minutes."
/>
