import { defineConfig, devices } from "@playwright/test"

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ?? "/opt/chromium/chrome"
const baseURL = process.env.QA_BASE_URL ?? "http://127.0.0.1:8000"

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  use: {
    baseURL,
    browserName: "chromium",
    headless: true,
    ignoreHTTPSErrors: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: {
      executablePath,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    },
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], browserName: "chromium" },
    },
  ],
})
