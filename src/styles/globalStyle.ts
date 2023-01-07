import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'SUIT Variable';
    src: url('../assets/fonts/SUIT-Variable.ttf') format('truetype');
  }

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: SUIT Variable, -apple-system, 'Segoe UI', Roboto, 'Open Sans', sans-serif;
    color: ${({ theme }) => theme.colors.black};
  }

  html, body {
    font-family: SUIT Variable, -apple-system, 'Segoe UI', Roboto, 'Open Sans', sans-serif;
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
