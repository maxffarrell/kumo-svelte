import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { tick } from "svelte";
import Host from "./ProductionReviewHost.svelte";

describe("production consumer contracts", () => {
  it("names Slider thumbs using aria-label and submits to an external form", async () => {
    render(Host);
    const thumb = screen.getByRole("slider", { name: "External volume" });
    await fireEvent.keyDown(thumb, { key: "ArrowRight" });
    const form = document.getElementById(
      "slider-review-form",
    ) as HTMLFormElement;
    expect(new FormData(form).get("volume")).toBe("41");
    form.reset();
    await tick();
    expect(thumb).toHaveAttribute("aria-valuenow", "40");
    expect(new FormData(form).get("volume")).toBe("40");
  });

  it("preserves checkbox menu semantics and toggles via keyboard", async () => {
    render(Host);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    const item = screen.getByRole("menuitemcheckbox", {
      name: "Notifications",
    });
    expect(item).toHaveAttribute("aria-checked", "false");
    item.focus();
    await fireEvent.keyDown(item, { key: "Enter" });
    expect(screen.getByLabelText("Notifications enabled")).toHaveTextContent(
      "true",
    );
  });
});

it("honors canceled native form resets", async () => {
  render(Host);
  const thumb = screen.getByRole("slider", { name: "External volume" });
  await fireEvent.keyDown(thumb, { key: "ArrowRight" });
  const form = document.getElementById("slider-review-form") as HTMLFormElement;
  form.addEventListener("reset", (event) => event.preventDefault(), {
    once: true,
  });
  form.reset();
  await tick();
  expect(thumb).toHaveAttribute("aria-valuenow", "41");
});
