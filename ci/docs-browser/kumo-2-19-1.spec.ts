import { expect, test } from "@playwright/test";

test("Kumo 2.19.1 mirrors tabs and toast behavior in RTL", async ({ page }) => {
  await page.goto("/tests/kumo-2-19-1");
  await page.locator("#svelte-announcer").waitFor({ state: "attached" });
  const tablist = page.getByRole("tablist");
  const scrollLeft = page.getByRole("button", { name: "Scroll tabs left" });
  await expect(scrollLeft).toBeVisible();
  expect((await scrollLeft.boundingBox())!.x).toBeLessThan(
    (await tablist.boundingBox())!.x + 12,
  );
  await scrollLeft.click();
  await expect
    .poll(() => tablist.evaluate((el) => el.scrollLeft))
    .toBeLessThan(0);
  await expect(
    page.getByRole("button", { name: "Scroll tabs right" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Show RTL toast" }).click();
  const toast = page.getByRole("status", { name: "Notifications" });
  const title = toast.getByText("RTL notification");
  await expect(title).toBeVisible();
  await expect(toast).toHaveCSS("direction", "rtl");
  const box = (await toast.boundingBox())!;
  expect(box.x).toBeLessThan(40);
  const close = (await toast
    .getByRole("button", { name: "Close" })
    .boundingBox())!;
  expect(close.x).toBeLessThan(box.x + 20);
  const item = toast.locator("[data-kumo-part='surface']").locator("..");
  await expect(item).not.toHaveAttribute("data-starting-style");
  const swipe = async (distance: number) => {
    await item.evaluate(async (el) => {
      await Promise.allSettled(
        el.getAnimations().map((animation) => animation.finished),
      );
    });
    const titleBox = (await title.boundingBox())!;
    const x = titleBox.x + titleBox.width / 2;
    const y = titleBox.y + titleBox.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + distance, y, { steps: 5 });
    await expect(item).toHaveAttribute("data-swiping", "");
    await page.mouse.up();
  };
  await swipe(85);
  await expect(title).toBeVisible();
  await swipe(-85);
  await expect(title).toHaveCount(0);
});

test("Kumo 2.19.1 applies the secondary badge and Text size tokens", async ({
  page,
}) => {
  await page.goto("/tests/kumo-2-19-1");
  await expect(page.getByText("Secondary badge")).toHaveClass(
    /bg-kumo-badge-secondary/,
  );
  const heading = page.getByRole("heading", {
    name: "Small copy heading",
    level: 2,
  });
  await expect(heading).toHaveCSS("font-size", "13px");
  await expect(heading).toHaveCSS("line-height", /^18\.5714\d*px$/);
});
