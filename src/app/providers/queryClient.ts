import { QueryClient } from '@tanstack/react-query';

/**
 * Configuración del cliente de React Query.
 *
 * - staleTime: tiempo durante el cual los datos se consideran "frescos".
 *   Mientras estén frescos, no se vuelven a fetchear automáticamente.
 *   5 minutos es un buen default para datos de productos (no cambian seguido).
 *
 * - gcTime: tiempo en cache después de que una query queda sin uso.
 *   10 minutos permite que volver atrás muestre datos instantáneos.
 *
 * - retry: cuántas veces reintenta una query fallida.
 *   1 es un buen balance (un fallo de red puede ser transitorio).
 *
 * - refetchOnWindowFocus: refetch al volver a la pestaña.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
