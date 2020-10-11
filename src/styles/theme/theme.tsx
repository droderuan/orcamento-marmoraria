import { shade } from 'polished';
import { DefaultTheme } from 'react-native-paper';
import configureFonts from './fonts';

import * as colors from './colors';

const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary900,
    accent: colors.secondary300,
    background: '#f6f6f6',
    surface: colors.surface,
    error: colors.error,
    text: '#000',
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: shade('26%', '#000000'),
    placeholder: shade('54%', '#000000'),
    backdrop: shade('50%', '#000000'),
    notification: colors.secondary400,
  },
  fonts: {
    regular: {
      fontFamily:
        'Roboto-Regular, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily:
        'Roboto-Medium, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500' as const,
    },
    light: {
      fontFamily: 'Heebo-Light, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300' as const,
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100' as const,
    },
  },
  animation: {
    scale: 1.0,
  },
};

export default theme;
