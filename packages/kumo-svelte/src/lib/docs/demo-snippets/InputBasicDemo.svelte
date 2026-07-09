<script lang="ts">
  import { Input } from 'kumo-svelte/components/input';
  import { Label } from 'kumo-svelte/components/label';
</script>

<div class="space-y-2">
  <Label>Email</Label>
  <Input placeholder="you@example.com" />
  <p class="text-sm text-kumo-subtle">We'll never share your email</p>
</div>
