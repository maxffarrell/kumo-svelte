<script lang="ts">
  import { Select } from '$lib';

  let value = $state(['Name', 'Location', 'Size']);

  function formatValue(columns: string | string[]) {
    if (!Array.isArray(columns)) return columns;
    if (columns.length > 3) return `${columns.slice(0, 2).join(', ')} and ${columns.length - 2} more`;
    return columns.join(', ');
  }
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[250px]"
      label="Visible Columns"
      multiple
      bind:value
      renderValue={formatValue}
    >
      <Select.Option value="Name">Name</Select.Option>
      <Select.Option value="Location">Location</Select.Option>
      <Select.Option value="Size">Size</Select.Option>
      <Select.Option value="Read">Read</Select.Option>
      <Select.Option value="Write">Write</Select.Option>
      <Select.Option value="CreatedAt">Created At</Select.Option>
    </Select>
  </div>
</div>
