<script lang="ts">
  import { InlineCopyText } from '$lib/components/inline-copy-text';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="default" label="default">
  <InlineCopyText value="f86b3f10-32e9-4db7-ae95-84a1b2c3d4e5">f86b3f10-32e9-4db7-ae95-84a1b2c3d4e5</InlineCopyText>
</Scenario>

<Scenario id="resource-row" label="resource row">
  <div class="group flex w-[36rem] items-center justify-between gap-4 rounded-lg bg-kumo-base px-4 py-3 ring ring-kumo-line">
    <span class="min-w-0 truncate text-sm text-kumo-default">Production database</span>
    <InlineCopyText value="f86b3f10-32e9-4db7-ae95-84a1b2c3d4e5">f86b3f10-32e9-4db7-ae95-84a1b2c3d4e5</InlineCopyText>
  </div>
</Scenario>

<Scenario id="copied" label="copied" interact={[{ type: 'click' }]}>
  <InlineCopyText value="namespace-id">namespace-id</InlineCopyText>
</Scenario>
