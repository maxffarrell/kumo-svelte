// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  Sidebar,
  SidebarCollapsibleContent,
  SidebarCollapsibleRoot,
  SidebarCollapsibleTrigger,
  SidebarContent,
  SidebarClose,
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
  SidebarLoading,
  SidebarProvider,
  SidebarRail,
  SidebarRoot,
  SidebarSeparator,
  SidebarSlidingView,
  SidebarSlidingViews,
  SidebarTrigger,
} from "./index";
import SidebarTestHost from "./SidebarTestHost.svelte";
import SidebarScrollTestHost from "./SidebarScrollTestHost.svelte";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Sidebar exports", () => {
  it("should export compound component with all sub-components", () => {
    expect(Sidebar).toBeDefined();
    expect(Sidebar.Provider).toBe(SidebarProvider);
    expect(Sidebar.Root).toBe(SidebarRoot);
    expect(Sidebar.Header).toBe(SidebarHeader);
    expect(Sidebar.Content).toBe(SidebarContent);
    expect(Sidebar.Close).toBe(SidebarClose);
    expect(Sidebar.Loading).toBe(SidebarLoading);
    expect(Sidebar.Footer).toBe(SidebarFooter);
    expect(Sidebar.Group).toBe(SidebarGroup);
    expect(Sidebar.GroupLabel).toBe(SidebarGroupLabel);
    expect(Sidebar.Menu).toBe(SidebarMenu);
    expect(Sidebar.MenuItem).toBe(SidebarMenuItem);
    expect(Sidebar.MenuButton).toBe(SidebarMenuButton);
    expect(Sidebar.MenuBadge).toBe(SidebarMenuBadge);
    expect(Sidebar.MenuSub).toBe(SidebarMenuSub);
    expect(Sidebar.MenuSubItem).toBe(SidebarMenuSubItem);
    expect(Sidebar.MenuSubButton).toBe(SidebarMenuSubButton);
    expect(Sidebar.Separator).toBe(SidebarSeparator);
    expect(Sidebar.Trigger).toBe(SidebarTrigger);
    expect(Sidebar.Rail).toBe(SidebarRail);
    expect(Sidebar.MenuChevron).toBe(SidebarMenuChevron);
    expect(Sidebar.Collapsible).toBe(SidebarCollapsibleRoot);
    expect(Sidebar.CollapsibleTrigger).toBe(SidebarCollapsibleTrigger);
    expect(Sidebar.CollapsibleContent).toBe(SidebarCollapsibleContent);
    expect(Sidebar.SlidingViews).toBe(SidebarSlidingViews);
    expect(Sidebar.SlidingView).toBe(SidebarSlidingView);
  });

  it("should not export removed components", () => {
    expect(Sidebar).not.toHaveProperty("Input");
    expect(Sidebar).not.toHaveProperty("MenuAction");
    expect(Sidebar).not.toHaveProperty("GroupContent");
  });
});

describe("Sidebar imperative scrolling", () => {
  it("registers item ids and scrolls only the owning viewport", async () => {
    const { container } = render(SidebarScrollTestHost);
    const viewport = container.querySelector<HTMLElement>(
      '[data-sidebar="viewport"]',
    )!;
    const item = container.querySelector<HTMLElement>(
      '[data-sidebar-item-id="billing"]',
    )!;
    const scrollTo = vi.fn();

    Object.defineProperties(viewport, {
      clientHeight: { value: 100 },
      scrollHeight: { value: 500 },
      scrollTop: { value: 50, writable: true },
      scrollTo: { value: scrollTo },
    });
    Object.defineProperty(item, "offsetHeight", { value: 20 });
    vi.spyOn(viewport, "getBoundingClientRect").mockReturnValue({
      top: 0,
    } as DOMRect);
    vi.spyOn(item, "getBoundingClientRect").mockReturnValue({
      top: 200,
    } as DOMRect);

    await fireEvent.click(screen.getByRole("button", { name: "Find billing" }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 210, behavior: "smooth" });
  });

  it("only scrolls an item into view when it is outside the viewport", async () => {
    const { container } = render(SidebarScrollTestHost);
    const viewport = container.querySelector<HTMLElement>(
      '[data-sidebar="viewport"]',
    )!;
    const item = container.querySelector<HTMLElement>(
      '[data-sidebar-item-id="billing"]',
    )!;
    const scrollTo = vi.fn();

    Object.defineProperties(viewport, {
      clientHeight: { value: 100 },
      offsetHeight: { value: 100 },
      scrollHeight: { value: 500 },
      scrollTop: { value: 50, writable: true },
      scrollTo: { value: scrollTo },
    });
    Object.defineProperty(item, "offsetHeight", { value: 20 });
    vi.spyOn(viewport, "getBoundingClientRect").mockReturnValue({
      top: 100,
      bottom: 200,
      height: 100,
    } as DOMRect);
    const itemRect = vi.spyOn(item, "getBoundingClientRect");
    itemRect.mockReturnValue({ top: 120, bottom: 140 } as DOMRect);

    await fireEvent.click(screen.getByRole("button", { name: "Reveal billing" }));
    expect(scrollTo).not.toHaveBeenCalled();

    itemRect.mockReturnValue({ top: 250, bottom: 270 } as DOMRect);
    await fireEvent.click(screen.getByRole("button", { name: "Reveal billing" }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 200, behavior: "auto" });
  });
});

describe("Sidebar loading", () => {
  it("renders an accessible grouped navigation skeleton", () => {
    render(SidebarLoading);
    expect(screen.getByRole("status", { name: "Loading" })).toBeTruthy();
    expect(
      document.querySelectorAll('[data-sidebar="loading"] .skeleton-line')
        .length,
    ).toBeGreaterThan(4);
  });
});

describe("Sidebar toggle", () => {
  it("should start expanded with defaultOpen=true", () => {
    const { container } = render(SidebarTestHost, {
      props: { defaultOpen: true },
    });

    expect(
      container
        .querySelector("[data-sidebar-wrapper]")
        ?.getAttribute("data-state"),
    ).toBe("expanded");
    expect(
      screen
        .getByRole("button", { name: "Collapse sidebar" })
        .getAttribute("aria-expanded"),
    ).toBe("true");
  });

  it("should start collapsed with defaultOpen=false", () => {
    const { container } = render(SidebarTestHost, {
      props: { defaultOpen: false },
    });

    expect(
      container
        .querySelector("[data-sidebar-wrapper]")
        ?.getAttribute("data-state"),
    ).toBe("collapsed");
    expect(
      screen
        .getByRole("button", { name: "Expand sidebar" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });

  it("should toggle on Trigger click", async () => {
    const { container } = render(SidebarTestHost, {
      props: { defaultOpen: true },
    });

    const trigger = screen.getByRole("button", { name: "Collapse sidebar" });
    await fireEvent.click(trigger);

    expect(
      screen
        .getByRole("button", { name: "Expand sidebar" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
    expect(
      container
        .querySelector("[data-sidebar-wrapper]")
        ?.getAttribute("data-state"),
    ).toBe("collapsed");
  });

  it("should call onOpenChange when controlled", async () => {
    const onOpenChange = vi.fn();
    render(SidebarTestHost, { props: { open: true, onOpenChange } });

    await fireEvent.click(
      screen.getByRole("button", { name: "Collapse sidebar" }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onOpenChangeComplete after the width transition", async () => {
    const onOpenChangeComplete = vi.fn();
    const { container } = render(SidebarTestHost, {
      props: { defaultOpen: true, onOpenChangeComplete },
    });

    await fireEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(onOpenChangeComplete).not.toHaveBeenCalled();

    const sidebar = container.querySelector<HTMLElement>('[data-sidebar="sidebar"]')!;
    const event = new Event("transitionend", { bubbles: true });
    Object.defineProperty(event, "propertyName", { value: "width" });
    await fireEvent(sidebar, event);

    expect(onOpenChangeComplete).toHaveBeenCalledWith(false);
  });

  it("keeps peeking when a view change blurs the active item under the pointer", async () => {
    const { container } = render(SidebarTestHost, {
      props: { defaultOpen: false, peekable: true },
    });
    const wrapper = container.querySelector<HTMLElement>("[data-sidebar-wrapper]")!;
    const peekZone = container.querySelector<HTMLElement>(
      '[data-sidebar="content-container"]',
    )!;

    await fireEvent.mouseEnter(peekZone);
    expect(wrapper.dataset.state).toBe("peeking");

    await fireEvent.blur(peekZone, { relatedTarget: null });
    expect(wrapper.dataset.state).toBe("peeking");

    await fireEvent.mouseLeave(peekZone);
    expect(wrapper.dataset.state).toBe("collapsed");
  });
});
