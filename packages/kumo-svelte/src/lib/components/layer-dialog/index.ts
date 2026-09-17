import Root from './LayerDialogRoot.svelte';
import Alert from './LayerDialogAlert.svelte';
import Trigger from './LayerDialogTrigger.svelte';
import Content from './LayerDialogContent.svelte';
import Title from './LayerDialogTitle.svelte';
import Description from './LayerDialogDescription.svelte';
import Body from './LayerDialogBody.svelte';
import ActionsRoot from './LayerDialogActions.svelte';
import Primary from './LayerDialogPrimary.svelte';

const Actions = Object.assign(ActionsRoot, { Primary });

export const LayerDialog = Object.assign(Root, {
  Root,
  Alert,
  Trigger,
  Content,
  Title,
  Description,
  Body,
  Actions
});

export {
  Root as LayerDialogRoot,
  Alert as LayerDialogAlert,
  Trigger as LayerDialogTrigger,
  Content as LayerDialogContent,
  Title as LayerDialogTitle,
  Description as LayerDialogDescription,
  Body as LayerDialogBody,
  Actions as LayerDialogActions,
  Primary as LayerDialogPrimary
};
export {
  KUMO_LAYER_DIALOG_DEFAULT_VARIANTS,
  KUMO_LAYER_DIALOG_VARIANTS
} from './LayerDialogContent.svelte';
export type { KumoLayerDialogSize, KumoLayerDialogVerticalAlign } from './LayerDialogContent.svelte';
