<script lang="ts">
  import { InputGroup } from 'kumo-svelte/components/input-group';
</script>

<div class="flex flex-col gap-4">
  <InputGroup class="w-full max-w-3xs">
    <InputGroup.Addon>@</InputGroup.Addon>
    <InputGroup.Input placeholder="username" aria-label="Username" />
  </InputGroup>

  <InputGroup class="w-full max-w-3xs">
    <InputGroup.Input placeholder="email" aria-label="Email" />
    <InputGroup.Addon align="end">@example.com</InputGroup.Addon>
  </InputGroup>

  <InputGroup class="w-full max-w-3xs">
    <InputGroup.Addon>/api/</InputGroup.Addon>
    <InputGroup.Input placeholder="endpoint" aria-label="API path" />
    <InputGroup.Addon align="end">.json</InputGroup.Addon>
  </InputGroup>
</div>
