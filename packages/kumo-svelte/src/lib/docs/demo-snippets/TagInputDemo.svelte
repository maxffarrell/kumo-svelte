<script lang="ts">
  import { TagInput } from 'kumo-svelte';
  let recipients = $state(['ava@cloudflare.com']);
</script>

<TagInput
  label="Recipients"
  description="Paste comma- or newline-separated email addresses."
  placeholder="name@example.com"
  bind:value={recipients}
  validateValue={(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)}
/>
