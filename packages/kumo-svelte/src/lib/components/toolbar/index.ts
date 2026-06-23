import Root from './Toolbar.svelte';
import Button from './ToolbarButton.svelte';
import Input from './ToolbarInput.svelte';
import InputGroup from './ToolbarInputGroup.svelte';

const Toolbar = Object.assign(Root, {
  Root,
  Button,
  Input,
  InputGroup
}) as typeof Root & {
  Root: typeof Root;
  Button: typeof Button;
  Input: typeof Input;
  InputGroup: typeof InputGroup;
};

export {
  Toolbar,
  Root as ToolbarRoot,
  Button as ToolbarButton,
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
export type { Props as ToolbarInputProps } from './ToolbarInput.svelte';
export type { Props as ToolbarInputGroupProps } from './ToolbarInputGroup.svelte';
