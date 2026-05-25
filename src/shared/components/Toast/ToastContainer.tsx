import { useEffect, useState } from 'react';

import { Box, Stack } from '@mui/material';

import { ToastItemView } from './ToastItem';
import { type ToastItem, toastStore } from './toastStore';

/**
 * Contenedor que muestra todos los toasts activos en la esquina inferior derecha.
 *
 * Se monta una sola vez en la raíz de la app (dentro del Provider) y
 * escucha cambios en el toastStore para actualizar su lista.
 *
 * En mobile aparece centrado abajo; en desktop, en la esquina inferior derecha.
 */
export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastItem[]>(toastStore.getToasts());

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: (theme) => theme.zIndex.snackbar,
        pointerEvents: 'none',
        bottom: { xs: 16, sm: 24 },
        right: { xs: 16, sm: 24 },
        left: { xs: 16, sm: 'auto' },
        maxWidth: { xs: 'none', sm: 400 },
      }}
    >
      <Stack spacing={1} sx={{ '& > *': { pointerEvents: 'auto' } }}>
        {toasts.map((t) => (
          <ToastItemView key={t.id} toast={t} />
        ))}
      </Stack>
    </Box>
  );
};
