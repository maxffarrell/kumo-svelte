<script lang="ts">
  import { Radio } from '$lib';
</script>

<div class="grid grid-cols-2 gap-6">
  <Radio.Group legend="Disabled group" disabled defaultValue="a">
    <Radio.Item label="Option A" value="a" />
    <Radio.Item label="Option B" value="b" />
  </Radio.Group>
  <Radio.Group legend="Individual disabled" defaultValue="available">
    <Radio.Item label="Available" value="available" />
    <Radio.Item label="Unavailable" value="unavailable" disabled />
  </Radio.Group>
  <Radio.Group legend="Disabled card group" appearance="card" disabled defaultValue="a">
    <Radio.Item label="Option A" description="This option is disabled." value="a" />
    <Radio.Item label="Option B" description="This option is disabled." value="b" />
  </Radio.Group>
  <Radio.Group legend="Individual disabled card" appearance="card" defaultValue="available">
    <Radio.Item
      label="Available"
      description="This option can be selected."
      value="available"
    />
    <Radio.Item
      label="Unavailable"
      description="This option is not available."
      value="unavailable"
      disabled
    />
  </Radio.Group>
</div>
