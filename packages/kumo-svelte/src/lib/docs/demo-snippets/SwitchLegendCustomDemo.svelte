<script lang="ts">
  import { Switch } from 'kumo-svelte/components/switch';
</script>

<Switch.Group>
  <Switch.Legend class="text-sm font-normal text-kumo-subtle">
    Notification settings
  </Switch.Legend>
  <Switch.Item label="Email notifications" />
  <Switch.Item label="SMS notifications" />
  <Switch.Item label="Push notifications" />
</Switch.Group>
