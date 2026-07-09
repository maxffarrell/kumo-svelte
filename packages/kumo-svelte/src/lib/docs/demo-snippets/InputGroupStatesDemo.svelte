<script lang="ts">
  import Eye from 'phosphor-svelte/lib/Eye';
  import EyeSlash from 'phosphor-svelte/lib/EyeSlash';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import { InputGroup } from 'kumo-svelte/components/input-group';

  let show = $state(false);
</script>

<div class="flex w-full max-w-3xs flex-col gap-4">
  <InputGroup
    label="Error State"
    error={{ message: 'Please enter a valid email address', match: true }}
  >
    <InputGroup.Input type="email" value="invalid-email" />
    <InputGroup.Addon align="end">@example.com</InputGroup.Addon>
  </InputGroup>

  <InputGroup label="Disabled" disabled>
    <InputGroup.Addon><MagnifyingGlass /></InputGroup.Addon>
    <InputGroup.Input placeholder="Search..." />
  </InputGroup>

  <InputGroup label="Optional Field" required={false}>
    <InputGroup.Addon>$</InputGroup.Addon>
    <InputGroup.Input placeholder="0.00" />
  </InputGroup>

  <InputGroup
    label="With Description"
    description="Must be at least 8 characters"
    labelTooltip="Your password is stored securely"
  >
    <InputGroup.Input type={show ? 'text' : 'password'} placeholder="Password" />
    <InputGroup.Addon align="end">
      <InputGroup.Button
        class="text-kumo-subtle"
        icon={show ? EyeSlash : Eye}
        aria-label={show ? 'Hide password' : 'Show password'}
        onclick={() => (show = !show)}
      />
    </InputGroup.Addon>
  </InputGroup>
</div>
