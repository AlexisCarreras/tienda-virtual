import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '@/features/auth/hooks/useAuth';

import { LoadingScreen } from '@/shared/components/LoadingScreen/LoadingScreen';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    // Guardamos la ruta a la que el usuario quería ir para redirigirlo ahí después del login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
