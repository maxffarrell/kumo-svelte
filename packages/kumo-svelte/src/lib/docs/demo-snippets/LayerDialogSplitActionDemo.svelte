<script lang="ts">
  import { LayerDialog, DropdownMenu, Button, Input } from "#lib/index.js";
</script>

<LayerDialog.Root
  ><LayerDialog.Trigger
    >{#snippet child({ props })}<Button {...props}>Edit deployment</Button
      >{/snippet}</LayerDialog.Trigger
  ><LayerDialog.Content
    ><LayerDialog.Title>Save deployment</LayerDialog.Title
    ><LayerDialog.Description
      >Deploy these changes now, or keep them as a draft.</LayerDialog.Description
    ><LayerDialog.Body
      ><form id="deployment-form" onsubmit={(event) => event.preventDefault()}>
        <Input label="Service name" name="serviceName" required />
      </form></LayerDialog.Body
    ><LayerDialog.Actions dismissLabel="Cancel"
      ><LayerDialog.Action
        form="deployment-form"
        type="submit"
        menuLabel="Save options"
        >Save and deploy{#snippet menu()}<DropdownMenu.Item
            >Save as draft</DropdownMenu.Item
          >{/snippet}</LayerDialog.Action
      ></LayerDialog.Actions
    ></LayerDialog.Content
  ></LayerDialog.Root
>
