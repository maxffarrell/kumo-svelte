import { expect, test } from "@playwright/test";

const examples = [
  ["Open settings", "Configure custom hostname"],
  ["Open keyboard shortcuts", "Keyboard shortcuts"],
  ["Create deployment", "Create deployment"],
  ["Choose a Worker", "Choose a Worker"],
  ["Review deployment", "Deployment summary"],
  ["Edit deployment", "Save deployment"],
  ["Delete deployment", "Delete deployment", "alertdialog"],
  ["Edit profile", "Edit profile"],
  ["Delete Worker", "Delete Worker", "alertdialog"],
  ["Save a setting", "Save a setting"],
  ["Open draft", "Draft settings"],
  ["Small", "Review deployment configuration"],
  ["Default", "Review deployment configuration"],
  ["Large", "Review deployment configuration"],
  ["Extra large", "Review deployment configuration"],
  ["Open top-aligned dialog", "Top-aligned dialog"],
  ["Centered, tall content", "Audit log"],
  ["Top-aligned, tall content", "Audit log"],
] as const;

test("Layer Dialog docs examples open with their upstream titles", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.goto("/components/layer-dialog");
  await page.locator("#svelte-announcer").waitFor({ state: "attached" });

  for (const [trigger, title, role = "dialog"] of examples) {
    await page
      .getByRole("button", { name: trigger, exact: true })
      .first()
      .click();
    const dialog = page.getByRole(role, { name: title, exact: true });
    await expect(dialog).toBeVisible();
    if (trigger === "Open settings") {
      await expect(dialog).toBeFocused();
      await expect(dialog).toHaveCSS("width", "576px");
      await expect(dialog).toHaveCSS("height", "306px");
      await expect(dialog.getByRole("button", { name: "Close" })).toHaveCSS(
        "background-color",
        "rgba(0, 0, 0, 0)",
      );
    }
    if (trigger === "Choose a Worker") {
      await dialog
        .getByRole("searchbox", { name: "Search Workers" })
        .fill("staging");
      await expect(dialog.getByText("staging-api")).toBeVisible();
      await expect(dialog.getByText("production-api")).toHaveCount(0);
    }
    if (trigger === "Edit deployment") {
      await dialog.getByRole("button", { name: "Save options" }).click();
      await expect(
        page.getByRole("menuitem", { name: "Save as draft" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
    }
    await dialog.getByRole("button", { name: /^(Close|Cancel)$/ }).click();
    await expect(dialog).toHaveCount(0);
  }

  await page
    .getByRole("button", { name: "Edit deployment", exact: true })
    .last()
    .click();
  const parent = page.getByRole("dialog", {
    name: "Edit deployment",
    exact: true,
  });
  await parent.getByRole("button", { name: "Discard changes" }).click();
  const child = page.getByRole("alertdialog", {
    name: "Discard unsaved changes?",
  });
  await expect(child).toBeVisible();
  await child.getByRole("button", { name: "Cancel" }).click();
  await expect(
    parent.getByRole("button", { name: "Discard changes" }),
  ).toBeFocused();
});

test("Layer Dialog keeps the title and actions above the scrolling body", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 730 });
  await page.goto("/components/layer-dialog");
  await page.locator("#svelte-announcer").waitFor({ state: "attached" });
  await page.getByRole("button", { name: "Centered, tall content" }).click();

  const dialog = page.getByRole("dialog", { name: "Audit log" });
  const description = dialog.locator("[data-layer-dialog-description]");
  const viewport = dialog.locator("[data-scroll-area-viewport]");
  const actions = dialog.locator("[data-layer-dialog-actions]");

  await expect(dialog).toHaveCSS("width", "390px");
  await expect(actions).toHaveCSS("border-top-width", "1px");
  const before = await actions.boundingBox();
  await viewport.evaluate((body) => {
    body.scrollTop = 200;
  });
  await expect(description).toHaveCSS("opacity", "0");
  await expect(
    dialog.getByRole("heading", { name: "Audit log" }),
  ).toBeInViewport();
  await expect(
    actions.getByRole("button", { name: "Export log" }),
  ).toBeInViewport();
  expect(await actions.boundingBox()).toEqual(before);
  await viewport.evaluate((body) => {
    body.scrollTop = 0;
  });
  await expect(description).toHaveCSS("opacity", "1");
});
