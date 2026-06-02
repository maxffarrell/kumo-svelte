<script lang="ts">
  import { Collapsible, Text } from '$lib';

  let isOpen = $state(false);
</script>

<div class="w-full">
  <Collapsible.Root bind:open={isOpen}>
    <Collapsible.Trigger
      class="group flex h-6.5 w-max shrink-0 items-center gap-1 rounded-md border-0 bg-kumo-base px-2 text-xs font-medium !text-kumo-default shadow-xs ring ring-kumo-hairline select-none not-disabled:hover:bg-kumo-tint focus:outline-none focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand disabled:cursor-not-allowed disabled:bg-kumo-base/50 disabled:!text-kumo-default/70 data-[state=open]:bg-kumo-base"
    >
      {isOpen ? 'Hide details' : 'Show details'}
    </Collapsible.Trigger>
    <Collapsible.Panel class="mt-3 rounded-lg bg-kumo-tint p-4">
      <Text>
        This panel uses custom styling instead of the default border-left accent.
      </Text>
    </Collapsible.Panel>
  </Collapsible.Root>
</div>
