<script lang="ts">
 import { ClipboardText, DatePicker, LayerDialog, TagInput, Toasty, Button, Tooltip, TooltipProvider, createKumoToastManager } from '#lib/index.js';
 const manager = createKumoToastManager();
</script>
<TooltipProvider>
 <h2>Release 2.17 consumer contracts</h2>
 <ClipboardText text="release-secret" masked />
 <form id="tag-release"></form>
 <TagInput aria-label="Form tags" name="tags" form="tag-release" defaultValue={['alpha','beta']} readOnly />
 <Tooltip disabled content="Disabled tooltip"><span>Disabled default trigger</span></Tooltip>
 <div class="p-3"><DatePicker month={new Date(2026,10,1)} mode="range" selected={{from:new Date(2026,10,5),to:new Date(2026,10,10)}} /></div>
 <div dir="rtl" class="p-3"><DatePicker month={new Date(2026,10,1)} mode="range" selected={{from:new Date(2026,10,5),to:new Date(2026,10,10)}} /></div>
 <LayerDialog>
  <LayerDialog.Trigger>{#snippet child({props})}<Button {...props}>Review separator</Button>{/snippet}</LayerDialog.Trigger>
  <LayerDialog.Content><LayerDialog.Title>Release review</LayerDialog.Title><LayerDialog.Body>First section<LayerDialog.Separator />Second section</LayerDialog.Body></LayerDialog.Content>
 </LayerDialog>
 <Toasty toastManager={manager} />
 <Button onclick={() => manager.add({id:'repeat',title:'Original notification',timeout:0,actions:[{children:'Repeat notification',onClick:()=>manager.add({id:'repeat',title:'Replacement'})}]})}>Add notification</Button>
</TooltipProvider>
