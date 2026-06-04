import { useEffect } from 'react';

import { useLocation } from 'react-router';

/**
 * Restaura el scroll al top cuando cambia la ruta.
 *
 * React Router por default NO maneja el scroll entre navegaciones, así que
 * al ir de /producto/algo a /catalogo te quedás en el medio de la página.
 * Este componente arregla eso scrolleando al top en cada cambio de pathname.
 *
 * Se monta una sola vez en el componente raíz de la app.
 *
 * Nota: Si en el futuro queremos preservar el scroll al usar el botón "atrás"
 * del navegador (típico de e-commerce), reemplazamos esto por un sistema más
 * sofisticado que guarda scroll positions en memoria por route key.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};
