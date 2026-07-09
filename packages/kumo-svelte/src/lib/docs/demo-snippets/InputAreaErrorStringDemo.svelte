<script lang="ts">
  import { InputArea } from 'kumo-svelte/components/input-area';
</script>

<InputArea
  label="Message"
  placeholder="Enter your message"
  value="Hi"
  error="Message must be at least 10 characters"
/>
