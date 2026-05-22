import { type ReactNode, useMemo } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { createAppTheme } from '@/app/theme';

import { useThemeStore } from '@/shared/stores/themeStore';

type AppThemeProviderProps = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const mode = useThemeStore((state) => state.mode);

  // Memoizamos el theme para no recrearlo en cada render.
  // Solo se rearma cuando cambia el modo.
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
