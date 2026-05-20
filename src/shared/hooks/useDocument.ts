import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';

import { getDocument } from '@/shared/lib/firestore-helpers';
import { type BaseDocument } from '@/shared/types';

type UseDocumentOptions<T> = Omit<UseQueryOptions<T | null, Error>, 'queryKey' | 'queryFn'>;

/**
 * Hook genérico para leer un documento de Firestore por su id.
 *
 * @param collectionName - Nombre de la colección
 * @param docId - Id del documento (puede ser undefined si todavía no lo conoces;
 *                en ese caso la query no se ejecuta hasta que sea string)
 * @param queryKey - Key de React Query (usar las de queryKeys.ts)
 * @param options - Opciones adicionales de React Query (staleTime, enabled, etc)
 *
 * @example
 *   const { data: product, isLoading } = useDocument<Product>(
 *     'products',
 *     productId,
 *     queryKeys.products.byId(productId),
 *   )
 */
export const useDocument = <T extends BaseDocument>(
  collectionName: string,
  docId: string | undefined,
  queryKey: readonly unknown[],
  options?: UseDocumentOptions<T>,
): UseQueryResult<T | null, Error> => {
  return useQuery<T | null, Error>({
    queryKey,
    queryFn: () => {
      if (!docId) return null;
      return getDocument<T>(collectionName, docId);
    },
    enabled: Boolean(docId),
    ...options,
  });
};
