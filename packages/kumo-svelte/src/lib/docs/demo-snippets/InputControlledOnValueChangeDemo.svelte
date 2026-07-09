<script lang="ts">
  import { Input } from '$lib/components/input';
  import { Label } from '$lib/components/label';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="w-full max-w-sm space-y-2"><Label>{'With onValueChange'}</Label><Input placeholder="Type something..." /><p class="text-sm text-kumo-subtle">{'Receives the value directly'}</p></div>
</div>
