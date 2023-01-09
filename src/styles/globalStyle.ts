import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import SUITVariable from '@/assets/fonts/SUIT-Variable.ttf';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'SUIT Variable';
    src: url(${SUITVariable}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'SUIT Variable';
    src: url(${SUITVariable}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'SUIT Variable';
    src: url(${SUITVariable}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'SUIT Variable';
    src: url(${SUITVariable}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'SUIT Variable', -apple-system, sans-serif;
    color: ${({ theme }) => theme.colors.black};
  }

  html, body {
    font-family: 'SUIT Variable', -apple-system, sans-serif;
    color: ${({ theme }) => theme.colors.black};
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    padding: 0;
    border: none;
    border-radius: 0;
    background: inherit;
    box-shadow: none;
    overflow: visible;
    cursor: pointer;
  }

  ol, ul {
    padding: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
