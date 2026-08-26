<script lang="ts">
  import { Grid, GridItem } from './index';
  import type { KumoGridGap, KumoGridVariant } from './Grid.svelte';

  interface Props {
    variant?: KumoGridVariant;
    gap?: KumoGridGap;
    mobileDivider?: boolean;
  }

  let { variant = '2up', gap = 'base', mobileDivider }: Props = $props();
</script>

<Grid {variant} {gap} {mobileDivider}>
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
</Grid>
