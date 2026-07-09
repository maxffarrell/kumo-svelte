<script lang="ts">
  import { Label } from 'kumo-svelte/components/label';
</script>

<div class="flex flex-col gap-3">
  <Label>Default</Label>
  <Label showOptional>Optional</Label>
  <Label tooltip="Important field">With Tooltip</Label>
</div>
