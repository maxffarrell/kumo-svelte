<script lang="ts">
  import { Label } from 'kumo-svelte/components/label';
</script>

<div class="flex flex-col gap-4">
  <Label>Default Label</Label>
  <Label showOptional>Optional Label</Label>
  <Label tooltip="More information about this field">
    Label with Tooltip
  </Label>
</div>
