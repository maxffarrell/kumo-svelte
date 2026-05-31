import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import DropdownMenuRoot, {
  KUMO_DROPDOWN_DEFAULT_VARIANTS,
  KUMO_DROPDOWN_VARIANTS,
  type KumoDropdownPart,
  type KumoDropdownVariant
} from './DropdownMenu.svelte';

export {
  KUMO_DROPDOWN_DEFAULT_VARIANTS,
  KUMO_DROPDOWN_VARIANTS,
  type KumoDropdownVariant
};

const part = (part: KumoDropdownPart) =>
  ((anchor, props = {}) =>
    DropdownMenuRoot(anchor, {
      ...props,
      __part: part
    })) as typeof DropdownMenuRoot;

const DropdownMenuTrigger = part('trigger');
const DropdownMenuContent = part('content');
const DropdownMenuItem = part('item');
const DropdownMenuCheckboxItem = part('checkbox-item');
const DropdownMenuLabel = part('label');
const DropdownMenuRadioItem = part('radio-item');
const DropdownMenuRadioItemIndicator = part('radio-item-indicator');
const DropdownMenuSeparator = part('separator');
const DropdownMenuShortcut = part('shortcut');
const DropdownMenuSubContent = part('sub-content');
const DropdownMenuSubTrigger = part('sub-trigger');

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPrimitive.Portal,
  Sub: DropdownMenuPrimitive.Sub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  LinkItem: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  CheckboxGroup: DropdownMenuPrimitive.CheckboxGroup,
  RadioGroup: DropdownMenuPrimitive.RadioGroup,
  RadioItem: DropdownMenuRadioItem,
  RadioItemIndicator: DropdownMenuRadioItemIndicator,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuPrimitive.Group
}) as typeof DropdownMenuRoot & {
  Trigger: typeof DropdownMenuRoot;
  Portal: typeof DropdownMenuPrimitive.Portal;
  Sub: typeof DropdownMenuPrimitive.Sub;
  SubTrigger: typeof DropdownMenuRoot;
  SubContent: typeof DropdownMenuRoot;
  Content: typeof DropdownMenuRoot;
  Item: typeof DropdownMenuRoot;
  LinkItem: typeof DropdownMenuRoot;
  CheckboxItem: typeof DropdownMenuRoot;
  CheckboxGroup: typeof DropdownMenuPrimitive.CheckboxGroup;
  RadioGroup: typeof DropdownMenuPrimitive.RadioGroup;
  RadioItem: typeof DropdownMenuRoot;
  RadioItemIndicator: typeof DropdownMenuRoot;
  Label: typeof DropdownMenuRoot;
  Separator: typeof DropdownMenuRoot;
  Shortcut: typeof DropdownMenuRoot;
  Group: typeof DropdownMenuPrimitive.Group;
};

export default DropdownMenu;
