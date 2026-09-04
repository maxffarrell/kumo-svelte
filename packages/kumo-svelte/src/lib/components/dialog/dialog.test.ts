import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../../tests/a11y";
import DialogTestHost from "./DialogTestHost.svelte";
import { dialogVariants, KUMO_DIALOG_VARIANTS } from "./Dialog.variants";

describe("Dialog", () => {
  it("renders the trigger with Kumo data attributes", () => {
    render(DialogTestHost);

    const trigger = screen.getByRole("button", { name: "Open dialog" });
    expect(trigger.getAttribute("data-kumo-component")).toBe("Dialog");
    expect(trigger.getAttribute("data-kumo-part")).toBe("trigger");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click and updates trigger state", async () => {
    const user = userEvent.setup();

    render(DialogTestHost);

    const trigger = screen.getByRole("button", { name: "Open dialog" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    await user.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("data-state")).toBe("open");
    // Dialog content, backdrop, and focus trap are covered by VRT.

    await user.keyboard("{Escape}");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("activates via keyboard on trigger", async () => {
    const user = userEvent.setup();

    render(DialogTestHost);

    const trigger = screen.getByRole("button", { name: "Open dialog" });
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    await user.keyboard("{Enter}");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    await user.keyboard("{Escape}");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  describe("variant fidelity", () => {
    it("applies Dialog trigger part and button ring classes", () => {
      render(DialogTestHost);

      const trigger = screen.getByRole("button", { name: "Open dialog" });
      expect(trigger.getAttribute("data-kumo-component")).toBe("Dialog");
      expect(trigger.getAttribute("data-kumo-part")).toBe("trigger");
      expect(trigger.className).toContain("ring-kumo-line");
      // Dialog content size and backdrop classes are covered by VRT.
    });
  });

  describe("accessibility", () => {
    it("has no axe violations when closed", async () => {
      const { container } = render(DialogTestHost);
      await expectNoA11yViolations(container);
    });
  });
});

describe("Dialog variants", () => {
  it("positions dialogs closer to the top of the viewport", () => {
    const classes = dialogVariants().split(" ");
    expect(classes).toContain("top-8");
    expect(classes).toContain("sm:top-16");
    expect(classes).not.toContain("top-1/2");
    expect(classes).not.toContain("-translate-y-1/2");
  });

  it("uses fixed width classes for size variants", () => {
    for (const [size, expectedClass] of [
      ["sm", "sm:w-72"],
      ["base", "sm:w-96"],
      ["lg", "sm:w-[32rem]"],
      ["xl", "sm:w-[48rem]"],
    ] as const) {
      const className = KUMO_DIALOG_VARIANTS.size[size].classes;
      expect(className).toContain(expectedClass);
      expect(className).not.toContain("min-w");
    }
  });
});
