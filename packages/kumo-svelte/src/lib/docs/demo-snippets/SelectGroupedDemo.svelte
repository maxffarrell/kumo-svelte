<script lang="ts">
  import { Select } from '$lib';

  const foods = {
    fruits: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' }
    ],
    vegetables: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' }
    ]
  };

  let value = $state('');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[220px]"
      label="Food"
      placeholder="Pick a food..."
      bind:value
    >
      <Select.Group>
        <Select.GroupLabel>Fruits</Select.GroupLabel>
        {#each foods.fruits as food (food.value)}
          <Select.Option value={food.value}>{food.label}</Select.Option>
        {/each}
      </Select.Group>
      <Select.Separator />
      <Select.Group>
        <Select.GroupLabel>Vegetables</Select.GroupLabel>
        {#each foods.vegetables as food (food.value)}
          <Select.Option value={food.value}>{food.label}</Select.Option>
        {/each}
      </Select.Group>
    </Select>
  </div>
</div>
