# ADR 004: Module Replacements (e18e Recommendations)

## Status
Accepted (partial)

## Context

The [e18e project](https://e18e.dev) maintains a module replacements dataset and CLI tool that identifies packages that can be replaced with more performant, modern, or native alternatives.

**References:**
- [e18e Replacements Docs](https://e18e.dev/docs/replacements/)
- [e18e Analyze CLI](https://e18e.dev/docs/cli/analyze.html)
- [31 npm packages you can replace with Node.js APIs](https://dev.to/lingodotdev/31-npm-packages-you-can-replace-with-nodejs-apis-17o8)

## Current Dependencies Analysis

| Package | Current Version | e18e Recommends | Our Decision |
|---------|----------------|-----------------|--------------|
| `chalk` | 5.6.2 | `node:util` (`util.styleText()`) | **Keep chalk** |
| `fs-extra` | 11.3.4 | `node:fs/promises` | **Keep fs-extra** |
| `tinyglobby` | 0.2.15 | ✅ Already using recommended | ✅ No change |
| `tinyexec` | 1.0.4 | ✅ Already using recommended | ✅ No change |
| `execa` | Not used | `tinyexec` | ✅ Already replaced |
| `glob` | Not used | `node:fs/promises` | ✅ Not applicable |
| `rimraf` | Not used | `node:fs/promises` | ✅ Not applicable |
| `mkdirp` | Not used | `node:fs/promises` | ✅ Not applicable |

## Decisions

### Keep `chalk` (not `util.styleText()`)

**Why we keep it:**
- `util.styleText()` requires Node.js 20+
- `chalk` has better API ergonomics (chainable, composable)
- `chalk` supports 256 colors and true colors
- `chalk` is tree-shakeable in modern bundlers
- Our CLI targets Node.js 18+

**Trade-off:** +1 dependency (~50KB)

### Keep `fs-extra` (not `node:fs/promises`)

**Why we keep it:**
- `fs-extra` provides convenience methods we use:
  - `readJSON()` / `writeJSON()` - atomic JSON operations
  - `pathExists()` - cleaner than try/catch with `fs.access()`
  - `remove()` - recursive delete (simpler than `fs.rm()` with options)
- Better error messages
- Graceful-fs integration prevents EMFILE errors
- Our CLI does heavy file operations during scaffold

**Trade-off:** +3 dependencies (~200KB)

### Already Using Best Practices

✅ **`tinyglobby`** - e18e explicitly recommends this over `fast-glob`
✅ **`tinyexec`** - Already replaced `execa` (lighter, simpler)
✅ **Not using deprecated packages** - No `glob`, `rimraf`, `mkdirp`, etc.

## Implementation

### What We Changed
- Already using `tinyglobby` instead of `fast-glob`
- Already using `tinyexec` instead of `execa`
- No additional changes needed

### What We Monitored
- `chalk` → Revisit when Node.js 20 is minimum
- `fs-extra` → Revisit if we need to reduce bundle size

## Consequences

### Positive
- ✅ Already following e18e best practices for critical packages
- ✅ Small, modern dependency tree
- ✅ Good performance with `tinyglobby` and `tinyexec`

### Neutral
- ⚠️ `chalk` adds ~50KB to bundle (acceptable for CLI UX)
- ⚠️ `fs-extra` adds ~200KB (acceptable for convenience)

### Future Actions
- Monitor Node.js 20 adoption (for `util.styleText()` migration)
- Consider `node:fs/promises` if bundle size becomes critical
- Run `e18e-cli analyze` periodically to catch new recommendations

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
- docs/backlog.md - Analytics & CI/CD (future: add analyze to CI)

---

*Last updated: March 2026*
