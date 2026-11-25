<script lang="ts">
  import { Badge, Button, Text, Toasty } from "#lib/index.js";
  import TabsManyDemo from "#lib/docs/demo-snippets/TabsManyDemo.svelte";
</script>

<section dir="rtl" class="max-w-sm p-4">
  <TabsManyDemo />
  <Toasty>
    {#snippet children(manager)}
      <Button onclick={() => manager.add({ title: "RTL notification", timeout: 0 })}>
        Show RTL toast
      </Button>
    {/snippet}
  </Toasty>
  <Badge variant="secondary">Secondary badge</Badge>
  <Text as="h2" size="sm" variant="secondary" bold>Small copy heading</Text>
</section>
