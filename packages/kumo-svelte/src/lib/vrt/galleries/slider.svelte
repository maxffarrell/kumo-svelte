<script lang="ts">
  import { Slider } from "#lib/components/slider/index.js";
  import Scenario from "../Scenario.svelte";
</script>

<Scenario id="default" label="default"
  ><div class="w-72"><Slider label="Volume" defaultValue={40} /></div></Scenario
>
<Scenario id="small" label="small"
  ><div class="w-72">
    <Slider label="Match count" size="sm" defaultValue={2} max={5} />
  </div></Scenario
>
<Scenario id="range" label="range"
  ><div class="w-72">
    <Slider label="Price" defaultValue={[25, 75]} />
  </div></Scenario
>
<Scenario id="disabled" label="disabled"
  ><div class="w-72">
    <Slider label="Disabled" defaultValue={50} disabled />
  </div></Scenario
>
<Scenario
  id="focus"
  label="keyboard focus"
  interact={[{ type: "press", key: "Tab" }]}
  ><div class="w-72">
    <Slider label="Focused" defaultValue={50} />
  </div></Scenario
>
