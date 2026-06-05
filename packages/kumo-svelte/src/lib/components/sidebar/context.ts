import { getContext, setContext } from "svelte";

export type SidebarState = "expanded" | "collapsed" | "peeking";
export type SidebarSide = "left" | "right";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "icon" | "offcanvas" | "none";

export interface SidebarContextValue {
  get state(): SidebarState;
  get open(): boolean;
  setOpen(open: boolean): void;
  get isMobile(): boolean;
  get openMobile(): boolean;
  setOpenMobile(open: boolean): void;
  get side(): SidebarSide;
  get variant(): SidebarVariant;
  get collapsible(): SidebarCollapsible;
  get contained(): boolean;
  get animationDuration(): number;
  get mobileBreakpoint(): number;
  get width(): number;
  get resizable(): boolean;
  get isResizing(): boolean;
  setIsResizing(isResizing: boolean): void;
  get minWidth(): number;
  get maxWidth(): number;
  setWidth(width: number): void;
  get peekable(): boolean;
  get isPeeking(): boolean;
  startPeek(): void;
  stopPeek(): void;
  toggleSidebar(): void;
}

export interface SidebarMenuItemContextValue {
  get insideMenuItem(): boolean;
}

export interface SidebarMenuSubItemContextValue {
  get insideMenuSubItem(): boolean;
}

const SIDEBAR_CONTEXT = Symbol("kumo-sidebar");
const SIDEBAR_MENU_ITEM_CONTEXT = Symbol("kumo-sidebar-menu-item");
const SIDEBAR_MENU_SUB_ITEM_CONTEXT = Symbol("kumo-sidebar-menu-sub-item");

export function setSidebarContext(context: SidebarContextValue) {
  setContext(SIDEBAR_CONTEXT, context);
}

export function getSidebarContext(component: string) {
  const context = getContext<SidebarContextValue | undefined>(SIDEBAR_CONTEXT);
  if (!context)
    throw new Error(`${component} must be used inside <Sidebar.Provider>.`);
  return context;
}

export function setSidebarMenuItemContext(
  context: SidebarMenuItemContextValue,
) {
  setContext(SIDEBAR_MENU_ITEM_CONTEXT, context);
}

export function getSidebarMenuItemContext() {
  return getContext<SidebarMenuItemContextValue | undefined>(
    SIDEBAR_MENU_ITEM_CONTEXT,
  );
}

export function setSidebarMenuSubItemContext(
  context: SidebarMenuSubItemContextValue,
) {
  setContext(SIDEBAR_MENU_SUB_ITEM_CONTEXT, context);
}

export function getSidebarMenuSubItemContext() {
  return getContext<SidebarMenuSubItemContextValue | undefined>(
    SIDEBAR_MENU_SUB_ITEM_CONTEXT,
  );
}
