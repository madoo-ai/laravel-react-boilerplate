# QA browser harness

This directory is the QA-owned browser suite. It is committed to the product
repository for the current experimental Alcides phase, so QA can maintain it
and outside QA can read it.

The QA agent owns this directory. Other agents may read it and run it, but they
must not weaken its tests to make an implementation pass.

## Requirements

- Chrome for Testing is at `/opt/chromium/chrome`.
- Node 22 is on the image.
- Install the pinned runner once:

```sh
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm --prefix .manus/qa ci
```

## Run

```sh
npm --prefix .manus/qa test
```

The base URL defaults to `http://127.0.0.1:8000`. Override it with:

```sh
QA_BASE_URL=http://127.0.0.1:8000 npm --prefix .manus/qa test
```

Demo accounts use password `password`. Never put real secrets in a spec.

## Rules

- Use role and test-id locators, not snapshot refs.
- Playwright auto-waits. Do not add fixed `waitms`.
- Screenshots and traces are retained only on failure.
- A failed test should leave enough evidence to diagnose the defect.
- Add a regression test for every repeatable QA finding.
- Commit changes to this directory only from a QA session, and only as test
  changes.
- A QA reseed keeps this directory and overlays it on the run branch. A
  developer or master reseed gets the committed version from the run branch.
  Commit test changes so the master can collect them as a test patch.
- The commit history stays in the QA workspace. The master must collect the
  test patch before the run completes.

## Commit test changes

Use a test-only commit:

```sh
git add .manus/qa
git -c user.name="Alcides QA" -c user.email="qa@manus.local" \
  commit -m "test(qa): add login smoke coverage"
```

Do not put product code in this commit.
