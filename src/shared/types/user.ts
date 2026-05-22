import { type BaseDocument } from './common';

/**
 * Datos extendidos del usuario en Firestore.
 * Firebase Auth maneja la autenticación (email, password, sesión).
 * Acá guardamos info adicional que NO está en Auth: dirección, teléfono, etc.
 */
export type UserProfile = BaseDocument & {
  uid: string; // mismo que el id, pero replicado por claridad
  email: string;
  displayName: string | null;
  photoURL: string | null;
  phone?: string;
  // No guardamos dirección acá, va en cada orden (puede cambiar)
};
