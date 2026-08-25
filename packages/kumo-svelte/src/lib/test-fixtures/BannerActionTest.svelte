<script lang="ts">
  import Banner from '../components/banner/Banner.svelte';
  import BannerAction from '../components/banner/BannerAction.svelte';
  import Info from 'phosphor-svelte/lib/Info';
</script>

<Banner size="sm" icon={Info} title="Update available" description="A new version is ready.">
  {#snippet action()}
    <BannerAction data-testid="action">Update</BannerAction>
  {/snippet}
</Banner>
