import { getContext, setContext } from "svelte";
const key = Symbol("kumo-popover");
export const setPopoverContext = (value: { readonly open: boolean }) =>
  setContext(key, value);
export const getPopoverContext = () =>
  getContext<{ readonly open: boolean }>(key);
