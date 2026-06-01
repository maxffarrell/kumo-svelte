import { getContext, setContext } from 'svelte';

export type InputGroupSize = 'xs' | 'sm' | 'base' | 'lg';
export type InputGroupFocusMode = 'container' | 'individual' | 'hybrid';
export type ErrorMatch = keyof ValidityState | true;
export type FieldError = string | { message: string; match: ErrorMatch };

export interface InputGroupSizeTokens {
  inputOuter: string;
  addonOuterStart: string;
  addonOuterEnd: string;
  addonButtonOuterStart: string;
  addonButtonOuterEnd: string;
  suffixPad: string;
  fontSize: string;
  addonIconSize: string;
  addonLoaderSize: string;
  iconSize: string;
}

export const INPUT_GROUP_SIZE: Record<InputGroupSize, InputGroupSizeTokens> = {
  xs: {
    inputOuter: 'px-1.5',
    addonOuterStart: 'pl-1.5',
    addonOuterEnd: 'pr-1.5',
    addonButtonOuterStart: 'pl-1',
    addonButtonOuterEnd: 'pr-1',
    suffixPad: 'pr-1.5',
    fontSize: 'text-xs',
    addonIconSize: '[&>svg]:size-2.5',
    addonLoaderSize: '[&>svg[role=status]]:size-2.5!',
    iconSize: 'size-2.5'
  },
  sm: {
    inputOuter: 'px-2',
    addonOuterStart: 'pl-1.5',
    addonOuterEnd: 'pr-1.5',
    addonButtonOuterStart: 'pl-1',
    addonButtonOuterEnd: 'pr-1',
    suffixPad: 'pr-2',
    fontSize: 'text-xs',
    addonIconSize: '[&>svg]:size-3.5',
    addonLoaderSize: '[&>svg[role=status]]:size-3.5!',
    iconSize: 'size-3.5'
  },
  base: {
    inputOuter: 'px-3',
    addonOuterStart: 'pl-2',
    addonOuterEnd: 'pr-2',
    addonButtonOuterStart: 'pl-1',
    addonButtonOuterEnd: 'pr-1',
    suffixPad: 'pr-3',
    fontSize: 'text-base',
    addonIconSize: '[&>svg]:size-4.5',
    addonLoaderSize: '[&>svg[role=status]]:size-4.5!',
    iconSize: 'size-4.5'
  },
  lg: {
    inputOuter: 'px-4',
    addonOuterStart: 'pl-2.5',
    addonOuterEnd: 'pr-2.5',
    addonButtonOuterStart: 'pl-1.5',
    addonButtonOuterEnd: 'pr-1.5',
    suffixPad: 'pr-4',
    fontSize: 'text-base',
    addonIconSize: '[&>svg]:size-5',
    addonLoaderSize: '[&>svg[role=status]]:size-5!',
    iconSize: 'size-5'
  }
};

export const INPUT_GROUP_HAS_CLASSES: Record<InputGroupSize, string> = {
  xs: [
    'has-[[data-slot=input-group-addon-start]]:[&_input]:pl-0.5',
    'has-[[data-slot=input-group-addon-end]]:[&_input]:pr-1'
  ].join(' '),
  sm: [
    'has-[[data-slot=input-group-addon-start]]:[&_input]:pl-1',
    'has-[[data-slot=input-group-addon-end]]:[&_input]:pr-1.5'
  ].join(' '),
  base: [
    'has-[[data-slot=input-group-addon-start]]:[&_input]:pl-1.5',
    'has-[[data-slot=input-group-addon-end]]:[&_input]:pr-2'
  ].join(' '),
  lg: [
    'has-[[data-slot=input-group-addon-start]]:[&_input]:pl-2',
    'has-[[data-slot=input-group-addon-end]]:[&_input]:pr-2.5'
  ].join(' ')
};

export interface InputGroupContextValue {
  size: InputGroupSize;
  focusMode: InputGroupFocusMode;
  disabled: boolean;
  error?: FieldError;
  inputId: string;
  describedBy?: string;
}

const INPUT_GROUP_CONTEXT = 'kumo-input-group';
const INPUT_GROUP_ADDON_CONTEXT = 'kumo-input-group-addon';

export function setInputGroupContext(context: InputGroupContextValue) {
  setContext(INPUT_GROUP_CONTEXT, context);
}

export function getInputGroupContext() {
  return getContext<InputGroupContextValue | undefined>(INPUT_GROUP_CONTEXT);
}

export function setInputGroupAddonContext(value: boolean) {
  setContext(INPUT_GROUP_ADDON_CONTEXT, value);
}

export function getInputGroupAddonContext() {
  return getContext<boolean | undefined>(INPUT_GROUP_ADDON_CONTEXT) ?? false;
}
