<script lang="ts">
  import { Link, Text } from 'kumo-svelte';
</script>

<nav class="flex gap-4 text-sm" aria-label="Product links">
  <Link href="/components/button" variant="plain">Buttons</Link>
  <Link href="/components/select" variant="plain">Select</Link>
  <Text class="text-kumo-subtle">
    <Link href="/components/link" variant="current">Current page</Link>
  </Text>
</nav>
