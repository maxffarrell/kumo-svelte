<script lang="ts">
  import { Collapsible, Text } from '$lib';

  let open1 = $state(false);
  let open2 = $state(false);
  let open3 = $state(false);
</script>

<div class="w-full space-y-2">
  <Collapsible.Root bind:open={open1}>
    <Collapsible.DefaultTrigger>What is Kumo?</Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel>
      <Text>Kumo is Cloudflare's new design system.</Text>
    </Collapsible.DefaultPanel>
  </Collapsible.Root>

  <Collapsible.Root bind:open={open2}>
    <Collapsible.DefaultTrigger>How do I use it?</Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel>
      <Text>Install the components and import them into your project.</Text>
    </Collapsible.DefaultPanel>
  </Collapsible.Root>

  <Collapsible.Root bind:open={open3}>
    <Collapsible.DefaultTrigger>Is it open source?</Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel>
      <Text>Check the repository for license information.</Text>
    </Collapsible.DefaultPanel>
  </Collapsible.Root>
</div>
