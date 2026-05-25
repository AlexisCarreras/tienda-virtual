import { type ReactNode } from 'react';

import { ToastContainer } from './ToastContainer';

type ToastProviderProps = {
  children: ReactNode;
};

/**
 * Provider que activa el sistema de toasts en la app.
 *
 * Se monta una sola vez en la raíz (en Providers.tsx) y desde ahí cualquier
 * componente puede disparar toasts usando la función global `toast`.
 *
 * @example
 *   // En Providers.tsx
 *   <ToastProvider>
 *     <App />
 *   </ToastProvider>
 *
 *   // En cualquier componente
 *   import { toast } from '@/shared/components'
 *   toast.success('Producto guardado')
 */
export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
