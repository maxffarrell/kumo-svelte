<script lang="ts">
  import { Grid } from 'kumo-svelte/components/grid';
  import { Surface } from 'kumo-svelte/components/surface';
  import { Text } from 'kumo-svelte/components/text';
</script>

<Grid variant="4up" gap="base" mobileDivider>
  {#each [1, 2, 3, 4] as item}
    <Grid.Item>
      <Surface class="rounded-lg p-4">
        <Text bold>Item {item}</Text>
        <div class="mt-1"><Text variant="secondary">Has divider on mobile</Text></div>
      </Surface>
    </Grid.Item>
  {/each}
</Grid>
