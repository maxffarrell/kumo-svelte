import type { Component } from 'svelte';
import Root from './InputGroup.svelte';

type InputGroupComponent = Component<Record<string, unknown>>;

const InputComponent: InputGroupComponent = (internals, props) =>
  Root(internals, { ...props, __part: 'input' });
const AddonComponent: InputGroupComponent = (internals, props) =>
  Root(internals, { ...props, __part: 'addon' });
const ButtonComponent: InputGroupComponent = (internals, props) =>
  Root(internals, { ...props, __part: 'button' });
const SuffixComponent: InputGroupComponent = (internals, props) =>
  Root(internals, { ...props, __part: 'suffix' });

const InputGroup = Object.assign(Root, {
  Root,
  Input: InputComponent,
  Addon: AddonComponent,
  Button: ButtonComponent,
  Suffix: SuffixComponent
}) as typeof Root & {
  Root: typeof Root;
  Input: typeof InputComponent;
  Addon: typeof AddonComponent;
  Button: typeof ButtonComponent;
  Suffix: typeof SuffixComponent;
};

export {
  InputGroup,
  InputComponent as InputGroupInput,
  AddonComponent as InputGroupAddon,
  ButtonComponent as InputGroupButton,
  SuffixComponent as InputGroupSuffix
};
export type { FieldError, InputGroupFocusMode, InputGroupSize } from './context';
