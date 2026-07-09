<script lang="ts">
  import { Banner } from '$lib/components/banner';
  import Warning from 'phosphor-svelte/lib/Warning';
</script>

<Banner
  icon={Warning}
  variant="alert"
  title="Review required"
  description="Please review your billing information before proceeding."
/>
