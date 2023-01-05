import type { Color, FontSize, FontWeight, BreakPoint } from '@/styles/theme';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Color;
    fontSizes: FontSize;
    fontWeights: FontWeight;
    breakPoints: BreakPoint;
  }
}
