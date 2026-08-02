import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Button from "./Button.svelte";

describe("Button", () => {
  it("renders a button with Kumo data attributes by default", () => {
    render(Button, {
      "aria-label": "Save",
    });

    const button = screen.getByRole("button", { name: "Save" });
    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("data-kumo-component")).toBe("Button");
    expect(button.getAttribute("data-kumo-part")).toBe("button");
  });

  it("renders as a link when href is provided", () => {
    render(Button, {
      href: "/settings",
      "aria-label": "Settings",
    });

    const link = screen.getByRole("link", { name: "Settings" });
    expect(link.getAttribute("href")).toBe("/settings");
    expect(link.getAttribute("data-kumo-part")).toBe("link-button");
  });

  it("marks loading buttons busy and disabled", () => {
    render(Button, {
      loading: true,
      "aria-label": "Deploy",
    });

    const button = screen.getByRole("button", { name: "Deploy" });
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });

  it("uses title as the accessible name for an icon-only button", () => {
    render(Button, { shape: "square", title: "Remove" });

    const button = screen.getByRole("button", { name: "Remove" });
    expect(button.getAttribute("aria-label")).toBe("Remove");
  });

  it("uses a numeric title as the accessible name for an icon-only button", () => {
    render(Button, { shape: "square", title: 42 });

    const button = screen.getByRole("button", { name: "42" });
    expect(button.getAttribute("aria-label")).toBe("42");
  });

  it("wraps disabled buttons in an enabled tooltip trigger", () => {
    render(Button, {
      disabled: true,
      title: "Unavailable",
      "aria-label": "Save",
    });

    const button = screen.getByRole("button", { name: "Save" });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.parentElement?.className).toContain("inline-flex");
  });

  it("renders disabled LinkButton as a native disabled button", async () => {
    const { default: LinkButton } = await import("./LinkButton.svelte");
    render(LinkButton, {
      href: "/settings",
      disabled: true,
      title: "Unavailable",
    });

    const button = screen.getByRole("button");
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute("href")).toBeNull();
  });

  it("keeps emphasized variant rings color-matched when pressed or focused", () => {
    for (const variant of ["primary", "destructive"] as const) {
      render(Button, {
        variant,
        "aria-label": variant,
      });

      const className = screen.getByRole("button", { name: variant }).className;

      expect(className).toContain("ring-(--kumo-button-emphasis-ring)");
      expect(className).toContain("focus:ring-(--kumo-button-emphasis-ring)");
      expect(className).toContain(
        "focus-visible:ring-(--kumo-button-emphasis-ring)",
      );
      expect(className).toContain("active:ring-(--kumo-button-emphasis-ring)");
    }
  });
});
