import { type ReactNode } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { EmptyAdmin, EmptyCart, EmptyCatalog, EmptyFavorites, EmptySearch } from './illustrations';

export type EmptyStateIllustration =
  | 'catalog'
  | 'cart'
  | 'favorites'
  | 'search'
  | 'admin'
  | 'custom';

export type EmptyStateProps = {
  /** Ilustración predefinida o 'custom' para usar tu propio SVG. */
  illustration?: EmptyStateIllustration;
  /** SVG custom (solo cuando illustration='custom'). */
  customIllustration?: ReactNode;
  /** Título principal. */
  title: string;
  /** Descripción debajo del título. */
  description?: string;
  /** Acción primaria (botón o link). */
  action?: ReactNode;
  /** Acción secundaria, va debajo de la primaria. */
  secondaryAction?: ReactNode;
  /** Tamaño de la ilustración en px. Default: 120. */
  illustrationSize?: number;
  /** Compacto: menos padding, ilustración más chica. Útil dentro de cards o drawers. */
  compact?: boolean;
};

const ILLUSTRATIONS_MAP: Record<
  Exclude<EmptyStateIllustration, 'custom'>,
  ({ size }: { size?: number }) => React.ReactElement
> = {
  catalog: EmptyCatalog,
  cart: EmptyCart,
  favorites: EmptyFavorites,
  search: EmptySearch,
  admin: EmptyAdmin,
};

/**
 * Estado vacío con ilustración temática + mensaje + CTA.
 *
 * Se muestra cuando una sección no tiene datos: catálogo vacío, carrito sin
 * items, sin favoritos guardados, sin resultados con filtros, listados del
 * admin sin entradas.
 *
 * Las ilustraciones siguen la estética artesanal de la marca: hilos, costuras,
 * agujas, en color primary (terracota).
 *
 * @example
 *   // Catálogo vacío
 *   <EmptyState
 *     illustration="catalog"
 *     title="Pronto encontrarás productos acá"
 *     description="Estamos preparando piezas únicas. Volvé en unos días."
 *     action={<Button>Volver al inicio</Button>}
 *   />
 *
 *   // Sin resultados con filtros
 *   <EmptyState
 *     illustration="search"
 *     title="No encontramos productos con esos filtros"
 *     description="Probá ajustando o limpiando los filtros para ver más resultados."
 *     action={<Button>Limpiar filtros</Button>}
 *   />
 */
export const EmptyState = ({
  illustration = 'catalog',
  customIllustration,
  title,
  description,
  action,
  secondaryAction,
  illustrationSize,
  compact = false,
}: EmptyStateProps) => {
  const finalSize = illustrationSize ?? (compact ? 80 : 120);
  const padding = compact ? 3 : 6;

  const renderIllustration = () => {
    if (illustration === 'custom') return customIllustration;
    const Component = ILLUSTRATIONS_MAP[illustration];
    return <Component size={finalSize} />;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding,
        width: '100%',
      }}
    >
      <Stack spacing={compact ? 2 : 3} sx={{ alignItems: 'center', maxWidth: 400 }}>
        {/* Ilustración */}
        <Box
          sx={{
            opacity: 0.85,
            transition: 'opacity 300ms',
          }}
        >
          {renderIllustration()}
        </Box>

        {/* Texto */}
        <Stack spacing={0.75} sx={{ alignItems: 'center' }}>
          <Typography
            variant={compact ? 'body1' : 'h5'}
            sx={{
              fontWeight: 500,
              fontFamily: 'inherit',
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              {description}
            </Typography>
          )}
        </Stack>

        {/* Acciones */}
        {(action || secondaryAction) && (
          <Stack spacing={1} sx={{ alignItems: 'center', marginTop: 1 }}>
            {action}
            {secondaryAction}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
