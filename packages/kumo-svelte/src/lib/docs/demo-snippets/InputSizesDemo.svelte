<script lang="ts">
  import { Input, Label } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="flex w-full max-w-sm flex-col gap-4">
      <div class="space-y-1.5"><Label>Extra Small</Label><Input size="xs" placeholder="Extra small input" /></div>
      <div class="space-y-1.5"><Label>Small</Label><Input size="sm" placeholder="Small input" /></div>
      <div class="space-y-1.5"><Label>Base</Label><Input placeholder="Base input (default)" /></div>
      <div class="space-y-1.5"><Label>Large</Label><Input size="lg" placeholder="Large input" /></div>
    </div>
</div>
