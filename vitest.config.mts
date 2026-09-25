import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
    // Int specs each boot miniflare against the same local D1 file,
    // so they must not run in parallel (SQLITE_BUSY otherwise).
    pool: 'forks',
    fileParallelism: false,
  },
})
