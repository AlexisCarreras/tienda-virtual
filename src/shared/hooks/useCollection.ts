import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';
import { type QueryConstraint } from 'firebase/firestore';

import { getCollection } from '@/shared/lib/firestore-helpers';
import { type BaseDocument } from '@/shared/types';

type UseCollectionOptions<T> = Omit<UseQueryOptions<T[], Error>, 'queryKey' | 'queryFn'>;

/**
 * Hook genérico para leer una colección de Firestore.
 * Acepta constraints opcionales (where, orderBy, limit, etc).
 *
 * @example
 *   // Todos los productos
 *   const { data: products, isLoading } = useCollection<Product>(
 *     'products',
 *     queryKeys.products.all,
 *   )
 *
 *   // Productos activos ordenados por precio
 *   const { data } = useCollection<Product>(
 *     'products',
 *     queryKeys.products.all,
 *     [where('isActive', '==', true), orderBy('price', 'asc')],
 *   )
 */
export const useCollection = <T extends BaseDocument>(
  collectionName: string,
  queryKey: readonly unknown[],
  constraints: QueryConstraint[] = [],
  options?: UseCollectionOptions<T>,
): UseQueryResult<T[], Error> => {
  return useQuery<T[], Error>({
    queryKey,
    queryFn: () => getCollection<T>(collectionName, constraints),
    ...options,
  });
};
