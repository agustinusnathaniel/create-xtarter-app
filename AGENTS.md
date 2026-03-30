# create-xtarter-app - Agent Guidelines

## Build & Test
```bash
pnpm build          # Build with tsdown
pnpm start --help   # Test CLI
node dist/cli.mjs test-app -t vite-tailwind --no-git  # Full test
```

## Code Quality
```bash
pnpm biome:check    # Check code
pnpm biome:fix      # Auto-fix
```

## Project Structure
- `src/cli.ts` - Main entry point
- `src/prompts/` - Interactive prompts (clack)
- `src/templates/registry.ts` - Template definitions
- `src/utils/` - Download, install, git, file ops

## Dependencies
- `giget` - Template downloads
- `@clack/prompts` - Interactive UI
- `citty` - CLI args
- `tinyexec` - Process execution
- `tsdown` - Build (Rolldown)

## Import Paths
Use `@/` alias for all imports:
```ts
import { foo } from '@/utils/foo';
```
