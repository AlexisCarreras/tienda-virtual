import { Suspense } from 'react';

import { Outlet } from 'react-router';

import { Box } from '@mui/material';

import { LoadingScreen } from '@/shared/components/LoadingScreen';

export const PublicLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="header" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        Header placeholder
      </Box>

      <Box component="main" sx={{ flex: 1, p: 2 }}>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </Box>

      <Box component="footer" sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        Footer placeholder
      </Box>
    </Box>
  );
};
