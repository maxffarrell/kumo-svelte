import Root from './Toolbar.svelte';
import Button from './ToolbarButton.svelte';
import Link from './ToolbarLink.svelte';
import Input from './ToolbarInput.svelte';
import InputGroup from './ToolbarInputGroup.svelte';

const Toolbar = Object.assign(Root, {
  Root,
  Button,
  Link,
  Input,
  InputGroup
}) as typeof Root & {
  Root: typeof Root;
  Button: typeof Button;
  Link: typeof Link;
  Input: typeof Input;
  InputGroup: typeof InputGroup;
};

export {
  Toolbar,
  Root as ToolbarRoot,
  Button as ToolbarButton,
  Link as ToolbarLink,
  Input as ToolbarInput,
  InputGroup as ToolbarInputGroup
};

export {
  KUMO_TOOLBAR_DEFAULT_VARIANTS,
  KUMO_TOOLBAR_VARIANTS,
  type ToolbarSize
} from './context';
export type { Props as ToolbarProps } from './Toolbar.svelte';
export type { Props as ToolbarButtonProps } from './ToolbarButton.svelte';
export type { Props as ToolbarLinkProps } from './ToolbarLink.svelte';
export type { Props as ToolbarInputProps } from './ToolbarInput.svelte';
export type { Props as ToolbarInputGroupProps } from './ToolbarInputGroup.svelte';
