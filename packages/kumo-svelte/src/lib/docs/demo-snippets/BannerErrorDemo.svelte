<script lang="ts">
  import { Banner } from '$lib/components/banner';
  import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
</script>

<Banner
  icon={WarningCircle}
  variant="error"
  title="Save failed"
  description="We couldn't save your changes. Please try again."
/>
