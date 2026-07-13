<script lang="ts">
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import Question from 'phosphor-svelte/lib/Question';
  import { InputGroup } from 'kumo-svelte/components/input-group';
</script>

<InputGroup class="w-full max-w-2xs">
  <InputGroup.Addon>
    <MagnifyingGlass />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search with query language..." aria-label="Search" />
  <InputGroup.Addon align="end">
    <InputGroup.Button
      class="text-kumo-subtle"
      icon={Question}
      tooltip="Query language help"
    />
  </InputGroup.Addon>
</InputGroup>
