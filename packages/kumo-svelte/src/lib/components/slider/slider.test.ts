import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Slider from "./Slider.svelte";
import { expectNoA11yViolations } from "../../../../tests/a11y";
describe("Slider", () => {
  it("updates scalar values with arrow keys and submits the current value", async () => {
    const onValueChange = vi.fn();
    const { container } = render(Slider, {
      label: "Volume",
      defaultValue: 40,
      name: "volume",
      onValueChange,
    });
    const thumb = screen.getByRole("slider", { name: "Volume" });
    thumb.focus();
    await fireEvent.keyDown(thumb, { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenLastCalledWith(41);
    expect(thumb).toHaveAttribute("aria-valuenow", "41");
    expect(container.querySelector("input[name=volume]")).toHaveValue("41");
    await fireEvent.keyDown(thumb, { key: "End" });
    expect(thumb).toHaveAttribute("aria-valuenow", "100");
  });
  it("exposes distinct names and values for range thumbs", async () => {
    const { container } = render(Slider, {
      defaultValue: [25, 75],
      getAriaLabel: (i: number) =>
        i === 0 ? "Minimum price" : "Maximum price",
      name: "price",
    });
    expect(
      screen.getByRole("slider", { name: "Minimum price" }),
    ).toHaveAttribute("aria-valuenow", "25");
    expect(
      screen.getByRole("slider", { name: "Maximum price" }),
    ).toHaveAttribute("aria-valuenow", "75");
    expect(container.querySelectorAll("input[name=price]")).toHaveLength(2);
    await expectNoA11yViolations(container);
  });
  it("formats accessible values and disables interaction", async () => {
    const onValueChange = vi.fn();
    render(Slider, {
      label: "Price",
      defaultValue: 50,
      disabled: true,
      onValueChange,
      format: { style: "currency", currency: "USD" },
      locale: "en-US",
    });
    const thumb = screen.getByRole("slider", { name: "Price" });
    expect(thumb).toHaveAttribute("aria-valuetext", "$50.00");
    await fireEvent.keyDown(thumb, { key: "ArrowRight" });
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
