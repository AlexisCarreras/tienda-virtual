import { Suspense } from 'react';

import { Outlet, Link as RouterLink } from 'react-router';

import { DarkMode, LightMode } from '@mui/icons-material';
import { Box, Container, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { LoadingScreen } from '@/shared/components/LoadingScreen';
import { Logo } from '@/shared/components/Logo';
import { useThemeStore } from '@/shared/stores/themeStore';

export const PublicLayout = () => {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        component="header"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          position: 'sticky',
          top: 0,
          zIndex: (t) => t.zIndex.appBar,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
          }}
        >
          <RouterLink
            to="/"
            aria-label="Ir al inicio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Logo variant={isMobile ? 'icon' : 'full'} height={isMobile ? 32 : 48} />
          </RouterLink>

          <Tooltip title={mode === 'light' ? 'Modo oscuro' : 'Modo claro'}>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
        </Container>
      </Box>

      <Box component="main" sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          py: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="caption" color="text.secondary">
            diseño para armar — Dora Galiano © {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
