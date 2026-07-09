<script lang="ts">
  import { Grid } from 'kumo-svelte/components/grid';
  import { Surface } from 'kumo-svelte/components/surface';
  import { Text } from 'kumo-svelte/components/text';
</script>

<Grid variant="2up" gap="base">
  <Grid.Item>
    <Surface class="rounded-lg p-4">
      <Text bold>Item 1</Text>
      <div class="mt-1">
        <Text variant="secondary">First grid item</Text>
      </div>
    </Surface>
  </Grid.Item>
  <Grid.Item>
    <Surface class="rounded-lg p-4">
      <Text bold>Item 2</Text>
      <div class="mt-1">
        <Text variant="secondary">Second grid item</Text>
      </div>
    </Surface>
  </Grid.Item>
</Grid>
