import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type DocumentData,
  type FirestoreDataConverter,
  getDoc,
  getDocs,
  type Query,
  query,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

import { db } from '@/shared/lib/firebase';
import { type BaseDocument, type Draft, type UpdatePayload } from '@/shared/types';

/**
 * Converter genérico de Firestore.
 * Hace dos cosas:
 *  1. Cuando LEEMOS un documento, agrega el `id` automáticamente al objeto.
 *  2. Cuando ESCRIBIMOS, asegura que los timestamps son ServerTimestamp.
 *
 * Sin esto, cada query tendría que mapear manualmente "snapshot.id + snapshot.data()".
 */
const createConverter = <T extends BaseDocument>(): FirestoreDataConverter<T> => ({
  toFirestore: (data) => {
    // Quitamos el id antes de escribir (Firestore lo maneja por su cuenta)
    const { id: _id, ...rest } = data as T;
    return rest as DocumentData;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): T => {
    const data = snapshot.data();
    return {
      ...data,
      id: snapshot.id,
    } as T;
  },
});

/**
 * Obtiene una referencia tipada a una colección.
 *
 * @example
 *   const productsRef = getCollectionRef<Product>('products')
 */
export const getCollectionRef = <T extends BaseDocument>(collectionName: string) => {
  return collection(db, collectionName).withConverter(createConverter<T>());
};

/**
 * Obtiene una referencia tipada a un documento específico.
 *
 * @example
 *   const productRef = getDocRef<Product>('products', 'abc123')
 */
export const getDocRef = <T extends BaseDocument>(collectionName: string, docId: string) => {
  return doc(db, collectionName, docId).withConverter(createConverter<T>());
};

/**
 * Lee un documento por su id.
 * Retorna null si no existe.
 *
 * @example
 *   const product = await getDocument<Product>('products', 'abc123')
 */
export const getDocument = async <T extends BaseDocument>(
  collectionName: string,
  docId: string,
): Promise<T | null> => {
  const ref = getDocRef<T>(collectionName, docId);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data() : null;
};

/**
 * Lee TODOS los documentos de una colección.
 * Acepta constraints opcionales (where, orderBy, limit, etc).
 *
 * @example
 *   // Todos los productos
 *   const all = await getCollection<Product>('products')
 *
 *   // Productos activos ordenados por precio
 *   const active = await getCollection<Product>('products', [
 *     where('isActive', '==', true),
 *     orderBy('price', 'asc'),
 *   ])
 */
export const getCollection = async <T extends BaseDocument>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
): Promise<T[]> => {
  const ref = getCollectionRef<T>(collectionName);
  const q: Query<T> = query(ref, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

/**
 * Crea un documento nuevo con id auto generado por Firestore.
 * Setea automáticamente createdAt y updatedAt.
 *
 * @returns El id del documento creado.
 *
 * @example
 *   const id = await createDocument<Product>('products', {
 *     name: 'Campera Denim',
 *     price: 25000,
 *     ...
 *   })
 */
export const createDocument = async <T extends BaseDocument>(
  collectionName: string,
  data: Draft<T>,
): Promise<string> => {
  const ref = collection(db, collectionName);
  const docRef = await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

/**
 * Crea un documento con id custom (lo elegís vos).
 * Útil cuando el id tiene significado: ej. usar el uid del usuario como id en `users`.
 *
 * @example
 *   await createDocumentWithId<UserProfile>('users', user.uid, {
 *     email: user.email,
 *     displayName: user.displayName,
 *   })
 */
export const createDocumentWithId = async <T extends BaseDocument>(
  collectionName: string,
  docId: string,
  data: Draft<T>,
): Promise<void> => {
  const ref = doc(db, collectionName, docId);
  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Actualiza campos específicos de un documento existente.
 * Setea automáticamente updatedAt.
 *
 * @example
 *   await updateDocument<Product>('products', 'abc123', { price: 30000 })
 */
export const updateDocument = async <T extends BaseDocument>(
  collectionName: string,
  docId: string,
  data: UpdatePayload<T>,
): Promise<void> => {
  const ref = doc(db, collectionName, docId);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Elimina un documento.
 *
 * @example
 *   await deleteDocument('products', 'abc123')
 */
export const deleteDocument = async (collectionName: string, docId: string): Promise<void> => {
  const ref = doc(db, collectionName, docId);
  await deleteDoc(ref);
};

/**
 * Convierte un Firestore Timestamp a Date nativo de JS.
 * Útil para formateo de fechas en la UI.
 *
 * @example
 *   const date = timestampToDate(order.createdAt) // Date
 *   format(date, 'dd/MM/yyyy', { locale: es })    // '18/05/2026'
 */
export const timestampToDate = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};

/**
 * Convierte un Date nativo a Firestore Timestamp.
 * Útil cuando queremos forzar una fecha específica al escribir
 * (en vez de usar serverTimestamp() que pone "ahora").
 *
 * @example
 *   await updateDocument('orders', orderId, {
 *     paidAt: dateToTimestamp(new Date()),
 *   })
 */
export const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};
