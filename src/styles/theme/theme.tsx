import { shade } from 'polished';
import configureFonts from './fonts';
import type { Theme } from '../types';
import {
  primary400,
  secondary300,
  surface,
  error,
  secondary400,
} from './colors';

const DefaultTheme: Theme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: primary400,
    accent: secondary300,
    background: '#f6f6f6',
    surface,
    error,
    text: '#000',
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: shade('26%', '#000000'),
    placeholder: shade('54%', '#000000'),
    backdrop: shade('50%', '#000000'),
    notification: secondary400,
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
