import { test, expect } from "@playwright/test";

test("desktop navigation and contact work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(3);
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeHidden();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/#about$/);
  await expect(
    page.getByRole("link", { name: "hello@example.com" }),
  ).toHaveAttribute("href", "mailto:hello@example.com");
});

test("theme follows the system until selected, then persists across reloads", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const theme = page.getByRole("button", { name: "Dark theme", exact: true });
  await expect(theme).toHaveAttribute("aria-pressed", "true");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(theme).toHaveAttribute("aria-pressed", "false");
  await theme.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(theme).toHaveAttribute("aria-pressed", "true");
});

test("mobile menu supports keyboard, links, and desktop resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  const nav = page.getByRole("navigation");
  await expect(nav).toBeHidden();
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(menu).toBeFocused();
  await menu.click();
  await nav.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(nav).toBeHidden();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(nav).toBeVisible();
  await expect(menu).toBeHidden();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(nav).toBeHidden();
});

test("keyboard skip link reaches main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("blocked storage does not break theme or navigation", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
  });
  await page.emulateMedia({ colorScheme: "light" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
});

test("content and navigation remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await context.close();
});

for (const width of [320, 390, 768, 1440]) {
  test(`layout fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Selected work" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}
