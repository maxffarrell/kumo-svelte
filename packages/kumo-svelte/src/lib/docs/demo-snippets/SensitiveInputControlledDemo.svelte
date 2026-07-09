<script lang="ts">
  import { SensitiveInput } from 'kumo-svelte/components/sensitive-input';
  import { Button } from 'kumo-svelte/components/button';

  let value = $state('my-secret-value');
</script>

<div class="flex w-80 flex-col gap-4">
  <SensitiveInput
    label="Controlled Secret"
    {value}
    onValueChange={(next) => (value = next)}
  />
  <div class="text-sm text-kumo-subtle">
    Current value: <code class="text-kumo-default">{value}</code>
  </div>
  <div class="flex gap-2">
    <Button
      onclick={() => (value = 'new-secret-' + Date.now())}
      variant="primary"
      size="sm"
    >
      Change value
    </Button>
    <Button onclick={() => (value = '')} variant="secondary" size="sm">
      Clear
    </Button>
  </div>
</div>
