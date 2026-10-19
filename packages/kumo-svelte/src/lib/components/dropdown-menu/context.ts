import { getContext, setContext } from 'svelte';
const key = Symbol('kumo-dropdown-sub');
export const setDropdownSub = () => setContext(key, true);
export const getDropdownSub = () => getContext<boolean>(key) ?? false;
