<script lang="ts">
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import Question from 'phosphor-svelte/lib/Question';
  import { InputGroup } from 'kumo-svelte/components/input-group';
</script>

<div class="flex w-full max-w-3xs flex-col gap-4">
  <InputGroup size="xs" label="Extra Small">
    <InputGroup.Addon><MagnifyingGlass /></InputGroup.Addon>
    <InputGroup.Input placeholder="Extra small input" />
    <InputGroup.Addon align="end">
      <InputGroup.Button class="text-kumo-subtle" icon={Question} shape="square" aria-label="Help" />
    </InputGroup.Addon>
  </InputGroup>

  <InputGroup size="sm" label="Small">
    <InputGroup.Addon><MagnifyingGlass /></InputGroup.Addon>
    <InputGroup.Input placeholder="Small input" />
    <InputGroup.Addon align="end">
      <InputGroup.Button class="text-kumo-subtle" icon={Question} shape="square" aria-label="Help" />
    </InputGroup.Addon>
  </InputGroup>

  <InputGroup label="Base (default)">
    <InputGroup.Addon><MagnifyingGlass /></InputGroup.Addon>
    <InputGroup.Input placeholder="Base input" />
    <InputGroup.Addon align="end">
      <InputGroup.Button class="text-kumo-subtle" icon={Question} shape="square" aria-label="Help" />
    </InputGroup.Addon>
  </InputGroup>

  <InputGroup size="lg" label="Large">
    <InputGroup.Addon><MagnifyingGlass /></InputGroup.Addon>
    <InputGroup.Input placeholder="Large input" />
    <InputGroup.Addon align="end">
      <InputGroup.Button class="text-kumo-subtle" icon={Question} shape="square" aria-label="Help" />
    </InputGroup.Addon>
  </InputGroup>
</div>
