import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const qaDir = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.resolve(qaDir, "../..")

// Fortify limits login to five attempts per minute for each email and IP
// address (app/Providers/FortifyServiceProvider.php). Every spec signs in as
// the same demo account from the same address. Back-to-back suite runs would
// inherit the previous run's counter and fail with HTTP 429. Sessions use a
// different database table, so clearing the cache only resets the limiter.
export default async function globalSetup() {
  if (process.env.QA_SKIP_CACHE_CLEAR === "1") return
  if (!existsSync(path.join(appRoot, "vendor", "autoload.php"))) return
  execFileSync("php", [path.join(appRoot, "artisan"), "cache:clear"], {
    cwd: appRoot,
    stdio: "pipe",
  })
}
