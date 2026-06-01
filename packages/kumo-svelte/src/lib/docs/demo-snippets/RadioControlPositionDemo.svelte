<script lang="ts">
  import { Radio } from '$lib';
</script>

<Radio.Group legend="Preferences" controlPosition="end" defaultValue="a">
  <Radio.Item label="Label before radio" value="a" />
  <Radio.Item label="Another option" value="b" />
</Radio.Group>
