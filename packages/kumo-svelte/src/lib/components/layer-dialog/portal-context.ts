import { getContext, setContext } from "svelte";
const key = Symbol("layer-dialog-portal");
export const setLayerDialogPortal = (get: () => HTMLElement | null) =>
  setContext(key, get);
export const getLayerDialogPortal = () =>
  getContext<(() => HTMLElement | null) | undefined>(key);
