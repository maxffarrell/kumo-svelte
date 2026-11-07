import { getContext, setContext } from "svelte";
const key = Symbol("kumo-dropdown-sub");
export const setDropdownSub = (value = true) => setContext(key, value);
export const getDropdownSub = () => getContext<boolean>(key) ?? false;

const openKey = Symbol("kumo-dropdown-open");
export const setDropdownOpen = (get: () => boolean) => setContext(openKey, get);
export const getDropdownOpen = () => getContext<(() => boolean) | undefined>(openKey);
