// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import { TagInput } from "./index";

describe("TagInput", () => {
  it("creates comma-separated tags", async () => {
    const onValueChange = vi.fn();
    render(TagInput, { props: { "aria-label": "Tags", onValueChange } });
    const input = screen.getByLabelText("Tags");
    await fireEvent.input(input, { target: { value: "one, two" } });
    await fireEvent.keyDown(input, { key: "Enter" });
    expect(onValueChange).toHaveBeenLastCalledWith(["one", "two"]);
  });

  it("rejects invalid pasted values after accepting valid entries", async () => {
    render(TagInput, {
      props: {
        "aria-label": "Emails",
        validateValue: (value: string) => value.includes("@"),
      },
    });
    const input = screen.getByLabelText("Emails");
    await fireEvent.paste(input, {
      clipboardData: { getData: () => "valid@example.com, invalid" },
    });
    expect(screen.getByText('"invalid" is not valid.')).toBeTruthy();
    expect(screen.getByText("valid@example.com")).toBeTruthy();
  });

  it("disables tag removal when disabled", () => {
    render(TagInput, {
      props: { "aria-label": "Tags", defaultValue: ["one"], disabled: true },
    });
    expect(
      screen
        .getByRole("button", { name: "Remove one" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });

  it("associates its label with the input and localizes controls", async () => {
    render(TagInput, {
      props: {
        label: "Etiquetas",
        defaultValue: ["uno"],
        labels: { removeValue: (value: string) => `Eliminar ${value}` },
      },
    });
    const input = screen.getByLabelText("Etiquetas");
    expect(input.id).toContain("kumo-tag-input-");
    expect(screen.getByRole("button", { name: "Eliminar uno" })).toBeTruthy();
  });

  it("removes the final tag with Backspace from an empty input", async () => {
    const onValueChange = vi.fn();
    render(TagInput, {
      props: {
        "aria-label": "Tags",
        defaultValue: ["one", "two"],
        onValueChange,
      },
    });
    await fireEvent.keyDown(screen.getByLabelText("Tags"), {
      key: "Backspace",
    });
    expect(onValueChange).toHaveBeenLastCalledWith(["one"]);
  });
});
