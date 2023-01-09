import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';

import usersReducer from '@/store/usersSlice';
import GlobalStyle from '@/styles/globalStyle';
import { theme } from '@/styles/theme';

const store = configureStore({
  reducer: usersReducer,
});

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MemoryRouter initialEntries={['/']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
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
