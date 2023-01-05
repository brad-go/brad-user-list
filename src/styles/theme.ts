import type { DefaultTheme } from 'styled-components';

const colors = {
  lavender: '#CBC5F0',
  lavender_50: '#CBC5F080',
  purple: '#4130BE',
  purple_20: '#4130BE33',
  purple_30: '#4130BE4D',
  purple_40: '#4130BE66',
  purple_60: '#4130BE99',
  white: '#FFFFFF',
  lightGray_70: '#EBEBEBB3',
  lightGray: '#EBEBEB',
  gray: '#D4D4D4',
  black: '#000000',
};

const fontSizes = {
  medium: '15px',
  large: '16px',
};

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
};

const WINDOW_SIZE = 650;

const breakPoints = {
  mobile: `screen and (max-width: ${WINDOW_SIZE}px)`,
  pc: `screen and (min-width: ${WINDOW_SIZE + 1}px)`,
};

export type Color = typeof colors;

export type FontSize = typeof fontSizes;

export type FontWeight = typeof fontWeights;

export type BreakPoint = typeof breakPoints;

export const theme: DefaultTheme = {
  colors,
  fontSizes,
  fontWeights,
  breakPoints,
};
