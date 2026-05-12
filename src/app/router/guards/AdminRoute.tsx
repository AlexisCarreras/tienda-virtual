import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/hooks/useAuth';

import { LoadingScreen } from '@/shared/components/LoadingScreen';

export const AdminRoute = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isAdmin) {
    // Usuario logueado pero no es admin: lo mandamos al home.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
