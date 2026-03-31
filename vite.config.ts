import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'ultracite fix',
  },
  pack: {
    entry: ['src/cli.ts', 'src/index.ts'],
    outDir: 'dist',
    format: ['esm'],
    clean: true,
    sourcemap: false,
    dts: {
      sourcemap: true, // Generate .d.ts.map for better IDE support
    },
    minify: true, // Reduce bundle size
    target: 'node18',
    platform: 'node',
    treeshake: true, // Remove unused code
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  test: {
    name: 'create-xtarter-app',
    root: './src',
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
  resolve: {
    tsconfigPaths: true,
  },
});
