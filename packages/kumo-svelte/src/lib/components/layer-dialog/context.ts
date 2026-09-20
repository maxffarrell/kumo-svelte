import { getContext, setContext } from 'svelte';

export interface LayerDialogContextValue {
  get alert(): boolean;
  get dismissDisabled(): boolean;
}

const LAYER_DIALOG_CONTEXT = Symbol('kumo-layer-dialog');

export function setLayerDialogContext(context: LayerDialogContextValue) {
  setContext(LAYER_DIALOG_CONTEXT, context);
}

export function getLayerDialogContext(component: string) {
  const context = getContext<LayerDialogContextValue | undefined>(LAYER_DIALOG_CONTEXT);
  if (!context) throw new Error(`${component} must be used inside <LayerDialog>.`);
  return context;
}
