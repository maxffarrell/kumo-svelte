<script lang="ts">
  import { Banner } from '$lib/components/banner';
  import Warning from 'phosphor-svelte/lib/Warning';
</script>

<Banner
  icon={Warning}
  variant="alert"
  title="Session expiring"
  description="Your session will expire in 5 minutes."
/>
