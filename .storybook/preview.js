import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/styles/globalStyle';
import { theme } from '@/styles/theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};
