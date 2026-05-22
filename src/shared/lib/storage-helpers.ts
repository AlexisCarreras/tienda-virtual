import {
  deleteObject,
  type FullMetadata,
  getDownloadURL,
  getMetadata,
  ref,
  type StorageReference,
  uploadBytes,
  type UploadResult,
} from 'firebase/storage';

import { storage } from '@/shared/lib/firebase';

/**
 * Tipos de archivo permitidos. Por ahora solo imágenes.
 * Si en el futuro necesitamos subir PDFs (facturas, etc), agregamos acá.
 */
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const;

/**
 * Tamaño máximo por archivo: 5MB.
 * Coincide con la regla de seguridad que definimos en Firebase Storage.
 */
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Genera un nombre de archivo único para evitar colisiones.
 * Combina timestamp + random + extensión original.
 *
 * @example
 *   generateUniqueFileName('foto.jpg') -> '1716057600000-a3f9k2-foto.jpg'
 */
const generateUniqueFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  // Sanitizamos el nombre original: solo letras, números, guiones y puntos.
  const cleanName = originalName.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
  return `${timestamp}-${random}-${cleanName}`;
};

/**
 * Valida que el archivo cumpla los requisitos antes de subir.
 * Lanza error con mensaje claro si algo está mal.
 */
const validateFile = (file: File): void => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    throw new Error(
      `Tipo de archivo no permitido: ${file.type}. Permitidos: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
    throw new Error(`El archivo pesa ${sizeMB}MB. Máximo permitido: 5MB.`);
  }
};

/**
 * Sube un archivo a Storage.
 *
 * @param file - El File del input (window.File)
 * @param folder - Carpeta destino. Ej: 'products/abc123', 'site'
 * @returns URL pública del archivo subido y la ruta interna (para borrarlo después).
 *
 * @example
 *   const { url, path } = await uploadFile(file, `products/${productId}`)
 *   // url:  "https://firebasestorage.googleapis.com/..."
 *   // path: "products/abc123/1716057600000-x9k2-foto.jpg"
 *
 *   // Guardas `url` en Firestore (en product.images) y `path` también
 *   // por si después necesitas borrar la imagen.
 */
export const uploadFile = async (
  file: File,
  folder: string,
): Promise<{ url: string; path: string }> => {
  validateFile(file);

  const fileName = generateUniqueFileName(file.name);
  const path = `${folder}/${fileName}`;
  const storageRef = ref(storage, path);

  const result: UploadResult = await uploadBytes(storageRef, file, {
    contentType: file.type,
    customMetadata: {
      originalName: file.name,
      uploadedAt: new Date().toISOString(),
    },
  });

  const url = await getDownloadURL(result.ref);

  return { url, path };
};

/**
 * Sube múltiples archivos en paralelo. Más rápido que uno por uno.
 *
 * @example
 *   const results = await uploadFiles(files, `products/${productId}`)
 *   const urls = results.map((r) => r.url)
 *   const paths = results.map((r) => r.path)
 */
export const uploadFiles = async (
  files: File[],
  folder: string,
): Promise<Array<{ url: string; path: string }>> => {
  const uploadPromises = files.map((file) => uploadFile(file, folder));
  return Promise.all(uploadPromises);
};

/**
 * Borra un archivo de Storage usando su path interno.
 *
 * @example
 *   await deleteFile('products/abc123/1716057600000-x9k2-foto.jpg')
 */
export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

/**
 * Borra múltiples archivos en paralelo.
 *
 * @example
 *   await deleteFiles(['products/abc/img1.jpg', 'products/abc/img2.jpg'])
 */
export const deleteFiles = async (paths: string[]): Promise<void> => {
  const deletePromises = paths.map((path) => deleteFile(path));
  await Promise.all(deletePromises);
};

/**
 * Obtiene la URL pública de un archivo a partir de su path interno.
 * Útil cuando guardaste solo el path en Firestore (más liviano) y necesitas la URL completa para mostrar.
 *
 * @example
 *   const url = await getFileUrl('products/abc/img1.jpg')
 *   <img src={url} />
 */
export const getFileUrl = async (path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
};

/**
 * Obtiene metadata de un archivo (tamaño, tipo, fecha de subida, etc).
 * Útil en el admin para mostrar info de los archivos subidos.
 *
 * @example
 *   const meta = await getFileMetadata('products/abc/img1.jpg')
 *   console.log(meta.size, meta.contentType, meta.timeCreated)
 */
export const getFileMetadata = async (path: string): Promise<FullMetadata> => {
  const storageRef = ref(storage, path);
  return getMetadata(storageRef);
};

/**
 * Obtiene una referencia tipada a un path de Storage.
 * Exportada por si en algún caso especial necesitas la ref directa
 * (ej: para upload con tracking de progreso usando uploadBytesResumable).
 */
export const getStorageRef = (path: string): StorageReference => {
  return ref(storage, path);
};
