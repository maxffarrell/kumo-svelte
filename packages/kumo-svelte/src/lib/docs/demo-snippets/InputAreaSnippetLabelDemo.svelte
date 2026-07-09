<script lang="ts">
  import { InputArea } from 'kumo-svelte/components/input-area';
</script>

{#snippet label()}
  Notes for <strong>review</strong>
{/snippet}

<InputArea
  {label}
  required
  placeholder="Add notes for the reviewer..."
  rows={3}
/>
