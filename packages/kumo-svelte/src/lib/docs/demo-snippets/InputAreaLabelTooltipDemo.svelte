<script lang="ts">
  import { InputArea } from 'kumo-svelte/components/input-area';
</script>

<InputArea
  label="Worker Script"
  labelTooltip="Enter your Cloudflare Worker script code here"
  placeholder={'export default { async fetch(request) { ... } }'}
  rows={4}
/>
