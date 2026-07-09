<script lang="ts">
  import { Text } from 'kumo-svelte/components/text';
</script>

<div class="w-64 rounded-lg border border-kumo-hairline bg-kumo-base p-4">
  <Text truncate>
    This is a long piece of text that will be truncated with an ellipsis when it overflows its container.
  </Text>
</div>
