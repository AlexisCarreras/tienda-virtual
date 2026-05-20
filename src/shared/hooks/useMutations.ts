import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import {
  createDocument,
  createDocumentWithId,
  deleteDocument,
  updateDocument,
} from '@/shared/lib/firestore-helpers';
import { type BaseDocument, type Draft, type UpdatePayload } from '@/shared/types';

/**
 * Hook para crear un documento.
 * Cuando la mutación termina, invalida las queries especificadas
 * para que las vistas que dependen de esa colección se refresquen.
 *
 * @example
 *   const createProduct = useCreateDocument<Product>('products', [queryKeys.products.all])
 *
 *   const handleSubmit = (data: Draft<Product>) => {
 *     createProduct.mutate(data, {
 *       onSuccess: (id) => navigate(`/admin/productos/${id}`),
 *     })
 *   }
 */
export const useCreateDocument = <T extends BaseDocument>(
  collectionName: string,
  invalidateKeys: readonly (readonly unknown[])[] = [],
): UseMutationResult<string, Error, Draft<T>> => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, Draft<T>>({
    mutationFn: (data) => createDocument<T>(collectionName, data),
    onSuccess: () => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });
};

/**
 * Hook para crear un documento con id custom.
 * Útil cuando el id tiene significado (ej: usar uid del usuario como id).
 *
 * @example
 *   const createUserProfile = useCreateDocumentWithId<UserProfile>('users')
 *   await createUserProfile.mutateAsync({ id: user.uid, data: { email, name } })
 */
export const useCreateDocumentWithId = <T extends BaseDocument>(
  collectionName: string,
  invalidateKeys: readonly (readonly unknown[])[] = [],
): UseMutationResult<void, Error, { id: string; data: Draft<T> }> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; data: Draft<T> }>({
    mutationFn: ({ id, data }) => createDocumentWithId<T>(collectionName, id, data),
    onSuccess: () => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });
};

/**
 * Hook para actualizar un documento.
 * Permite updates parciales: solo los campos que cambiaron.
 *
 * @example
 *   const updateProduct = useUpdateDocument<Product>('products', [
 *     queryKeys.products.all,
 *     queryKeys.products.byId(productId),
 *   ])
 *
 *   updateProduct.mutate({ id: productId, data: { price: 30000 } })
 */
export const useUpdateDocument = <T extends BaseDocument>(
  collectionName: string,
  invalidateKeys: readonly (readonly unknown[])[] = [],
): UseMutationResult<void, Error, { id: string; data: UpdatePayload<T> }> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; data: UpdatePayload<T> }>({
    mutationFn: ({ id, data }) => updateDocument<T>(collectionName, id, data),
    onSuccess: () => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });
};

/**
 * Hook para eliminar un documento.
 *
 * @example
 *   const deleteProduct = useDeleteDocument('products', [queryKeys.products.all])
 *   deleteProduct.mutate(productId)
 */
export const useDeleteDocument = (
  collectionName: string,
  invalidateKeys: readonly (readonly unknown[])[] = [],
): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteDocument(collectionName, id),
    onSuccess: () => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });
};
