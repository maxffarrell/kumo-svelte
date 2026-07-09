<script lang="ts">
  import { Switch } from 'kumo-svelte/components/switch';
</script>

<div class="flex flex-col gap-4">
  <Switch label="Neutral off" variant="neutral" checked={false} />
  <Switch label="Neutral on" variant="neutral" checked={true} />
  <Switch label="Neutral disabled" variant="neutral" checked={false} disabled />
</div>
