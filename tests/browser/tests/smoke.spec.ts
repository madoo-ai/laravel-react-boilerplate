import { expect, test } from "../fixtures/auth"

test.describe("authentication and shell", () => {
  test("login page renders", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible()
  })

  test("demo user can sign in", async ({ page, login }) => {
    await login()
    await expect(page).not.toHaveURL(/\/login(?:$|\?)/)
    await expect(page.locator("body")).toBeVisible()
  })
})
