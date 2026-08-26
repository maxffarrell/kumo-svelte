import { render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Text from "./Text.svelte";

describe("Text", () => {
  it("renders the new heading variant as a span by default", () => {
    const { container } = render(Text, { variant: "heading" });
    const heading = container.querySelector("span")!;

    expect(heading.className).toContain("text-lg");
    expect(heading.className).toContain("font-semibold");
  });

  it("renders a large heading at text-xl", () => {
    const { container } = render(Text, {
      variant: "heading",
      size: "lg",
      as: "h2",
    });

    expect(container.querySelector("h2")?.className).toContain("text-xl");
  });

  it("warns when a deprecated numbered heading is used", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(Text, { variant: "heading2", as: "h2" });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('variant="heading2" is deprecated'),
    );
    warn.mockRestore();
  });
});
