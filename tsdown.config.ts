import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/cli.ts', 'src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  clean: true,
  sourcemap: false,
  dts: true, // Generate .d.ts files
  minify: false,
  target: 'node18',
  platform: 'node',
});
