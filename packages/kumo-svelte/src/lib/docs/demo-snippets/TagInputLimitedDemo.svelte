<script lang="ts">
  import { TagInput } from 'kumo-svelte';
</script>

<TagInput
  defaultValue={['alpha']}
  label="Access groups"
  maxValues={3}
  description="A maximum of three groups."
  placeholder="Type a group name"
/>
