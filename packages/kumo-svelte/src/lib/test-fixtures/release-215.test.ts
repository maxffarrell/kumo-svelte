import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Host from "./Release215Host.svelte";
import { expectNoA11yViolations } from "../../../tests/a11y";
describe("2.15 composed APIs", () => {
  it("updates translated generated labels and input suffixes", async () => {
    const view = render(Host);
    expect(screen.getAllByText("(opcional)")).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: "Más información" }),
    ).toBeTruthy();
    await view.rerender({ translated: false });
    expect(screen.getAllByText("(optional)")).toHaveLength(2);
  });
  it("renders joined checkbox cards and selects segmented radios", async () => {
    const { container } = render(Host);
    const checkbox = screen.getByRole("checkbox", { name: /Email/ });
    await fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    const card = checkbox.closest("label")!;
    expect(card.className).toContain("border-b");
    expect(card.parentElement?.className).toContain("grid-cols-2");
    const grid = screen.getByRole("radio", { name: "Grid" });
    await fireEvent.click(grid);
    expect(grid).toHaveAttribute("aria-checked", "true");
    expect(grid).toHaveClass("sr-only");
    await expectNoA11yViolations(container);
  });
});
