<script lang="ts">
  import { Banner } from '#lib/components/banner/index.js';
  import { Button } from '#lib/components/button/index.js';
  import Warning from 'phosphor-svelte/lib/Warning';
</script>

<Banner
  icon={Warning}
  variant="alert"
  title="Session expiring"
  description="Your session will expire in 5 minutes."
>
  {#snippet action()}
    <Button size="sm" variant="secondary">Dismiss</Button>
    <Button size="sm">Extend session</Button>
  {/snippet}
</Banner>
