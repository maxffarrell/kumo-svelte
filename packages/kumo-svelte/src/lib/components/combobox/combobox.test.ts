import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ComboboxTest from "./ComboboxTest.svelte";

describe("Combobox Keyboard Navigation", () => {
  it("aligns popup input with the content edges", async () => {
    const user = userEvent.setup();
    render(ComboboxTest);
    await user.click(screen.getByRole("button", { name: "Show options" }));

    const input = screen.getByPlaceholderText("Search fruit");
    expect(input.className).toContain("mx-0");
    expect(input.className).toContain("-mt-1.5");
    expect(input.className).toContain("rounded-b-none");
  });

  it("allows navigating and selecting items using Arrow keys and Enter", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(ComboboxTest, {
      value: null,
      onValueChange,
    });

    const input = screen.getByPlaceholderText("Select fruit");

    // Focus the input
    await user.click(input);

    // Click the "Show options" trigger to open it
    const trigger = screen.getByRole("button", { name: "Show options" });
    await user.click(trigger);

    // Verify option is visible in document
    expect(screen.getByRole("option", { name: "Apple" })).toBeTruthy();

    // Use ArrowDown to highlight the next item ('Banana')
    await user.keyboard("{ArrowDown}");

    // Use Enter to select the highlighted item
    await user.keyboard("{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("Banana");
  });
});
