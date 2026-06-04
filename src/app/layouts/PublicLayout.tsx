import { Suspense } from 'react';

import { Outlet } from 'react-router';

import { Box } from '@mui/material';

import { ScrollToTop } from '@/app/router/ScrollToTop';

import { Footer, Header, LoadingScreen } from '@/shared/components';

export const PublicLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />

      <Box
        component="main"
        sx={{
          flex: 1,
          pt: { xs: 3, md: 4 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </Box>

      <Footer />
    </Box>
  );
};
