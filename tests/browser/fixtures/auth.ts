import { test as base, expect, type Page } from "@playwright/test"

type QAFixtures = {
  login: (email?: string, password?: string) => Promise<void>
}

async function signIn(page: Page, email: string, password: string) {
  await page.goto("/login")
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel("Password", { exact: true }).fill(password)
  await page.getByRole("button", { name: /sign in/i }).click()
  await expect(page).not.toHaveURL(/\/login(?:$|\?)/)
}

export const test = base.extend<QAFixtures>({
  login: async ({ page }, use) => {
    await use(async (email = "user@example.com", password = "password") => {
      await signIn(page, email, password)
    })
  },
})

export { expect }
