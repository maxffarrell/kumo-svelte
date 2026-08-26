import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../../tests/a11y";
import LayerCardTestHost from "./LayerCardTestHost.svelte";

describe("LayerCard", () => {
  it("marks a simple root for first-paint styling", () => {
    render(LayerCardTestHost, { class: "p-4" });
    const root = screen.getByTestId("layer-card-root");
    expect(root.className).toContain("kumo-layer-card");
    expect(root.className).toContain("p-4");
    expect(root.querySelector("[data-kumo-layer-section]")).toBeNull();
  });

  it("marks direct sections so CSS can select layered roots during SSR", () => {
    render(LayerCardTestHost, { layered: true });
    const root = screen.getByTestId("layer-card-root");
    expect(root.className).toContain("kumo-layer-card");
    expect(
      root.querySelectorAll(":scope > [data-kumo-layer-section]"),
    ).toHaveLength(2);
  });

  it("applies secondary section classes", () => {
    render(LayerCardTestHost, { layered: true });
    const secondary = screen.getByTestId("layer-card-secondary");
    expect(secondary.className).toContain("-my-2");
    expect(secondary.className).toContain("bg-kumo-elevated");
    expect(secondary.className).toContain("text-kumo-subtle");
    expect(secondary.className).toContain("font-medium");
  });

  it("applies primary section classes", () => {
    render(LayerCardTestHost, { layered: true });
    const primary = screen.getByTestId("layer-card-primary");
    expect(primary.className).toContain("bg-kumo-base");
    expect(primary.className).toContain("ring-kumo-fill");
    expect(primary.className).toContain("no-underline");
    expect(primary.className).toContain("gap-2");
  });

  it("passes aria attributes to sections", () => {
    render(LayerCardTestHost, { layered: true });
    expect(screen.getByLabelText("secondary section")).toBeTruthy();
    expect(screen.getByLabelText("primary section")).toBeTruthy();
  });

  describe("accessibility", () => {
    it("has no axe violations (simple)", async () => {
      const { container } = render(LayerCardTestHost, { class: "p-4" });
      await expectNoA11yViolations(container);
    });

    it("has no axe violations (layered)", async () => {
      const { container } = render(LayerCardTestHost, { layered: true });
      await expectNoA11yViolations(container);
    });
  });
});
