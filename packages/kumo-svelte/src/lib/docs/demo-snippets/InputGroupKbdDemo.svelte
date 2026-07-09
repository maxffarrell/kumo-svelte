<script lang="ts">
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import { InputGroup } from 'kumo-svelte/components/input-group';
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroup.Addon>
    <MagnifyingGlass />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search..." aria-label="Search" />
  <InputGroup.Addon align="end">
    <kbd class="border-none! bg-none!">⌘K</kbd>
  </InputGroup.Addon>
</InputGroup>
