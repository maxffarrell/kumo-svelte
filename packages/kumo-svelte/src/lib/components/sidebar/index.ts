import Root, {
  type KumoSidebarPart
} from './Sidebar.svelte';

export type { KumoSidebarPart };

const part = (part: KumoSidebarPart) =>
  ((anchor, props = {}) =>
    Root(anchor, {
      ...props,
      __part: part
    })) as typeof Root;

const Provider = part('provider');
const Header = part('header');
const Content = part('content');
const Footer = part('footer');
const Group = part('group');
const GroupLabel = part('group-label');
const Menu = part('menu');
const MenuItem = part('menu-item');
const MenuButton = part('menu-button');
const MenuBadge = part('menu-badge');
const MenuSub = part('menu-sub');
const MenuSubItem = part('menu-sub-item');
const MenuSubButton = part('menu-sub-button');
const Separator = part('separator');
const Trigger = part('trigger');
const Rail = part('rail');
const ResizeHandle = part('resize-handle');
const MenuChevron = part('menu-chevron');
const Collapsible = part('collapsible');
const CollapsibleTrigger = part('collapsible-trigger');
const CollapsibleContent = part('collapsible-content');
const SlidingViews = part('sliding-views');
const SlidingView = part('sliding-view');

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
