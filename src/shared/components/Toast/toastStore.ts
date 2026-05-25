import { type ReactNode } from 'react';

export type ToastSeverity = 'success' | 'info' | 'warning' | 'error';

export type ToastItem = {
  id: string;
  message: ReactNode;
  title?: ReactNode;
  severity: ToastSeverity;
  /** Duración en ms. 0 = no se cierra automáticamente. Default: 4000 */
  duration: number;
  /** Acción opcional dentro del toast. */
  action?: ReactNode;
};

type Listener = (toasts: ToastItem[]) => void;

/**
 * Store simple de toasts en memoria.
 *
 * Mantiene la lista de toasts activos y notifica a sus listeners
 * cuando cambia.
 *
 * El listener principal es el ToastProvider que re-renderiza cuando
 * cambia la lista para mostrar los toasts en pantalla.
 */
class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners: Set<Listener> = new Set();

  /** Suscribirse a cambios. Retorna función para desuscribirse. */
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Obtiene la lista actual de toasts. */
  getToasts(): ToastItem[] {
    return this.toasts;
  }

  /** Agrega un toast nuevo y notifica. */
  add(toast: Omit<ToastItem, 'id'>): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const newToast: ToastItem = { ...toast, id };
    this.toasts = [...this.toasts, newToast];
    this.notify();
    return id;
  }

  /** Elimina un toast por ID. */
  remove(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  /** Elimina todos los toasts. */
  clear(): void {
    this.toasts = [];
    this.notify();
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.toasts));
  }
}

// Singleton: una sola instancia para toda la app
export const toastStore = new ToastStore();

type ToastOptions = {
  title?: ReactNode;
  duration?: number;
  action?: ReactNode;
};

/**
 * API pública para disparar toasts desde cualquier parte de la app.
 *
 * @example
 *   import { toast } from '@/shared/components'
 *
 *   toast.success('Producto guardado')
 *   toast.error('No se pudo procesar el pago')
 *   toast.info('Tu carrito está vacío')
 *   toast.warning('Pocas unidades disponibles', { duration: 6000 })
 */
export const toast = {
  success: (message: ReactNode, options: ToastOptions = {}) =>
    toastStore.add({
      message,
      severity: 'success',
      title: options.title,
      duration: options.duration ?? 4000,
      action: options.action,
    }),

  error: (message: ReactNode, options: ToastOptions = {}) =>
    toastStore.add({
      message,
      severity: 'error',
      title: options.title,
      duration: options.duration ?? 5000,
      action: options.action,
    }),

  info: (message: ReactNode, options: ToastOptions = {}) =>
    toastStore.add({
      message,
      severity: 'info',
      title: options.title,
      duration: options.duration ?? 4000,
      action: options.action,
    }),

  warning: (message: ReactNode, options: ToastOptions = {}) =>
    toastStore.add({
      message,
      severity: 'warning',
      title: options.title,
      duration: options.duration ?? 4500,
      action: options.action,
    }),

  /** Cerrar un toast específico. */
  dismiss: (id: string) => toastStore.remove(id),

  /** Cerrar todos los toasts. */
  dismissAll: () => toastStore.clear(),
};
