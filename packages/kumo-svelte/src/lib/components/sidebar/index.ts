import Root from './Sidebar.svelte';
import Provider from './SidebarProvider.svelte';
import Header from './SidebarHeader.svelte';
import Content from './SidebarContent.svelte';
import Footer from './SidebarFooter.svelte';
import Group from './SidebarGroup.svelte';
import GroupLabel from './SidebarGroupLabel.svelte';
import Menu from './SidebarMenu.svelte';
import MenuItem from './SidebarMenuItem.svelte';
import MenuButton from './SidebarMenuButton.svelte';
import MenuBadge from './SidebarMenuBadge.svelte';
import MenuSub from './SidebarMenuSub.svelte';
import MenuSubItem from './SidebarMenuSubItem.svelte';
import MenuSubButton from './SidebarMenuSubButton.svelte';
import Separator from './SidebarSeparator.svelte';
import Trigger from './SidebarTrigger.svelte';
import Rail from './SidebarRail.svelte';
import ResizeHandle from './SidebarResizeHandle.svelte';
import MenuChevron from './SidebarMenuChevron.svelte';
import Collapsible from './SidebarCollapsible.svelte';
import CollapsibleTrigger from './SidebarCollapsibleTrigger.svelte';
import CollapsibleContent from './SidebarCollapsibleContent.svelte';
import SlidingViews from './SidebarSlidingViews.svelte';
import SlidingView from './SidebarSlidingView.svelte';

export const Sidebar: typeof Root & {
  Provider: typeof Provider;
  Root: typeof Root;
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
  Group: typeof Group;
  GroupLabel: typeof GroupLabel;
  Menu: typeof Menu;
  MenuItem: typeof MenuItem;
  MenuButton: typeof MenuButton;
  MenuBadge: typeof MenuBadge;
  MenuSub: typeof MenuSub;
  MenuSubItem: typeof MenuSubItem;
  MenuSubButton: typeof MenuSubButton;
  Separator: typeof Separator;
  Trigger: typeof Trigger;
  Rail: typeof Rail;
  ResizeHandle: typeof ResizeHandle;
  MenuChevron: typeof MenuChevron;
  Collapsible: typeof Collapsible;
  CollapsibleTrigger: typeof CollapsibleTrigger;
  CollapsibleContent: typeof CollapsibleContent;
  SlidingViews: typeof SlidingViews;
  SlidingView: typeof SlidingView;
} = Object.assign(Root, {
  Provider,
  Root,
  Header,
  Content,
  Footer,
  Group,
  GroupLabel,
  Menu,
  MenuItem,
  MenuButton,
  MenuBadge,
  MenuSub,
  MenuSubItem,
  MenuSubButton,
  Separator,
  Trigger,
  Rail,
  ResizeHandle,
  MenuChevron,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  SlidingViews,
  SlidingView
});

export {
  Root as SidebarRoot,
  Provider as SidebarProvider,
  Header as SidebarHeader,
  Content as SidebarContent,
  Footer as SidebarFooter,
  Group as SidebarGroup,
  GroupLabel as SidebarGroupLabel,
  Menu as SidebarMenu,
  MenuItem as SidebarMenuItem,
  MenuButton as SidebarMenuButton,
  MenuBadge as SidebarMenuBadge,
  MenuSub as SidebarMenuSub,
  MenuSubItem as SidebarMenuSubItem,
  MenuSubButton as SidebarMenuSubButton,
  Separator as SidebarSeparator,
  Trigger as SidebarTrigger,
  Rail as SidebarRail,
  ResizeHandle as SidebarResizeHandle,
  MenuChevron as SidebarMenuChevron,
  Collapsible as SidebarCollapsibleRoot,
  CollapsibleTrigger as SidebarCollapsibleTrigger,
  CollapsibleContent as SidebarCollapsibleContent,
  SlidingViews as SidebarSlidingViews,
  SlidingView as SidebarSlidingView
};

export type {
  SidebarCollapsible as SidebarCollapsibleMode,
  SidebarContextValue,
  SidebarSide,
  SidebarState,
  SidebarVariant
} from './context';
