import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import 'twenty-ui/style.css';
import 'twenty-ui/theme-light.css';
import 'twenty-ui/theme-dark.css';

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { type Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'twenty-ui/theme';

i18n.load('en', {});
i18n.activate('en');

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nProvider i18n={i18n}>
        <ThemeProvider colorScheme="light">
          <Story />
        </ThemeProvider>
      </I18nProvider>
    ),
  ],
  parameters: { layout: 'fullscreen' },
};

export default preview;
