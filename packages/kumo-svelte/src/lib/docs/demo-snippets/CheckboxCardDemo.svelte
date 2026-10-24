<script lang="ts">
  import { Checkbox } from "#lib/index.js";
</script>

<Checkbox.Group
  legend="Notifications"
  appearance="card"
  orientation="horizontal"
  ><Checkbox.Item
    label="Email"
    description="Receive email updates"
    value="email"
  /><Checkbox.Item
    label="SMS"
    description="Receive text updates"
    value="sms"
  /><Checkbox.Item
    label="Push"
    description="Receive push updates"
    value="push"
    disabled
  /></Checkbox.Group
>
