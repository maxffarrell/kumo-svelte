<script lang="ts">
  import { Loader } from '$lib/components/loader';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const sizes = ['sm', 'base', 'lg'] as const;
</script>

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`size ${size}`}>
    <Loader {size} />
  </Scenario>
{/each}

<Scenario id="custom-size" label="custom 20px">
  <Loader size={20} />
</Scenario>

<Scenario id="default" label="default">
  <Loader />
</Scenario>

<!-- SkeletonLine is intentionally omitted: its infinite shimmer (::after
     animation) is non-deterministic for pixel capture. The static spinner
     frames above are frozen via SVG pauseAnimations() in the VRT runner. -->
