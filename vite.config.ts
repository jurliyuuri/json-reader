/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest-setup.ts'],
    // スナップショットの保存先を設定
    resolveSnapshotPath: (path, extension) => {
      return path.replace('/src/', '/__snapshots__/') + extension
    },
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude as string[],
        "docs/**"
      ]
    }
  },
  publicDir: false,
  base: './',
  build: {
    outDir: 'docs'
  },
  server: {
    strictPort: true
  }
})
