import { getContext, setContext } from 'svelte';

export type SidebarState = 'expanded' | 'collapsed' | 'peeking';
export type SidebarSide = 'left' | 'right';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'icon' | 'offcanvas' | 'none';

export interface SidebarContextValue {
  get state(): SidebarState;
  get open(): boolean;
  setOpen(open: boolean): void;
  get side(): SidebarSide;
  get variant(): SidebarVariant;
  get collapsible(): SidebarCollapsible;
  get width(): number;
  get resizable(): boolean;
  get minWidth(): number;
  get maxWidth(): number;
  setWidth(width: number): void;
  get peekable(): boolean;
  get isPeeking(): boolean;
  startPeek(): void;
  stopPeek(): void;
  toggleSidebar(): void;
}

const SIDEBAR_CONTEXT = Symbol('kumo-sidebar');

export function setSidebarContext(context: SidebarContextValue) {
  setContext(SIDEBAR_CONTEXT, context);
}

export function getSidebarContext(component: string) {
  const context = getContext<SidebarContextValue | undefined>(SIDEBAR_CONTEXT);
  if (!context) throw new Error(`${component} must be used inside <Sidebar.Provider>.`);
  return context;
}
