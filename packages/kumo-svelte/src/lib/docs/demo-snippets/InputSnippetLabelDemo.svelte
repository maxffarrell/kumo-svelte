<script lang="ts">
  import { Input } from '$lib/components/input';
  import { Label } from '$lib/components/label';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="w-full max-w-sm space-y-2">
      <Label>Email for <strong>billing</strong> <span class="text-kumo-danger">*</span></Label>
      <Input placeholder="billing@company.com" type="email" />
    </div>
</div>
