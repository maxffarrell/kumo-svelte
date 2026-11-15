import { expect, test } from "@playwright/test";

test("the homepage sidebar and demos receive pointer input", async ({
  page,
}) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle sidebar" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");

  const selectExample = page.locator("li").filter({
    has: page.locator("#select"),
  });
  await expect(
    selectExample.getByText("(optional)", { exact: true }),
  ).toHaveCount(0);
  const select = page.getByRole("combobox", { name: "Select version" });
  await select.click();
  await page.getByRole("option", { name: "Active versions" }).click();
  await expect(select).toContainText("Active versions");

  const trigger = page.getByRole("button", {
    name: "Open dialog",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test("the homepage gallery follows the upstream order and supports tag and range editing", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#svelte-announcer").waitFor({ state: "attached" });
  const gallery = page.locator("[data-vr-home-grid]");
  const cards = await gallery.locator(":scope > li > a").allTextContents();
  expect(cards.slice(0, 6).map((label) => label.trim())).toEqual([
    "Button",
    "Button Group",
    "Input",
    "Tag Input",
    "Select",
    "Toolbar",
  ]);
  await expect(
    gallery.getByRole("button", { name: "Deploy", exact: true }),
  ).toBeEnabled();
  const tagInput = gallery.getByPlaceholder("Add a label");
  await tagInput.fill("backend");
  await tagInput.press("Enter");
  await expect(
    gallery.getByRole("button", { name: "Remove backend" }),
  ).toBeVisible();
  await gallery.getByRole("button", { name: "Remove frontend" }).click();
  await expect(
    gallery.getByRole("button", { name: "Remove frontend" }),
  ).toHaveCount(0);

  const minimum = gallery.getByRole("slider", { name: "Minimum" });
  await expect(minimum).toHaveAttribute("aria-valuenow", "25");
  await minimum.press("ArrowRight");
  await expect(minimum).toHaveAttribute("aria-valuenow", "26");
  const radio = gallery.getByRole("radiogroup", { name: "Select option" });
  await radio.getByRole("radio", { name: "Option 2" }).click();
  await expect(radio.getByRole("radio", { name: "Option 2" })).toBeChecked();
});

test("the mobile sidebar opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const sidebar = page.locator("aside").filter({
    has: page.getByRole("button", { name: "Close menu" }),
  });
  await expect(sidebar).not.toBeInViewport();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(sidebar).toBeInViewport();
  await sidebar.getByRole("button", { name: "Close menu" }).click();
  await expect(sidebar).not.toBeInViewport();
});

test("Autocomplete sizes its popup from the input anchor", async ({ page }) => {
  await page.goto("/components/autocomplete");
  await page.locator("#svelte-announcer").waitFor({ state: "attached" });

  const input = page.getByPlaceholder("Search fruits…", { exact: true });
  await input.pressSequentially("a");

  const popup = page.locator("[data-combobox-content]").filter({
    has: page.getByRole("option", { name: "Apple", exact: true }),
  });
  await expect(popup).toBeVisible();

  const anchorWidth = (await input.boundingBox())!.width;
  await expect
    .poll(async () =>
      Math.abs((await popup.boundingBox())!.width - anchorWidth),
    )
    .toBeLessThan(2);
});

test("Combobox sizes its popup from the field anchor", async ({ page }) => {
  await page.goto("/");
  const input = page.getByPlaceholder("Select an issue...");
  const trigger = page.getByRole("button", { name: "Show options" });
  await trigger.click();
  const menu = page.locator("[data-combobox-content]");
  await expect(menu).toBeVisible();
  const anchorWidth = (await input.boundingBox())!.width;
  await expect
    .poll(async () => Math.abs((await menu.boundingBox())!.width - anchorWidth))
    .toBeLessThan(2);
});

test("search opens BubbleMap on Maps without a duplicate Charts card", async ({
  page,
}) => {
  await page.goto("/charts");
  await expect(
    page.getByRole("heading", { name: "Available Charts" }),
  ).toBeVisible();
  await expect(page.getByText("Bubble Map", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Color Palette", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Search..." }).click();
  await page.getByRole("textbox", { name: "Search docs" }).fill("bubble");
  await page.getByRole("button", { name: /BubbleMap/ }).click();
  await expect(page).toHaveURL(/\/charts\/maps\/?#bubble-map$/);
  await expect(page.locator("#bubble-map")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(3);
  const response = await page.request.get("/maps/world-countries.geojson");
  const data = await response.json();
  expect(data.features.length).toBeGreaterThan(150);
});

test("chart color demos render and missing routes return an interactive 404", async ({
  page,
}) => {
  await page.goto("/charts/colors");
  await expect(
    page.getByRole("heading", { name: "Categorical palette" }),
  ).toBeVisible();
  await expect(page.locator("canvas").first()).toBeVisible();
  await expect(page.getByText("Loading example...")).toHaveCount(0);

  const response = await page.goto("/missing/docs/example");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  const logo = page.getByRole("button", { name: "Reverse logo animation" });
  await logo.click();
  await expect(logo).toHaveAttribute("aria-pressed", "true");
});

test.describe("dropdown motion", () => {
  test.use({ reducedMotion: "no-preference" });

  test("the homepage dropdown animates open and closed", async ({ page }) => {
    await page.goto("/");
    await page.locator("#svelte-announcer").waitFor({ state: "attached" });
    const trigger = page
      .locator("li")
      .filter({ has: page.locator("#dropdown") })
      .getByRole("button", { name: "Add", exact: true });
    const popup = page.locator(
      '[data-kumo-component="DropdownMenu"][data-kumo-part="positioner"]',
    );
    const trackOpacityTransition = () =>
      page.evaluate(() => {
        const onTransition = (event: TransitionEvent) => {
          if (
            event.propertyName === "opacity" &&
            (event.target as Element).matches(
              '[data-kumo-component="DropdownMenu"][data-kumo-part="positioner"]',
            )
          ) {
            document.documentElement.dataset.dropdownTransition = "started";
            document.removeEventListener("transitionrun", onTransition);
          }
        };
        delete document.documentElement.dataset.dropdownTransition;
        document.addEventListener("transitionrun", onTransition);
      });

    await trackOpacityTransition();
    await trigger.click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-dropdown-transition",
      "started",
    );
    await expect(popup).toHaveCSS("opacity", "1");

    await trackOpacityTransition();
    await page.keyboard.press("Escape");
    await expect(page.locator("html")).toHaveAttribute(
      "data-dropdown-transition",
      "started",
    );
    await expect(popup).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
});
