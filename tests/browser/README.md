# QA browser harness

This directory is the product Playwright suite for the browser harness. It is
tracked source. QA owns its test additions and may commit them on a QA branch;
the control plane merges the tested test commit into main.

The QA agent owns this directory. Other agents may read it and run it, but they
must not weaken its tests to make an implementation pass.

## Requirements

- Chrome for Testing is at `/opt/chromium/chrome`.
- Node 22 is on the image.
- Install the pinned runner once:

```sh
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm --prefix tests/browser ci
```

## Run

```sh
npm --prefix tests/browser test
```

The base URL defaults to `http://127.0.0.1:8000`. Override it with:

```sh
QA_BASE_URL=http://127.0.0.1:8000 npm --prefix tests/browser test
```

Demo accounts use password `password`. Never put real secrets in a spec.

The global setup runs `php artisan cache:clear` once per suite. This resets the
Fortify login limiter, which is keyed by email and IP. Without the reset, two
back-to-back suite runs can inherit the same counter and fail with HTTP 429.

## Rules

- Use role and test-id locators, not snapshot refs.
- Playwright auto-waits. Do not add fixed `waitms`.
- Screenshots and traces are retained only on failure.
- A failed test should leave enough evidence to diagnose the defect.
- Add a regression test for every repeatable QA finding.
- Commit changes to this directory only from a QA session, and only as test
  changes.
- The suite is part of the product repository. Commit test changes so the
  control plane can merge the tested test commit into main for the next loop.

## Commit test changes

Use a test-only commit:

```sh
git add tests/browser
git -c user.name="Alcides QA" -c user.email="qa@manus.local" \
  commit -m "test(qa): add login smoke coverage"
```

Do not put product code in this commit.
