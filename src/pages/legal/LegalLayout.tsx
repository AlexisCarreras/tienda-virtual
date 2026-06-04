import { type ReactNode } from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';

import { Breadcrumb } from '@/shared/components/Breadcrumb';
import { Divider } from '@/shared/components/Divider';

export type LegalLayoutProps = {
  /** Título grande de la página. */
  title: string;
  /** Bajada corta (opcional) debajo del título. */
  subtitle?: string;
  /** Última fecha de actualización del texto. Formato libre, ej: "Mayo 2026". */
  lastUpdated?: string;
  /** Contenido principal (las secciones del documento legal). */
  children: ReactNode;
};

/**
 * Layout reutilizable para las páginas legales.
 *
 * Provee:
 *  - Container con ancho legible (~720px) para que la lectura sea cómoda.
 *  - Breadcrumb arriba: Inicio > [Título].
 *  - Header con título, bajada y última actualización.
 *  - Tipografía optimizada para texto largo (line-height generoso, párrafos espaciados).
 *
 * Las páginas legales solo tienen que pasar `children` con las secciones.
 *
 * @example
 *   <LegalLayout title="Términos y condiciones" lastUpdated="Mayo 2026">
 *     <LegalSection title="1. Aceptación de los términos">
 *       <p>Texto del párrafo...</p>
 *     </LegalSection>
 *   </LegalLayout>
 */
export const LegalLayout = ({ title, subtitle, lastUpdated, children }: LegalLayoutProps) => {
  return (
    <Container maxWidth="md" sx={{ maxWidth: '760px !important' }}>
      <Stack spacing={4}>
        <Breadcrumb
          items={[
            {
              label: 'Inicio',
              href: '/',
              isHome: true,
            },
            { label: title },
          ]}
        />

        <Stack spacing={1.5}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 400,
              lineHeight: 1.2,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </Typography>
          )}
          {lastUpdated && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic',
                mt: 0.5,
              }}
            >
              Última actualización: {lastUpdated}
            </Typography>
          )}
        </Stack>

        <Divider spacing="none" />

        <Box
          sx={{
            '& p': {
              fontSize: '0.9375rem',
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 2,
              mt: 0,
            },
            '& strong': {
              fontWeight: 600,
            },
            '& a': {
              color: 'primary.main',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': { textDecoration: 'none' },
            },
            '& ul, & ol': {
              fontSize: '0.9375rem',
              lineHeight: 1.8,
              color: 'text.primary',
              paddingLeft: '1.5rem',
              mb: 2,
            },
            '& li': {
              mb: 0.5,
            },
          }}
        >
          {children}
        </Box>
      </Stack>
    </Container>
  );
};

/**
 * Sección numerada del documento legal.
 * Cada sección tiene un título y contenido.
 */
export type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export const LegalSection = ({ title, children }: LegalSectionProps) => (
  <Stack spacing={1.5} sx={{ mb: 4 }}>
    <Typography
      variant="h5"
      component="h2"
      sx={{
        fontWeight: 500,
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        lineHeight: 1.3,
      }}
    >
      {title}
    </Typography>
    <Box>{children}</Box>
  </Stack>
);
