<script lang="ts">
  import { Banner } from '$lib';
  import { Warning } from 'phosphor-svelte';
</script>

<Banner
  icon={Warning}
  variant="alert"
  title="Review required"
  description="Please review your billing information before proceeding."
/>
