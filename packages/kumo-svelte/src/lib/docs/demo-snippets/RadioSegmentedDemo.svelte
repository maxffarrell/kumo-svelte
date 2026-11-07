<script lang="ts">
  import { Radio } from "#lib/index.js";
</script>

<Radio.Group legend="View" appearance="segmented" value="list"
  ><Radio.Item label="List" value="list" /><Radio.Item
    label="Grid"
    value="grid"
  /><Radio.Item label="Map" value="map" disabled /></Radio.Group
>
