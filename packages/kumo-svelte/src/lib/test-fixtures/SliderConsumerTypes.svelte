<script lang="ts">
  import { Slider } from "#lib/index.js";
  let volume = $state(30);
  let range = $state([20, 80]);
  const scalar = (next: number) => {
    volume = next;
  };
  const multiple = (next: number[]) => {
    range = next;
  };
</script>

<Slider label="Typed volume" bind:value={volume} onValueChange={scalar} />
<Slider label="Typed range" bind:value={range} onValueChange={multiple} />
