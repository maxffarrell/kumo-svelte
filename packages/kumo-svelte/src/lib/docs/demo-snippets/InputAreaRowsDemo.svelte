<script lang="ts">
  import { InputArea } from 'kumo-svelte/components/input-area';
</script>

<div class="flex flex-col gap-4">
  <InputArea label="2 rows" placeholder="Small area" rows={2} />
  <InputArea label="4 rows (default)" placeholder="Medium area" rows={4} />
  <InputArea label="8 rows" placeholder="Large area" rows={8} />
</div>
