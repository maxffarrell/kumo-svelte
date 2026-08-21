<script lang="ts">
  import { Text } from 'kumo-svelte/components/text';
</script>

<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="heading">Heading</Text>
    <Text variant="mono-secondary">text-lg (16px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="heading" size="lg" as="h2">Heading large</Text>
    <Text variant="mono-secondary">text-xl (20px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text>Body</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text bold>Body bold</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text size="lg">Body lg</Text>
    <Text variant="mono-secondary">text-lg (16px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text size="sm">Body sm</Text>
    <Text variant="mono-secondary">text-sm (13px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text size="xs">Body xs</Text>
    <Text variant="mono-secondary">text-xs (12px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="secondary">Body secondary</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="mono">Monospace</Text>
    <Text variant="mono-secondary">text-sm (13px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="mono" size="lg">Monospace lg</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="mono-secondary">Monospace secondary</Text>
    <Text variant="mono-secondary">text-sm (13px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="success">Success</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
  <div class="flex flex-col justify-end gap-1 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
    <Text variant="error">Error</Text>
    <Text variant="mono-secondary">text-base (14px)</Text>
  </div>
</div>
