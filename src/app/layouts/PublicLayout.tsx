import { Suspense } from 'react';

import { Outlet } from 'react-router';

import { DarkMode, LightMode } from '@mui/icons-material';
import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material';

import { LoadingScreen } from '@/shared/components/LoadingScreen';
import { useThemeStore } from '@/shared/stores/themeStore';

export const PublicLayout = () => {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        component="header"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
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
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Dora Galiano
          </Typography>

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
