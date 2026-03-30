# Backlog

Future improvements for `create-xtarter-app`.

---

## Analytics (Telemetry)

**Goal:** Understand usage patterns to improve templates and CLI.

**Implementation:**
- Anonymous, opt-out (not opt-in)
- Track: template chosen, package manager, flags used, Node.js version
- Lightweight: `posthog` or custom endpoint
- Respect `DO_NOT_TRACK` env var

**Privacy:**
- No personal data (project name, paths, etc.)
- Clear documentation in README
- Easy opt-out: `NO_ANALYTICS=1`

**Priority:** Medium  
**Effort:** 2-3 hours

---

## CI/CD Workflow

**Goal:** Ensure every commit works across platforms.

**Implementation:**
- GitHub Actions workflow
- Run on: Linux (Ubuntu), macOS, Windows
- Jobs:
  ```yaml
  - pnpm type-check
  - pnpm biome:check
  - pnpm build
  - pnpm test
  - E2E: scaffold test project, verify build succeeds
  ```
- Block merges on failure

**Priority:** High  
**Effort:** 3-4 hours

---

## Template Versioning

**Goal:** Allow users to scaffold specific template versions.

**Implementation:**
```bash
npx create-xtarter-app my-app -t vite-tailwind@1.0.0
```
- Tag template releases in repos
- Parse version from template flag
- Pass to giget as branch/tag

**Priority:** Low  
**Effort:** 4-5 hours

---

## Add-ons / Plugins

**Goal:** Let users add features during scaffold.

**Implementation:**
```
? Add-ons to include:
☑ Playwright E2E tests
☐ Storybook
☐ Docker setup
☐ GitHub Actions CI
```
- Each add-on is a patch/file overlay
- Apply after template download

**Priority:** Medium  
**Effort:** 6-8 hours

---

## Update Command

**Goal:** Help users update existing projects to latest template.

**Inspiration:** [`shadcn diff`](https://ui.shadcn.com/docs/changelog#diff-experimental)

**Implementation:**
```bash
npx create-xtarter-app --update
# or
npx create-xtarter-app diff
```
- Compare current files with latest template
- Show diff (like `git diff`)
- Offer to apply changes (patch, merge, skip)
- Handle conflicts gracefully

**Priority:** Medium  
**Effort:** 8-10 hours

**Notes from shadcn:**
- Their `diff` command compares local vs upstream
- Still experimental (as of 2024)
- User feedback: wants to compare against *installed* version, not just latest

---

## Custom Template URL

**Goal:** Allow users to scaffold from any GitHub repo.

**Implementation:**
```bash
npx create-xtarter-app my-app --template https://github.com/user/repo
```
- Validate repo exists
- Download via giget
- Skip package.json name update (user's repo)

**Priority:** Low  
**Effort:** 2-3 hours

---

*Last updated: March 2026*
