<script lang="ts">
  import { Grid, Surface, Text } from 'kumo-svelte';
</script>

<div class="flex flex-col gap-8">
  <div>
    <p class="mb-2 text-kumo-subtle">gap="none"</p>
    <Grid variant="side-by-side" gap="none">
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>1</Text>
        </Surface>
      </Grid.Item>
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>2</Text>
        </Surface>
      </Grid.Item>
    </Grid>
  </div>

  <div>
    <p class="mb-2 text-kumo-subtle">gap="sm"</p>
    <Grid variant="side-by-side" gap="sm">
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>1</Text>
        </Surface>
      </Grid.Item>
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>2</Text>
        </Surface>
      </Grid.Item>
    </Grid>
  </div>

  <div>
    <p class="mb-2 text-kumo-subtle">gap="base" (default, responsive)</p>
    <Grid variant="side-by-side" gap="base">
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>1</Text>
        </Surface>
      </Grid.Item>
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>2</Text>
        </Surface>
      </Grid.Item>
    </Grid>
  </div>

  <div>
    <p class="mb-2 text-kumo-subtle">gap="lg"</p>
    <Grid variant="side-by-side" gap="lg">
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>1</Text>
        </Surface>
      </Grid.Item>
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>2</Text>
        </Surface>
      </Grid.Item>
    </Grid>
  </div>
</div>
