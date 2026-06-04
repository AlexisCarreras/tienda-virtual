import { Suspense } from 'react';

import { Outlet } from 'react-router';

import { Box } from '@mui/material';

import { ScrollToTop } from '@/app/router/ScrollToTop';

import { LoadingScreen } from '@/shared/components/LoadingScreen/LoadingScreen';

export const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <ScrollToTop />
      <Box
        component="aside"
        sx={{
          width: 240,
          borderRight: 1,
          borderColor: 'divider',
          p: 2,
        }}
      >
        Admin Sidebar placeholder
      </Box>

      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};
