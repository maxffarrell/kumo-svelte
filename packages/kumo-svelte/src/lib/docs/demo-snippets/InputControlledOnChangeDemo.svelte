<script lang="ts">
  import { Input, Label } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="w-full max-w-sm space-y-2"><Label>{'With onChange'}</Label><Input placeholder="Type something..." /><p class="text-sm text-kumo-subtle">{'Uses e.target.value'}</p></div>
</div>
