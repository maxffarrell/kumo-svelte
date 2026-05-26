<script lang="ts">
  import { Input, Label } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="flex w-full max-w-sm flex-col gap-4">
      <div class="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="you@example.com" /></div>
      <div class="space-y-1.5"><Label>Password</Label><Input type="password" placeholder="••••••••" /></div>
      <div class="space-y-1.5"><Label>Age</Label><Input type="number" placeholder="18" /></div>
      <div class="space-y-1.5"><Label>Phone</Label><Input type="tel" placeholder="+1 (555) 000-0000" /></div>
    </div>
</div>
