<script lang="ts">
  import {
    KumoLocaleProvider,
    TooltipProvider,
    Label,
    Checkbox,
    Radio,
    LayerDialog,
    DropdownMenu,
    Input,
  } from "#lib/index.js";
  let { translated = true }: { translated?: boolean } = $props();
</script>

<TooltipProvider>
  <KumoLocaleProvider
    translations={translated
      ? { label: { optional: "(opcional)", tooltip: "Más información" } }
      : {}}
  >
    <Label showOptional tooltip="Ayuda">Nombre</Label><Input
      label="Correo"
      required={false}
    />
  </KumoLocaleProvider>
</TooltipProvider>
<Checkbox.Group appearance="card" legend="Channels" orientation="horizontal"
  ><Checkbox.Item
    label="Email"
    description="Email notices"
    value="email"
  /><Checkbox.Item
    label="SMS"
    description="Text notices"
    value="sms"
  /></Checkbox.Group
>
<Radio.Group appearance="segmented" legend="View" value="list"
  ><Radio.Item value="list" label="List" /><Radio.Item
    value="grid"
    label="Grid"
  /></Radio.Group
>
<LayerDialog
  ><LayerDialog.Trigger>Open split dialog</LayerDialog.Trigger
  ><LayerDialog.Content
    ><LayerDialog.Title>Save deployment</LayerDialog.Title
    ><LayerDialog.Description>Choose a save outcome.</LayerDialog.Description
    ><LayerDialog.Body>Deployment settings</LayerDialog.Body
    ><LayerDialog.Actions
      ><LayerDialog.Action menuLabel="Save options"
        >Save{#snippet menu()}<DropdownMenu.Item>Save draft</DropdownMenu.Item
          >{/snippet}</LayerDialog.Action
      ></LayerDialog.Actions
    ></LayerDialog.Content
  ></LayerDialog
>
