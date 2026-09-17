<script lang="ts">
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import { Button } from 'kumo-svelte/components/button';
  import { ButtonGroup } from 'kumo-svelte/components/button-group';
</script>

<ButtonGroup aria-label="Deploy">
  <Button variant="primary">Deploy</Button>
  <Button variant="primary" shape="square" aria-label="More deploy options" icon={CaretDown} />
</ButtonGroup>
