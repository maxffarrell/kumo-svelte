<script lang="ts">
  import { CheckCircle, XCircle } from 'phosphor-svelte';
  import { InputGroup } from 'kumo-svelte';
</script>

<div class="flex w-full max-w-2xs flex-col gap-4">
  <InputGroup label="Subdomain">
    <InputGroup.Input aria-label="Subdomain" value="kumo" maxlength={20} />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
    <InputGroup.Addon align="end">
      <CheckCircle weight="duotone" class="text-kumo-success" />
    </InputGroup.Addon>
  </InputGroup>

  <InputGroup
    label="Subdomain"
    error={{ message: 'This subdomain is unavailable', match: true }}
  >
    <InputGroup.Input aria-label="Subdomain" value="kumo" maxlength={20} />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
    <InputGroup.Addon align="end">
      <XCircle weight="duotone" class="text-kumo-danger" />
    </InputGroup.Addon>
  </InputGroup>
</div>
