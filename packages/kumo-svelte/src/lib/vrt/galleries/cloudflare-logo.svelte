<script lang="ts">
  import { CloudflareLogo, PoweredByCloudflare } from '$lib/components/cloudflare-logo';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const variants = ['glyph', 'full'] as const;
  const colors = ['color', 'black', 'white'] as const;
</script>

{#each variants as variant (variant)}
  {#each colors as color (color)}
    <Scenario id={`${variant}-${color}`} label={`${variant} / ${color}`}>
      <CloudflareLogo {variant} {color} class={variant === 'glyph' ? 'w-12' : 'w-40'} />
    </Scenario>
  {/each}
{/each}

{#each colors as color (color)}
  <Scenario id={`powered-by-${color}`} label={`powered by / ${color}`}>
    <PoweredByCloudflare {color} />
  </Scenario>
{/each}

<Scenario id="glyph-large" label="glyph large">
  <CloudflareLogo variant="glyph" class="w-24" />
</Scenario>

<Scenario id="full-large" label="full large">
  <CloudflareLogo variant="full" class="w-64" />
</Scenario>
