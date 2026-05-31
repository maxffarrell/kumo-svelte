<script lang="ts">
  import { Select, Text } from '$lib';

  const authors = [
    { id: 'ada', name: 'Ada Lovelace', title: 'Mathematician' },
    { id: 'grace', name: 'Grace Hopper', title: 'Computer Scientist' },
    { id: 'katherine', name: 'Katherine Johnson', title: 'NASA Mathematician' }
  ];

  let value = $state('');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[200px]"
      label="Author"
      description="Select the primary author for this document"
      placeholder="Select an author"
      bind:value
      renderValue={(selected) => authors.find((author) => author.id === selected)?.name ?? String(selected)}
    >
      {#each authors as author (author.id)}
        <Select.Option value={author.id} labelValue={author.name}>
          <div class="flex w-[300px] items-center justify-between gap-2">
            <Text>{author.name}</Text>
            <Text variant="secondary">{author.title}</Text>
          </div>
        </Select.Option>
      {/each}
    </Select>
  </div>
</div>
