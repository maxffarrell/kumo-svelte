<script lang="ts">
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import { Button } from '$lib/components/button';
  import { ButtonGroup } from '$lib/components/button-group';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>
<Scenario id="primary" label="primary">
  <ButtonGroup aria-label="Deploy"><Button variant="primary">Deploy</Button><Button variant="primary" shape="square" aria-label="More" icon={CaretDown} /></ButtonGroup>
</Scenario>
<Scenario id="secondary" label="secondary">
  <ButtonGroup aria-label="Save"><Button>Save</Button><Button shape="square" aria-label="More" icon={CaretDown} /></ButtonGroup>
</Scenario>
<Scenario id="focus" label="focus" interact={[{ type: 'focus', selector: 'button:last-child' }]}>
  <ButtonGroup aria-label="Deploy"><Button>Deploy</Button><Button shape="square" aria-label="More" icon={CaretDown} /></ButtonGroup>
</Scenario>
