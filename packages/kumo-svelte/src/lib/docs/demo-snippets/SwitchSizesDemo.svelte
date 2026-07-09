<script lang="ts">
  import { Switch } from 'kumo-svelte/components/switch';
</script>

<div class="flex flex-col gap-4">
  <Switch label="Small" size="sm" checked={true} />
  <Switch label="Base (default)" size="base" checked={true} />
  <Switch label="Large" size="lg" checked={true} />
</div>
