import type { RenderOptions } from '@testing-library/react';
import type { FC, ReactElement } from 'react';

import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/styles/globalStyle';
import { theme } from '@/styles/theme';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });
