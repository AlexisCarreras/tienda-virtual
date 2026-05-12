import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/hooks/useAuth';

import { LoadingScreen } from '@/shared/components/LoadingScreen';

export const PublicOnlyRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
