<script lang="ts">
  import { SensitiveInput } from 'kumo-svelte/components/sensitive-input';
</script>

<div class="flex w-80 flex-col gap-4">
  <SensitiveInput
    label="Error State"
    variant="error"
    defaultValue="invalid-key"
    error="This API key is not valid"
  />
  <SensitiveInput label="Disabled" defaultValue="cannot-edit" disabled />
  <SensitiveInput
    label="Read-only"
    defaultValue="view-only-secret-key"
    readOnly
  />
  <SensitiveInput
    label="With Description"
    defaultValue="my-secret-value"
    description="Keep this value secure and don't share it"
  />
</div>
