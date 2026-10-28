import { fileURLToPath } from 'node:url';
import { type StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../../src/modules/branding/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: '@storybook/react-vite',
  viteFinal: async (viteConfig) => {
    const { loadConfigFromFile, mergeConfig } = await import('vite');
    const applicationConfig = await loadConfigFromFile(
      { command: 'serve', mode: 'development' },
      fileURLToPath(new URL('../../vite.config.ts', import.meta.url)),
    );
    return mergeConfig(applicationConfig?.config ?? {}, viteConfig);
  },
};

export default config;
