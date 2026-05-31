import type { Component } from 'svelte';
import Root, {
  SidebarCollapsibleContent,
  SidebarCollapsibleRoot,
  SidebarCollapsibleTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuChevron,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarResizeHandle,
  SidebarSeparator,
  SidebarSlidingView,
  SidebarSlidingViews,
  SidebarTrigger
} from './Sidebar.svelte';

const Provider = SidebarProvider as unknown as Component;
const Header = SidebarHeader as unknown as Component;
const Content = SidebarContent as unknown as Component;
const Footer = SidebarFooter as unknown as Component;
const Group = SidebarGroup as unknown as Component;
const GroupLabel = SidebarGroupLabel as unknown as Component;
const Menu = SidebarMenu as unknown as Component;
const MenuItem = SidebarMenuItem as unknown as Component;
const MenuButton = SidebarMenuButton as unknown as Component;
const MenuBadge = SidebarMenuBadge as unknown as Component;
const MenuSub = SidebarMenuSub as unknown as Component;
const MenuSubItem = SidebarMenuSubItem as unknown as Component;
const MenuSubButton = SidebarMenuSubButton as unknown as Component;
const Separator = SidebarSeparator as unknown as Component;
const Trigger = SidebarTrigger as unknown as Component;
const Rail = SidebarRail as unknown as Component;
const ResizeHandle = SidebarResizeHandle as unknown as Component;
const MenuChevron = SidebarMenuChevron as unknown as Component;
const Collapsible = SidebarCollapsibleRoot as unknown as Component;
const CollapsibleTrigger = SidebarCollapsibleTrigger as unknown as Component;
const CollapsibleContent = SidebarCollapsibleContent as unknown as Component;
const SlidingViews = SidebarSlidingViews as unknown as Component;
const SlidingView = SidebarSlidingView as unknown as Component;

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
