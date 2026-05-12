type AuthUser = {
  uid: string;
  email: string;
  displayName: string | null;
  isAdmin: boolean;
};

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

/**
 * Hook mock de autenticación.
 * TODO: reemplazar por integración real con Firebase Auth en el módulo 5.
 */
export const useAuth = (): AuthState => {
  // Por ahora retornamos un estado "no autenticado" para poder armar los guards.
  // Cuando integremos Firebase, este hook va a leer el usuario real desde Firebase Auth.
  return {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  };
};
