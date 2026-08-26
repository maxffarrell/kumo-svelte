<script lang="ts">
  import { Grid, GridItem } from '$lib/components/grid';
  import { Surface } from '$lib/components/surface';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const variants = [
    '2up',
    'side-by-side',
    '2-1',
    '1-2',
    '1-3up',
    '3up',
    '4up',
    '6up',
    '1-2-4up'
  ] as const;

  const gaps = ['none', 'sm', 'base', 'lg'] as const;
</script>

{#each variants as variant (variant)}
  <Scenario id={`variant-${variant}`} label={variant}>
    <Grid {variant} gap="sm" class="w-80">
      <GridItem><Surface class="rounded-lg p-3 text-sm">1</Surface></GridItem>
      <GridItem><Surface class="rounded-lg p-3 text-sm">2</Surface></GridItem>
      <GridItem><Surface class="rounded-lg p-3 text-sm">3</Surface></GridItem>
      <GridItem><Surface class="rounded-lg p-3 text-sm">4</Surface></GridItem>
    </Grid>
  </Scenario>
{/each}

{#each gaps as gap (gap)}
  <Scenario id={`gap-${gap}`} label={`gap ${gap}`}>
    <Grid variant="2up" {gap} class="w-80">
      <GridItem><Surface class="rounded-lg p-3 text-sm">A</Surface></GridItem>
      <GridItem><Surface class="rounded-lg p-3 text-sm">B</Surface></GridItem>
    </Grid>
  </Scenario>
{/each}

<Scenario id="mobile-divider-4up" label="4up mobile divider">
  <Grid variant="4up" gap="base" mobileDivider class="w-80">
    <GridItem><Surface class="rounded-lg p-3 text-sm">1</Surface></GridItem>
    <GridItem><Surface class="rounded-lg p-3 text-sm">2</Surface></GridItem>
    <GridItem><Surface class="rounded-lg p-3 text-sm">3</Surface></GridItem>
    <GridItem><Surface class="rounded-lg p-3 text-sm">4</Surface></GridItem>
  </Grid>
</Scenario>
