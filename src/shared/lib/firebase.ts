import { type FirebaseApp, initializeApp } from 'firebase/app';
import { type Auth, getAuth } from 'firebase/auth';
import {
  type Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { type FirebaseStorage, getStorage } from 'firebase/storage';

/**
 * Configuración de Firebase.
 * Los valores vienen de las variables de entorno definidas en .env.local
 *
 * NOTA: estos valores NO son secretos. Están expuestos al frontend.
 * La seguridad real está en las Security Rules de Firestore y Storage.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

/**
 * Valida que todas las variables de entorno estén definidas.
 * Si falta alguna, lanza un error claro al arrancar la app
 */
const validateConfig = (): void => {
  const missingKeys = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    throw new Error(
      `Firebase config incompleto. Faltan estas variables en .env.local: ${missingKeys.join(', ')}`,
    );
  }
};

validateConfig();

/**
 * Instancia principal de Firebase.
 * Inicializa toda la app con la configuración del proyecto.
 */
export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

/**
 * Servicio de autenticación.
 * Permite login con Google, email/password, registro, recuperar clave, etc.
 */
export const auth: Auth = getAuth(firebaseApp);

/**
 * Base de datos Firestore con persistencia offline habilitada.
 * Los datos se cachean localmente para que la app funcione sin conexión
 * y para mejorar la velocidad de cargas repetidas.
 *
 * `persistentMultipleTabManager` permite que la persistencia funcione
 * correctamente cuando el usuario abre varias pestañas del sitio.
 */
export const db: Firestore = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

/**
 * Storage para imágenes (productos, hero, logo, etc).
 */
export const storage: FirebaseStorage = getStorage(firebaseApp);
