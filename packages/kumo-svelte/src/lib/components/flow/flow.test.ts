// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createRoundedPath } from "./connectors";
import FlowPanningTestHost from "./FlowPanningTestHost.svelte";

const resizeObservers: TestResizeObserver[] = [];

class TestResizeObserver implements ResizeObserver {
  readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    resizeObservers.push(this);
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

function setRect(element: Element, rect: Partial<DOMRect>) {
  const nextRect = {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: rect.width ?? 0,
    bottom: rect.height ?? 0,
    width: 0,
    height: 0,
    ...rect,
  } as DOMRect;

  vi.spyOn(element, "getBoundingClientRect").mockReturnValue(nextRect);
}

async function measure() {
  for (const observer of resizeObservers) {
    observer.callback([], observer);
  }
  await Promise.resolve();
}

beforeEach(() => {
  resizeObservers.length = 0;
  vi.stubGlobal("ResizeObserver", TestResizeObserver);
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
});

describe("Flow canvas panning", () => {
  it("pans with the wheel and clamps to measured bounds", async () => {
    render(FlowPanningTestHost);

    const wrapper = screen.getByTestId("flow-wrapper");
    const contents = screen.getByTestId("flow-contents");
    setRect(wrapper, { width: 300, height: 200 });
    setRect(contents, { width: 800, height: 500 });
    await measure();

    await fireEvent.wheel(wrapper, { deltaX: 700, deltaY: 400 });
    expect(contents.style.transform).toBe("translate(-500px, -300px)");

    await fireEvent.wheel(wrapper, { deltaX: -1000, deltaY: -1000 });
    expect(contents.style.transform).toBe("translate(0px, 0px)");
  });

  it("drag-pans the canvas while ignoring drags that start on nodes", async () => {
    render(FlowPanningTestHost);

    const wrapper = screen.getByTestId("flow-wrapper");
    const contents = screen.getByTestId("flow-contents");
    setRect(wrapper, { width: 300, height: 200 });
    setRect(contents, { width: 800, height: 500 });
    await measure();

    await fireEvent.pointerDown(screen.getByTestId("start"), {
      button: 0,
      clientX: 100,
      clientY: 100,
      pointerId: 1,
    });
    await fireEvent.pointerMove(wrapper, {
      clientX: 50,
      clientY: 50,
      pointerId: 1,
    });
    expect(contents.style.transform).toBe("translate(0px, 0px)");

    await fireEvent.pointerDown(wrapper, {
      button: 0,
      clientX: 100,
      clientY: 100,
      pointerId: 2,
    });
    expect(document.body.style.cursor).toBe("grabbing");
    expect(document.body.style.userSelect).toBe("none");

    await fireEvent.pointerMove(wrapper, {
      clientX: 40,
      clientY: 10,
      pointerId: 2,
    });
    expect(contents.style.transform).toBe("translate(-60px, -90px)");

    await fireEvent.pointerUp(wrapper, { pointerId: 2 });
    expect(document.body.style.cursor).toBe("");
    expect(document.body.style.userSelect).toBe("");
  });
});

describe("createRoundedPath", () => {
  it("serializes connector command arrays without comma separators", () => {
    const verticalPath = createRoundedPath({ x1: 0, y1: 0, x2: 80, y2: 120 });
    const horizontalPath = createRoundedPath(
      { x1: 0, y1: 0, x2: 120, y2: 80 },
      { orientation: "horizontal" },
    );

    expect(verticalPath).not.toContain(",");
    expect(horizontalPath).not.toContain(",");
  });
});
