<script lang="ts">
  import { Collapsible, Text } from '$lib';

  let activeIndex = $state<number | null>(0);

  const items = [
    {
      title: 'What is Kumo?',
      content: "Kumo is Cloudflare's new design system built on Base UI and Tailwind CSS v4."
    },
    {
      title: 'How do I install it?',
      content: 'Run `npm install @cloudflare/kumo` and import the components you need.'
    },
    {
      title: 'Is it accessible?',
      content: 'Yes! Kumo is built on Base UI which provides excellent accessibility out of the box.'
    }
  ];
</script>

<div class="w-full space-y-2">
  {#each items as item, i}
    <Collapsible.Root
      open={activeIndex === i}
      onOpenChange={(open) => (activeIndex = open ? i : null)}
    >
      <Collapsible.DefaultTrigger>{item.title}</Collapsible.DefaultTrigger>
      <Collapsible.DefaultPanel>
        <Text>{item.content}</Text>
      </Collapsible.DefaultPanel>
    </Collapsible.Root>
  {/each}
</div>
