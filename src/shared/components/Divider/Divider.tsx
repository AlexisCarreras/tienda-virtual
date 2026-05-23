import { type ReactNode } from 'react';

import { Divider as MuiDivider } from '@mui/material';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed';
export type DividerSpacing = 'none' | 'small' | 'medium' | 'large';

export type DividerProps = {
  /** Orientación. Default: 'horizontal' */
  orientation?: DividerOrientation;
  /** Variante de la línea. Default: 'solid' */
  variant?: DividerVariant;
  /** Espaciado vertical (para horizontal) u horizontal (para vertical). Default: 'medium' */
  spacing?: DividerSpacing;
  /** Texto opcional en el medio del divider (solo horizontal). */
  children?: ReactNode;
  /** Alineación del texto cuando hay children. Default: 'center' */
  textAlign?: 'left' | 'center' | 'right';
  /** Si tiene flexItem (útil dentro de un Stack para vertical). */
  flexItem?: boolean;
};

/**
 * Línea divisoria horizontal o vertical para separar contenido.
 *
 * @example
 *   // Divider horizontal entre secciones
 *   <Divider />
 *
 *   // Divider con texto en el medio (típico de "o continuá con email")
 *   <Divider>o</Divider>
 *
 *   // Divider vertical entre botones
 *   <Stack direction="row" spacing={2}>
 *     <Button>A</Button>
 *     <Divider orientation="vertical" flexItem />
 *     <Button>B</Button>
 *   </Stack>
 *
 *   // Divider sin espaciado para casos compactos
 *   <Divider spacing="none" />
 */
export const Divider = ({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'medium',
  children,
  textAlign = 'center',
  flexItem = false,
}: DividerProps) => {
  // Mapeo del spacing a valores reales (en spacing units = 8px cada uno)
  const spacingMap: Record<DividerSpacing, number> = {
    none: 0,
    small: 1,
    medium: 2,
    large: 4,
  };

  const spacingValue = spacingMap[spacing];

  return (
    <MuiDivider
      orientation={orientation}
      textAlign={textAlign}
      flexItem={flexItem}
      sx={{
        ...(orientation === 'horizontal' ? { my: spacingValue } : { mx: spacingValue }),
        ...(variant === 'dashed' && {
          borderStyle: 'dashed',
        }),
        '&::before, &::after': {
          borderStyle: variant === 'dashed' ? 'dashed' : 'solid',
        },
      }}
    >
      {children}
    </MuiDivider>
  );
};
