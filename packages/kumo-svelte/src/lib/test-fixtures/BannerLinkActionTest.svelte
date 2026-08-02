<script lang="ts">
  import Banner from '../components/banner/Banner.svelte';
  import Link from '../components/link/Link.svelte';
</script>

<Banner size="sm" description="A DNS record already exists.">
  {#snippet action()}
    <Link href="#manage" data-testid="action">Manage DNS</Link>
  {/snippet}
</Banner>
