import { createTheme, responsiveFontSizes, type Theme } from '@mui/material/styles';

import { darkPalette, lightPalette } from './tokens/palette';
import { shape } from './tokens/shape';
import { typography } from './tokens/typography';

export type ThemeMode = 'light' | 'dark';

export const createAppTheme = (mode: ThemeMode): Theme => {
  const baseTheme = createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography,
    shape,
    shadows: [
      'none',
      '0px 1px 2px rgba(26, 22, 20, 0.04)',
      '0px 2px 4px rgba(26, 22, 20, 0.06)',
      '0px 4px 8px rgba(26, 22, 20, 0.08)',
      '0px 8px 16px rgba(26, 22, 20, 0.1)',
      '0px 12px 24px rgba(26, 22, 20, 0.12)',
      ...Array(19).fill('0px 16px 32px rgba(26, 22, 20, 0.14)'),
    ] as Theme['shadows'],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            paddingInline: 20,
            paddingBlock: 10,
            transition: 'all 0.2s ease',
          },
        },
        variants: [
          {
            props: { variant: 'contained', color: 'primary' },
            style: {
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0px 2px 8px rgba(180, 82, 30, 0.25)',
              },
            },
          },
        ],
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none', // Saca el gradient default de MUI en dark mode
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.25s ease, color 0.25s ease',
          },
        },
      },
    },
  });

  return responsiveFontSizes(baseTheme);
};
