<script lang="ts">
  import { Input, Label } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="w-full max-w-sm space-y-2">
      <Label>Email</Label>
      <Input value="invalid-email" invalid />
      <p class="text-sm text-kumo-danger">Please enter a valid email address</p>
    </div>
</div>
