<script lang="ts">
  import { Grid, Surface, Text } from 'kumo-svelte';
</script>

<div class="flex flex-col gap-8">
  <div>
    <p class="mb-2 text-kumo-subtle">variant="2up"</p>
    <Grid variant="2up" gap="sm">
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
    <p class="mb-2 text-kumo-subtle">variant="3up"</p>
    <Grid variant="3up" gap="sm">
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
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>3</Text>
        </Surface>
      </Grid.Item>
    </Grid>
  </div>

  <div>
    <p class="mb-2 text-kumo-subtle">variant="4up"</p>
    <Grid variant="4up" gap="sm">
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
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>3</Text>
        </Surface>
      </Grid.Item>
      <Grid.Item>
        <Surface class="rounded-lg p-4 text-center">
          <Text>4</Text>
        </Surface>
      </Grid.Item>
    </Grid>
  </div>
</div>
