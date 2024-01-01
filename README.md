# ui-tests

UI tests for the Monzo website written using Playwright.

### Getting started

1. Install dependencies

```
npm install
```

2. Run tests

```
npx playwright test
```

### Repo structure

- Test files live in `/tests`
- Page objects and constants live in `/utils`

### Future improvements (non-exhaustive)

- Fix issue running tests via GH actions - seems like a browser locale issue. All tests pass locally
- Add additional validation to terms & conditions and privacy policy tests. Probably more suitable to use a visual testing tool
- Add visual testing (e.g. Applitools)
- Put thought into which tests should run against which browsers type or size. Probably wouldn't want to run every single test across every browser type and viewport size, as UI tests are already slow to run
