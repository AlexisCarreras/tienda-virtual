import { useLocation, useNavigate } from 'react-router';

import { ArrowBack as ArrowBackIcon, Home as HomeIcon } from '@mui/icons-material';
import { Container, Stack, Typography } from '@mui/material';

import { Button } from '@/shared/components/Button';
import { EmptyState } from '@/shared/components/EmptyState';

/**
 * Página 404 - Ruta no encontrada.
 *
 * Se renderiza dentro del PublicLayout (mantiene header + footer) para que
 * el usuario no se sienta "expulsado" del sitio y pueda navegar a otras
 * secciones. Usa el EmptyState con la ilustración de búsqueda (lupa + hilos).
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <EmptyState
          illustration="search"
          illustrationSize={140}
          title="No encontramos esta página"
          description={
            location.pathname
              ? `La página "${location.pathname}" no existe o fue movida.`
              : 'La página que buscás no existe o fue movida.'
          }
          action={
            <Button size="large" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
              Ir al inicio
            </Button>
          }
          secondaryAction={
            <Button
              variant="ghost"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Volver a la página anterior
            </Button>
          }
        />

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            mt: 4,
            textAlign: 'center',
            maxWidth: 420,
          }}
        >
          Si llegaste acá desde un enlace que parecía correcto, escribinos y nos ayudás a
          corregirlo.
        </Typography>
      </Stack>
    </Container>
  );
};
