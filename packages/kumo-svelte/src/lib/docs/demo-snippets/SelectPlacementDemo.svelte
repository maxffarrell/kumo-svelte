<script lang="ts">
  import { Select } from 'kumo-svelte/components/select';

  const planets = {
    mercury: 'Mercury',
    venus: 'Venus',
    earth: 'Earth',
    mars: 'Mars',
    jupiter: 'Jupiter',
    saturn: 'Saturn',
    uranus: 'Uranus'
  };
</script>

<div class="grid gap-4 sm:grid-cols-2">
  <Select label="side=bottom (default)" class="w-[200px]" value="earth" items={planets} />
  <Select label="side=top" side="top" class="w-[200px]" value="earth" items={planets} />
  <Select label="align=end" align="end" class="w-[200px]" value="earth" items={planets} />
  <Select label="sideOffset=12" sideOffset={12} class="w-[200px]" value="earth" items={planets} />
</div>
