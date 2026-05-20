import { type Timestamp } from 'firebase/firestore';

/**
 * Campos que todos los documentos de Firestore comparten.
 * Los heredan los demás modelos (Product, Category, Order, etc).
 */
export type BaseDocument = {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

/**
 * Versión "draft" para crear documentos nuevos:
 * sin id (lo genera Firestore) y sin timestamps (los set al crear).
 */
export type Draft<T extends BaseDocument> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Versión para actualizar: todo opcional excepto el id.
 * Útil para updates parciales: "actualiza solo el precio de este producto".
 */
export type UpdatePayload<T extends BaseDocument> = Partial<Omit<T, 'id' | 'createdAt'>>;

/**
 * Status de loading genérico, sirve para representar estados en hooks.
 */
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';
