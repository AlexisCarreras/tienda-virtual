import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

import {
  ErrorOutlined as ErrorOutlineIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { Box, Container, Stack, Typography } from '@mui/material';

import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { Logo } from '@/shared/components/Logo';
import { siteConfig } from '@/shared/config/siteConfig';

/**
 * Página de error general.
 *
 * Se renderiza cuando React Router captura un error no manejado en la app
 * (page que falla en su render, loader que tira excepción, etc.).
 *
 * Decisión: a diferencia de la 404, esta página NO usa el PublicLayout
 * porque queremos mostrarla incluso si el error está en el layout mismo.
 * Por eso renderiza su propio header simple con el logo.
 */
export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const errorInfo = (() => {
    if (isRouteErrorResponse(error)) {
      return {
        status: error.status,
        title: error.status === 404 ? 'Página no encontrada' : `Error ${error.status}`,
        message: error.statusText || 'Ocurrió un problema con esta ruta.',
      };
    }

    if (error instanceof Error) {
      return {
        status: null,
        title: 'Algo no funcionó',
        message: error.message,
      };
    }

    return {
      status: null,
      title: 'Algo no funcionó',
      message: 'Ocurrió un error inesperado.',
    };
  })();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Box
            component="button"
            onClick={() => navigate('/')}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'inline-block',
            }}
          >
            <Logo variant="full" height={36} taglineSize="small" />
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 4, md: 8 },
        }}
      >
        <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center', maxWidth: 520 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'error.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'common.white',
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 40 }} />
          </Box>

          <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
            {errorInfo.status && (
              <Typography
                variant="overline"
                sx={{
                  color: 'text.secondary',
                  letterSpacing: '0.2em',
                  fontSize: '0.75rem',
                }}
              >
                Error {errorInfo.status}
              </Typography>
            )}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 400,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                lineHeight: 1.2,
              }}
            >
              {errorInfo.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.6,
                mt: 1,
              }}
            >
              Estamos trabajando para resolverlo. Probá recargar la página o volver al inicio.
            </Typography>
          </Stack>

          {/* Detalle técnico (solo en desarrollo) */}
          {import.meta.env.DEV && errorInfo.message && (
            <Box sx={{ width: '100%' }}>
              <Alert severity="error" title="Detalle técnico (solo dev)">
                <Typography
                  component="span"
                  sx={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}
                >
                  {errorInfo.message}
                </Typography>
              </Alert>
            </Box>
          )}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <Button size="large" startIcon={<RefreshIcon />} onClick={handleReload} fullWidth>
              Recargar la página
            </Button>
            <Button
              variant="secondary"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              fullWidth
            >
              Ir al inicio
            </Button>
          </Stack>

          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 2, maxWidth: 360 }}>
            Si el problema persiste, escribinos a{' '}
            <Box
              component="a"
              href={`mailto:${siteConfig.contact.email}`}
              sx={{
                color: 'primary.main',
                textDecoration: 'underline',
                '&:hover': { textDecoration: 'none' },
              }}
            >
              {siteConfig.contact.email}
            </Box>{' '}
            y lo solucionamos lo antes posible.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
