import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Banner, { bannerVariants } from "./Banner.svelte";
import { Banner as BannerCompound } from "./index";
import BannerLinkActionTest from "../../test-fixtures/BannerLinkActionTest.svelte";
import BannerActionTest from "../../test-fixtures/BannerActionTest.svelte";

describe("Banner", () => {
  it("matches the 2.9 compact size contract", () => {
    const classes = bannerVariants({ size: "sm" });
    expect(classes).toContain("items-center");
    expect(classes).toContain("px-3");
    expect(classes).toContain("py-2");
    expect(classes).toContain("text-sm");
  });

  it("renders compact title and description inline", () => {
    render(Banner, {
      size: "sm",
      title: "Heads up",
      description: "More details",
    });
    const title = screen.getByText("Heads up");
    const description = screen.getByText("More details");
    expect(title.tagName).toBe("SPAN");
    expect(description.tagName).toBe("SPAN");
    expect(title.parentElement).toBe(description.parentElement);
  });

  it("uses the updated neutral secondary color", () => {
    expect(bannerVariants({ variant: "secondary" })).toContain(
      "text-kumo-default/70",
    );
  });

  it("exposes the action through the compound Banner API", () => {
    expect(BannerCompound).toBe(Banner);
    expect(BannerCompound.Action).toBeDefined();
  });

  it("renders a Link action inline in a compact banner", () => {
    render(BannerLinkActionTest);

    const description = screen.getByText("A DNS record already exists.");
    const action = screen.getByTestId("action");
    expect(action.parentElement?.parentElement).toBe(description);
    expect(action.parentElement?.className).toContain("ml-1.5");
  });

  it("renders a compact CTA as a trailing sibling at the xs size", () => {
    render(BannerActionTest);

    const description = screen.getByText("A new version is ready.");
    const action = screen.getByTestId("action");
    expect(action.parentElement?.parentElement).toBe(
      description.parentElement?.parentElement,
    );
    expect(action.className).toContain("h-5");
  });

  it("uses the compact icon line-height slot", () => {
    const { container } = render(BannerActionTest);

    const icon = container.querySelector("svg");
    expect(icon?.parentElement?.className).toContain("h-[1.25em]");
  });
});
