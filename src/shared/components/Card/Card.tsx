import { type ReactNode } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

export type CardVariant = 'elevated' | 'outlined' | 'flat';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export type CardProps = {
  /** Contenido del card. */
  children: ReactNode;
  /** Variante visual. Default: 'elevated' (con sombra sutil). */
  variant?: CardVariant;
  /** Padding interno. Default: 'medium'. */
  padding?: CardPadding;
  /** Si el card es interactivo (cursor + hover). Útil cuando es clickeable. */
  interactive?: boolean;
  /** Handler de click. Si está presente, el card es clickeable. */
  onClick?: () => void;
  /** Estilos custom adicionales. */
  sx?: SxProps<Theme>;
  /** Componente HTML (default: div). Útil para cambiar a article, section, etc. */
  component?: React.ElementType;
};

/**
 * Contenedor genérico con bordes redondeados, sombra o borde.
 *
 * Es la base sobre la que se construyen ProductCard, cards de sección,
 * cards informativos, etc.
 *
 * @example
 *   // Card básico con sombra sutil
 *   <Card>
 *     <Typography>Contenido</Typography>
 *   </Card>
 *
 *   // Card clickeable (para grilla de elementos)
 *   <Card interactive onClick={() => navigate('/detalle')}>
 *     ...
 *   </Card>
 *
 *   // Card con borde (sin sombra)
 *   <Card variant="outlined" padding="large">
 *     ...
 *   </Card>
 *
 *   // Card sin padding (para que la imagen llene el card)
 *   <Card padding="none">
 *     <img src="..." style={{ width: '100%' }} />
 *     <Box sx={{ p: 2 }}>Texto debajo</Box>
 *   </Card>
 */
export const Card = ({
  children,
  variant = 'elevated',
  padding = 'medium',
  interactive = false,
  onClick,
  sx,
  component = 'div',
}: CardProps) => {
  // Mapeo de padding a valores de spacing (cada unidad = 8px)
  const paddingMap: Record<CardPadding, number> = {
    none: 0,
    small: 2,
    medium: 3,
    large: 4,
  };

  const isClickable = interactive || Boolean(onClick);

  return (
    <Box
      component={component}
      onClick={onClick}
      sx={[
        {
          padding: paddingMap[padding],
          borderRadius: 1, // 6px
          backgroundColor: 'background.paper',
          transition: 'all 200ms',
          // Variante elevated: sombra sutil
          ...(variant === 'elevated' && {
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 1px 3px rgba(0, 0, 0, 0.3)'
                : '0 1px 3px rgba(0, 0, 0, 0.04)',
            border: 1,
            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'divider' : 'transparent'),
          }),
          // Variante outlined: borde sin sombra
          ...(variant === 'outlined' && {
            border: 1,
            borderColor: 'divider',
            boxShadow: 'none',
          }),
          // Variante flat: sin sombra ni borde (solo background)
          ...(variant === 'flat' && {
            border: 0,
            boxShadow: 'none',
          }),
          // Si es clickeable: cursor + hover state
          ...(isClickable && {
            cursor: 'pointer',
            '&:hover': {
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                  : '0 8px 24px rgba(0, 0, 0, 0.08)',
              borderColor: 'divider',
            },
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};
