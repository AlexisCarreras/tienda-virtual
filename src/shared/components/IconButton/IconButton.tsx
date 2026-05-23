import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import {
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps,
} from '@mui/material';

export type IconButtonVariant = 'default' | 'primary' | 'danger';
export type IconButtonSize = 'small' | 'medium' | 'large';

export type IconButtonProps = {
  /** Variante visual. Default: 'default' (color neutro). */
  variant?: IconButtonVariant;
  /** Tamaño. Default: 'medium'. */
  size?: IconButtonSize;
  /** Si está deshabilitado. */
  disabled?: boolean;
  /** El ícono (un componente de @mui/icons-material o un SVG). */
  children: ReactNode;
  /** Handler de click. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Obligatorio para accesibilidad: describe qué hace el botón. */
  'aria-label': string;
  /** Tipo HTML. Default: 'button'. */
  type?: 'button' | 'submit' | 'reset';
};

// Tamaños del contenedor (área clickeable) y del ícono según size.
const SIZE_MAP: Record<IconButtonSize, { container: number; icon: number }> = {
  small: { container: 32, icon: 18 },
  medium: { container: 40, icon: 22 },
  large: { container: 48, icon: 28 },
};

/**
 * Botón que contiene solo un ícono (sin texto visible).
 *
 * Es OBLIGATORIO pasar `aria-label` por accesibilidad: usuarios con
 * lectores de pantalla necesitan saber qué hace este botón.
 *
 * @example
 *   <IconButton aria-label="Cerrar modal" onClick={closeModal}>
 *     <CloseIcon />
 *   </IconButton>
 *
 *   <IconButton variant="primary" aria-label="Agregar a favoritos">
 *     <FavoriteIcon />
 *   </IconButton>
 */
export const IconButton = ({
  variant = 'default',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  'aria-label': ariaLabel,
  type = 'button',
}: IconButtonProps) => {
  const muiColor: MuiIconButtonProps['color'] = (() => {
    if (variant === 'primary') return 'primary';
    if (variant === 'danger') return 'error';
    return 'default';
  })();

  const { container, icon } = SIZE_MAP[size];

  // Clonamos el ícono inyectándole el tamaño correcto.
  // Esto hace que el ícono crezca con el tamaño del botón (sin esto, MUI
  // solo cambia el padding y los íconos quedan visualmente iguales).
  const sizedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<{ sx?: object; fontSize?: string }>, {
        sx: { fontSize: icon, ...((child.props as { sx?: object })?.sx ?? {}) },
      });
    }
    return child;
  });

  return (
    <MuiIconButton
      color={muiColor}
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      sx={{
        width: container,
        height: container,
        transition: 'all 200ms',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      {sizedChildren}
    </MuiIconButton>
  );
};
