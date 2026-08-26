import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AutocompleteTest from "./AutocompleteTest.svelte";

describe("Autocomplete Keyboard Navigation", () => {
  it("allows typing to search and using Arrow keys and Enter to select", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(AutocompleteTest, {
      value: "",
      onValueChange,
    });

    const input = screen.getByPlaceholderText("Search fruit");

    // Focus the input
    await user.click(input);

    // Type 'B' to filter and trigger opening
    await user.type(input, "B");

    // Verify option 'Banana' is visible in document
    expect(screen.getByRole("option", { name: "Banana" })).toBeTruthy();
    // 'Apple' should not be visible as it doesn't match 'B'
    expect(screen.queryByRole("option", { name: "Apple" })).toBeNull();

    // Use ArrowDown to highlight first matching item ('Banana')
    await user.keyboard("{ArrowDown}");

    // Use Enter to select it
    await user.keyboard("{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("Banana");
  });
});
