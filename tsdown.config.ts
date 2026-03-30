import { defineConfig } from 'tsdown';

export default defineConfig({
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
});
