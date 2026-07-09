<script lang="ts">
  import Eye from 'phosphor-svelte/lib/Eye';
  import EyeSlash from 'phosphor-svelte/lib/EyeSlash';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import X from 'phosphor-svelte/lib/X';
  import { InputGroup } from 'kumo-svelte/components/input-group';

  let show = $state(false);
  let searchValue = $state('search');
</script>

<div class="flex flex-col gap-4">
  <InputGroup class="w-full max-w-3xs">
    <InputGroup.Input type={show ? 'text' : 'password'} value="password" aria-label="Password" />
    <InputGroup.Addon align="end">
      <InputGroup.Button
        class="text-kumo-subtle"
        icon={show ? EyeSlash : Eye}
        aria-label={show ? 'Hide password' : 'Show password'}
        onclick={() => (show = !show)}
      />
    </InputGroup.Addon>
  </InputGroup>

  <InputGroup class="w-full max-w-3xs">
    <InputGroup.Addon>
      <MagnifyingGlass />
    </InputGroup.Addon>
    <InputGroup.Input bind:value={searchValue} placeholder="Search" aria-label="Search" />
    {#if searchValue}
      <InputGroup.Addon align="end" class="pr-1">
        <InputGroup.Button aria-label="Clear search" onclick={() => (searchValue = '')}>
          <X />
        </InputGroup.Button>
      </InputGroup.Addon>
    {/if}
    <InputGroup.Button variant="secondary">Search</InputGroup.Button>
  </InputGroup>
</div>
