import { render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Text, { textVariants } from "./Text.svelte";

describe("Text", () => {
  it("uses token line heights for non-heading sizes", () => {
    for (const [size, expected] of [
      ["xs", "text-xs"],
      ["sm", "text-sm"],
      ["base", "text-base"],
      ["lg", "text-lg"],
    ] as const) {
      expect(textVariants({ variant: "body", size }).split(/\s+/)).toContain(expected);
    }
    expect(textVariants({ variant: "mono" }).split(/\s+/)).toContain("text-sm");
  });

  it("allows a copy variant to render a semantic heading", () => {
    const { container } = render(Text, {
      as: "h2",
      variant: "secondary",
      size: "base",
      bold: true,
    });
    const heading = container.querySelector("h2");
    expect(heading).toHaveClass("text-kumo-subtle", "font-medium");
  });

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

  it("renders deprecated numbered headings without a runtime warning", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(Text, { variant: "heading2", as: "h2" });

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
