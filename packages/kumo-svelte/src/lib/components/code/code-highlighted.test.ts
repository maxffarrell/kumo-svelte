import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CodeHighlighted from "./CodeHighlighted.svelte";

describe("CodeHighlighted", () => {
  it("renders the copy action inline for a single line", async () => {
    const { container } = render(CodeHighlighted, {
      code: "const ready = true;",
      showCopyButton: true,
    });

    await screen.findByRole("button", { name: "Copy" });
    const root = container.firstElementChild;
    const copyWrapper = screen.getByRole("button", {
      name: "Copy",
    }).parentElement;
    expect(root?.className).toContain("flex items-center");
    expect(copyWrapper?.className).toContain("shrink-0 px-2");
  });

  it("renders multi-line numbers in a separate column", async () => {
    const { container } = render(CodeHighlighted, {
      code: "const first = 1;\nconst second = 2;",
      showCopyButton: true,
      showLineNumbers: true,
    });

    await screen.findByRole("button", { name: "Copy" });
    const lineNumbers = container.querySelector(".kumo-line-numbers");
    const copyWrapper = screen.getByRole("button", {
      name: "Copy",
    }).parentElement;
    expect(lineNumbers?.textContent).toBe("12");
    expect(lineNumbers?.nextElementSibling?.className).toContain(
      "overflow-x-auto",
    );
    expect(copyWrapper?.className).toContain("absolute top-2 right-2");
  });
});
