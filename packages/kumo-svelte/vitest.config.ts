import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      name: 'unit',
      environment: 'happy-dom',
      include: ['src/**/*.{test,spec}.{ts,js}', 'tests/**/*.{test,spec}.{ts,js}'],
      exclude: ['**/*.browser.{test,spec}.{ts,js}'],
      setupFiles: ['./tests/setup.ts'],
      globals: true,
      css: true,
      testTimeout: 10_000,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{ts,svelte}'],
        exclude: [
          '**/*.test.{ts,js}',
          '**/*.spec.{ts,js}',
          '**/*.stories.svelte',
          '**/index.ts',
          'src/routes/**'
        ]
      }
    }
  })
);
