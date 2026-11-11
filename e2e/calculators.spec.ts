import { expect, test, type Page } from "@playwright/test";

async function useEnglish(page: Page) {
  await page.addInitScript(() => localStorage.setItem("startup-academy-language", "en"));
}

async function fillInput(page: Page, label: string, value: string) {
  await page.locator("label").filter({ hasText: label }).locator("input").first().fill(value);
}

test.describe("Interactive financial calculators", () => {
  test.beforeEach(async ({ page }) => {
    await useEnglish(page);
  });

  test("calculates net burn and runway from company inputs", async ({ page }) => {
    await page.goto("/financial-analysis");
    await expect(page).toHaveTitle(/Interactive Financial Analysis/);

    await fillInput(page, "Current cash balance", "100000");
    await fillInput(page, "Monthly revenue", "0");
    await fillInput(page, "Payroll & benefits", "20000");
    await fillInput(page, "Operating expenses", "10000");
    await fillInput(page, "Sales & marketing", "5000");
    await fillInput(page, "Cost of revenue / COGS", "5000");
    await fillInput(page, "One-time expenses this month", "0");

    const netBurnCard = page.locator(".analysis-result-card").filter({ hasText: "Net monthly burn" });
    await expect(netBurnCard.locator("strong")).toHaveText("$40,000");
    const runwayCard = page.locator(".analysis-result-card").filter({ hasText: "Runway" });
    await expect(runwayCard.locator("strong")).toHaveText("2.5 mo");
    await expect(page.locator(".runway-status-card")).toContainText("Cash warning");
  });

  test("shows positive cash flow when revenue covers expenses", async ({ page }) => {
    await page.goto("/financial-analysis#calculator");
    await fillInput(page, "Monthly revenue", "120000");

    await expect(page.locator(".analysis-result-card").filter({ hasText: "Net monthly burn" }).locator("strong")).toHaveText("Positive");
    await expect(page.locator(".runway-status-card")).toContainText("Cash-flow positive");
    await expect(page.locator(".runway-status-card").locator("strong")).toHaveText("∞");
  });

  test("resets financial analysis inputs to the defaults", async ({ page }) => {
    await page.goto("/financial-analysis#calculator");
    await fillInput(page, "Current cash balance", "1");
    await fillInput(page, "Monthly revenue", "1");
    await page.getByRole("button", { name: "Reset" }).click();

    await expect(page.locator("label").filter({ hasText: "Current cash balance" }).locator("input")).toHaveValue("250000");
    await expect(page.locator("label").filter({ hasText: "Monthly revenue" }).locator("input")).toHaveValue("28000");
  });

  test("calculates MRR, CAC, and LTV in the SaaS calculator", async ({ page }) => {
    await page.goto("/financial-model#saas-calculator");
    await expect(page.locator("#saas-calculator")).toBeVisible();

    await fillInput(page, "Current paying customers", "100");
    await fillInput(page, "Average revenue per account", "100");
    await fillInput(page, "New customers per month", "10");
    await fillInput(page, "Sales & marketing spend", "5000");
    await fillInput(page, "Gross margin", "80");
    await fillInput(page, "Monthly churn", "2");

    const results = page.locator(".calculator-result");
    await expect(results.nth(0).locator("strong")).toHaveText("$10,000");
    await expect(results.nth(2).locator("strong")).toHaveText("$500");
    await expect(results.nth(3).locator("strong")).toHaveText("$4,000");
    await expect(results.nth(4).locator("strong")).toHaveText("8x");
  });

  test("switches the financial analysis page to Arabic", async ({ page }) => {
    await page.goto("/financial-analysis");
    await page.getByRole("button", { name: "العربية" }).click();

    await expect(page.locator(".analysis-hero h1")).toContainText("يمكن لشركتك أن تستمر");
    await expect(page.locator(".analysis-section-heading h2")).toContainText("أدخل أرقام الشهر الأخير");
    await expect(page.locator(".financial-analysis-page")).toHaveAttribute("dir", "rtl");
  });
});
