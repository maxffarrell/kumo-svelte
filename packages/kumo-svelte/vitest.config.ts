import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    conditions: ['browser']
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/components/setup.ts'],
    include: ['tests/components/**/*.test.ts']
  }
});
