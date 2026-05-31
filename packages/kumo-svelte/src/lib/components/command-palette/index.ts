import { Command as CommandPrimitive } from 'bits-ui';
import CommandPaletteRoot, {
  Dialog,
  Empty,
  Footer,
  Group,
  GroupLabel,
  HighlightedText,
  Input,
  Item,
  Items,
  List,
  Loading,
  Panel,
  ResultItem
} from './CommandPalette.svelte';

type CommandPalettePart = typeof CommandPaletteRoot;

const CommandPaletteDialog = Dialog as unknown as CommandPalettePart;
const CommandPaletteEmpty = Empty as unknown as CommandPalettePart;
const CommandPaletteFooter = Footer as unknown as CommandPalettePart;
const CommandPaletteGroup = Group as unknown as CommandPalettePart;
const CommandPaletteGroupLabel = GroupLabel as unknown as CommandPalettePart;
const CommandPaletteHighlightedText = HighlightedText as unknown as CommandPalettePart;
const CommandPaletteInput = Input as unknown as CommandPalettePart;
const CommandPaletteItem = Item as unknown as CommandPalettePart;
const CommandPaletteItems = Items as unknown as CommandPalettePart;
const CommandPaletteList = List as unknown as CommandPalettePart;
const CommandPaletteLoading = Loading as unknown as CommandPalettePart;
const CommandPalettePanel = Panel as unknown as CommandPalettePart;
const CommandPaletteResultItem = ResultItem as unknown as CommandPalettePart;

export { default as CommandPaletteRoot } from './CommandPalette.svelte';
export {
  CommandPaletteDialog,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteGroup,
  CommandPaletteGroupLabel,
  CommandPaletteHighlightedText,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteItems,
  CommandPaletteList,
  CommandPaletteLoading,
  CommandPalettePanel,
  CommandPaletteResultItem
};
export type { CommandPaletteCommand } from './CommandPalette.svelte';

export const CommandPalette = Object.assign(CommandPaletteRoot, {
  Root: CommandPaletteRoot,
  Dialog: CommandPaletteDialog,
  Panel: CommandPalettePanel,
  Input: CommandPaletteInput,
  List: CommandPaletteList,
  Viewport: CommandPrimitive.Viewport,
  Results: CommandPaletteList,
  Group: CommandPaletteGroup,
  GroupLabel: CommandPaletteGroupLabel,
  GroupHeading: CommandPaletteGroupLabel,
  Items: CommandPaletteItems,
  Item: CommandPaletteItem,
  LinkItem: CommandPrimitive.LinkItem,
  ResultItem: CommandPaletteResultItem,
  HighlightedText: CommandPaletteHighlightedText,
  Empty: CommandPaletteEmpty,
  Loading: CommandPaletteLoading,
  Separator: CommandPrimitive.Separator,
  Footer: CommandPaletteFooter
}) as typeof CommandPaletteRoot & {
  Root: typeof CommandPaletteRoot;
  Dialog: typeof CommandPaletteDialog;
  Panel: typeof CommandPalettePanel;
  Input: typeof CommandPaletteInput;
  List: typeof CommandPaletteList;
  Viewport: typeof CommandPrimitive.Viewport;
  Results: typeof CommandPaletteList;
  Group: typeof CommandPaletteGroup;
  GroupLabel: typeof CommandPaletteGroupLabel;
  GroupHeading: typeof CommandPaletteGroupLabel;
  Items: typeof CommandPaletteItems;
  Item: typeof CommandPaletteItem;
  LinkItem: typeof CommandPrimitive.LinkItem;
  ResultItem: typeof CommandPaletteResultItem;
  HighlightedText: typeof CommandPaletteHighlightedText;
  Empty: typeof CommandPaletteEmpty;
  Loading: typeof CommandPaletteLoading;
  Separator: typeof CommandPrimitive.Separator;
  Footer: typeof CommandPaletteFooter;
};

export default CommandPalette;
