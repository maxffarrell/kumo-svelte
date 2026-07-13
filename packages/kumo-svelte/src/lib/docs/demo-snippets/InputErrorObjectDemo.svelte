<script lang="ts">
  import { Input } from '$lib/components/input';
  import { Label } from '$lib/components/label';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="w-full max-w-sm space-y-2">
      <Label>Password</Label>
      <Input type="password" value="short" invalid />
      <p class="text-sm text-kumo-danger">Password must be at least 8 characters</p>
    </div>
</div>
