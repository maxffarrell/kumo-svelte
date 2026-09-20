<script lang="ts">
  import { TagInput } from '$lib/components/tag-input';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="default" label="default">
  <TagInput aria-label="Tags" placeholder="Add a tag" class="w-[360px]" />
</Scenario>
<Scenario id="values" label="values">
  <TagInput label="Labels" defaultValue={['frontend', 'priority']} class="w-[360px]" />
</Scenario>
<Scenario id="error" label="error">
  <TagInput label="Recipients" error="Enter a valid recipient" defaultValue={['ava@cloudflare.com']} class="w-[360px]" />
</Scenario>
<Scenario id="disabled" label="disabled">
  <TagInput aria-label="Tags" defaultValue={['locked']} disabled class="w-[360px]" />
</Scenario>
<Scenario id="focus" label="focus" interact={[{ type: 'focus', selector: 'input' }]}>
  <TagInput aria-label="Tags" defaultValue={['frontend']} class="w-[360px]" />
</Scenario>
