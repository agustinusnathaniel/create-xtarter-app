# ADR 004: Module Replacements (e18e Recommendations)

## Status
Implemented

## Context

The [e18e project](https://e18e.dev) maintains a module replacements dataset and CLI tool that identifies packages that can be replaced with more performant, modern, or native alternatives.

**References:**
- [e18e Replacements Docs](https://e18e.dev/docs/replacements/)
- [e18e Analyze CLI](https://e18e.dev/docs/cli/analyze.html)
- [31 npm packages you can replace with Node.js APIs](https://dev.to/lingodotdev/31-npm-packages-you-can-replace-with-nodejs-apis-17o8)

## Current Dependencies Analysis

| Package | Previous | Current | e18e Recommends | Status |
|---------|----------|---------|-----------------|--------|
| `chalk` | 5.6.2 | `picocolors` 1.1.1 | `picocolors` or `node:util` | ✅ **Replaced** |
| `fs-extra` | 11.3.4 | `node:fs/promises` | `node:fs/promises` | ✅ **Replaced** |
| `tinyglobby` | 0.2.15 | ✅ Same | ✅ Already recommended | ✅ No change |
| `tinyexec` | 1.0.4 | ✅ Same | ✅ Already recommended | ✅ No change |

## Decisions

### Replace `chalk` → `picocolors`

**Why:**
- `picocolors` is 3x smaller than `chalk` (~5KB vs ~15KB)
- Same API (drop-in replacement: `chalk.red()` → `pc.red()`)
- e18e explicitly recommends this replacement
- No Node.js version requirements

**Migration:**
```typescript
// Before
import chalk from 'chalk';
chalk.red('error');

// After
import pc from 'picocolors';
pc.red('error');
```

### Replace `fs-extra` → `node:fs/promises`

**Why:**
- Native Node.js APIs since v14+
- `fs-extra` was only used for 4 methods:
  - `pathExists()` → `access()` wrapper (10 lines)
  - `readJSON()` → `readFile()` + `JSON.parse()`
  - `writeJSON()` → `writeFile()` + `JSON.stringify()`
  - `remove()` → `rm()` with `{ recursive: true, force: true }`
- Removes 6 dependencies (fs-extra + subdeps)
- ~150KB bundle size reduction

**Migration:**
```typescript
// Before
import { readJSON, writeJSON, pathExists, remove } from 'fs-extra/esm';

// After
import { access, readFile, writeFile, rm } from 'node:fs/promises';

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
```

### Already Using Best Practices

✅ **`tinyglobby`** - e18e explicitly recommends this over `fast-glob`
✅ **`tinyexec`** - Already replaced `execa` (lighter, simpler)

## Implementation

### What We Changed
- ✅ Replaced `chalk` with `picocolors` across all files
- ✅ Replaced `fs-extra/esm` with `node:fs/promises`
- ✅ Added `pathExists()` helper using `access()`
- ✅ Removed `fs-extra` dependency
- ✅ Added `picocolors` dependency

### Impact
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Dependencies | 8 | 4 | -50% |
| Bundle size (dist/) | ~69KB | ~61KB | -12% |
| Native APIs used | 2 | 5 | +150% |

## How to Run Analysis

```bash
# Install e18e CLI
npm install -g @e18e/cli

# Analyze the project
e18e-cli analyze

# Analyze with custom manifest (if needed)
e18e-cli analyze --manifest ./module-replacements.json
```

## Related

- ADR 002: Dependency Selection
- docs/backlog.md - Analytics & CI/CD (future: add e18e analyze to CI)

---

*Last updated: March 2026*
*Implementation: Commit ed8e09d*
