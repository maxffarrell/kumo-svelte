<script lang="ts">
  import { Collapsible } from '$lib/components/collapsible';
  import { Text } from '$lib/components/text';

  let isOpen = $state(false);
</script>

<div class="w-full">
  <Collapsible.Root bind:open={isOpen}>
    <Collapsible.DefaultTrigger>What is Kumo?</Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel>
      <Text>Kumo is Cloudflare's new design system.</Text>
    </Collapsible.DefaultPanel>
  </Collapsible.Root>
</div>
