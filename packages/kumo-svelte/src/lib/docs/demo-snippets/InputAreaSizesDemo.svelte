<script lang="ts">
  import { InputArea } from 'kumo-svelte/components/input-area';
</script>

<div class="flex flex-col gap-4">
  <InputArea size="xs" label="Extra Small" placeholder="Extra small textarea" />
  <InputArea size="sm" label="Small" placeholder="Small textarea" />
  <InputArea label="Base" placeholder="Base textarea (default)" />
  <InputArea size="lg" label="Large" placeholder="Large textarea" />
</div>
