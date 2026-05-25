import { type ReactNode } from 'react';

import {
  CircularProgress,
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from '@mui/material';

/**
 * Variantes visuales del botón.
 *
 * - `primary`: el más usado, terracota sólido. Para acciones principales (Agregar al carrito, Comprar, etc).
 * - `secondary`: outline terracota. Para acciones secundarias o alternativas.
 * - `ghost`: sin fondo ni borde, solo texto. Para acciones de menor jerarquía (links de acción).
 * - `danger`: rojo, para acciones destructivas (Eliminar, Cancelar pedido).
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/**
 * Tamaños disponibles del botón.
 *
 * - `small`: para usos compactos (acciones secundarias, chips de acción).
 * - `medium`: tamaño default, el más usado.
 * - `large`: para CTAs principales (hero, checkout, etc).
 */
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
  /** Variante visual del botón. Default: 'primary' */
  variant?: ButtonVariant;
  /** Tamaño del botón. Default: 'medium' */
  size?: ButtonSize;
  /** Si el botón está cargando, muestra spinner y se deshabilita. */
  loading?: boolean;
  /** Si el botón ocupa todo el ancho disponible. */
  fullWidth?: boolean;
  /** Si el botón está deshabilitado. */
  disabled?: boolean;
  /** Ícono opcional a la izquierda del texto. */
  startIcon?: ReactNode;
  /** Ícono opcional a la derecha del texto. */
  endIcon?: ReactNode;
  /** Contenido del botón (texto generalmente). */
  children: ReactNode;
  /** Handler de click. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Tipo HTML del botón. Default: 'button' */
  type?: 'button' | 'submit' | 'reset';
  /** Para tests y a11y. */
  'aria-label'?: string;
};

/**
 * Botón principal del sistema.
 *
 * Reemplaza al `<button>` HTML nativo y al `<Button>` de MUI directo en TODA la app.
 * Esto garantiza consistencia visual y permite cambiar la implementación interna
 * sin tocar las features.
 *
 * @example
 *   <Button variant="primary" onClick={handleClick}>
 *     Agregar al carrito
 *   </Button>
 *
 *   <Button variant="secondary" size="small" loading>
 *     Guardando...
 *   </Button>
 *
 *   <Button variant="danger" startIcon={<DeleteIcon />}>
 *     Eliminar producto
 *   </Button>
 */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  children,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) => {
  // Mapeo de nuestras variantes a las de MUI
  const muiVariant: MuiButtonProps['variant'] = (() => {
    if (variant === 'primary' || variant === 'danger') return 'contained';
    if (variant === 'secondary') return 'outlined';
    return 'text'; // ghost
  })();

  // Mapeo de colores
  const muiColor: MuiButtonProps['color'] = variant === 'danger' ? 'error' : 'primary';

  // Mapeo de tamaños
  const muiSize: MuiButtonProps['size'] = size === 'medium' ? 'medium' : size;

  return (
    <MuiButton
      variant={muiVariant}
      color={muiColor}
      size={muiSize}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
      sx={{
        // Anulamos comportamiento por defecto de MUI que no queremos
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: 0,
        boxShadow: 'none',
        borderRadius: 1,
        // Sin scale en hover (regla del design system)
        '&:hover': {
          boxShadow: 'none',
        },
        // Active feedback sutil (sin scale, solo ligero darken)
        '&:active': {
          transform: 'translateY(0)',
        },
        // Estilos específicos por variante que MUI no cubre bien
        ...(variant === 'ghost' && {
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'action.hover',
            boxShadow: 'none',
          },
        }),
      }}
    >
      {loading ? (
        <>
          <CircularProgress
            size={size === 'small' ? 14 : size === 'large' ? 20 : 16}
            sx={{
              color: 'inherit',
              marginRight: 1,
            }}
          />
          {children}
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
};
