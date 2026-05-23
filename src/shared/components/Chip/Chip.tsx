import { type ReactNode } from 'react';

import { Chip as MuiChip } from '@mui/material';

export type ChipVariant = 'solid' | 'outline' | 'ghost';
export type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type ChipSize = 'small' | 'medium';

export type ChipProps = {
  /** Texto o contenido del chip. */
  label: ReactNode;
  /** Variante visual. Default: 'solid' */
  variant?: ChipVariant;
  /** Color del chip. Default: 'default' */
  color?: ChipColor;
  /** Tamaño. Default: 'medium' */
  size?: ChipSize;
  /** Ícono al inicio. */
  icon?: ReactNode;
  /** Avatar al inicio (foto chiquita). */
  avatar?: ReactNode;
  /** Handler de click. Si está presente, el chip es clickeable. */
  onClick?: () => void;
  /** Handler de delete. Si está presente, aparece la X y se puede eliminar. */
  onDelete?: () => void;
  /** Si está deshabilitado. */
  disabled?: boolean;
  /** Si está seleccionado (útil para filtros multi-select). */
  selected?: boolean;
};

/**
 * Chip del sistema. Se usa principalmente para:
 *  - Filtros activos en el catálogo (con botón de eliminar).
 *  - Tags al editar producto.
 *  - Selecciones múltiples (talles, colores).
 *
 * @example
 *   // Filtro activo con botón de eliminar
 *   <Chip label="Talle: M" onDelete={() => removeFilter('size-m')} />
 *
 *   // Selección de talle (toggleable)
 *   <Chip
 *     label="M"
 *     variant={selectedSize === 'M' ? 'solid' : 'outline'}
 *     onClick={() => setSelectedSize('M')}
 *   />
 *
 *   // Tag de producto
 *   <Chip label="denim" color="secondary" variant="ghost" />
 */
export const Chip = ({
  label,
  variant = 'solid',
  color = 'default',
  size = 'medium',
  icon,
  avatar,
  onClick,
  onDelete,
  disabled = false,
  selected = false,
}: ChipProps) => {
  // Mapeo del color al sistema de MUI
  const muiColor = color === 'default' ? undefined : color;

  // Mapeo de variantes nuestras a las de MUI
  const muiVariant = variant === 'solid' ? 'filled' : 'outlined';

  return (
    <MuiChip
      label={label}
      variant={muiVariant}
      color={muiColor as 'primary' | 'secondary' | 'success' | 'warning' | 'error' | undefined}
      size={size}
      icon={icon as React.ReactElement | undefined}
      avatar={avatar as React.ReactElement | undefined}
      onClick={onClick}
      onDelete={onDelete}
      disabled={disabled}
      sx={{
        borderRadius: 0.5, // 3px - chips son más rectangulares que cards
        fontWeight: 500,
        ...(variant === 'ghost' && {
          backgroundColor: (theme) => {
            const colorKey = color === 'default' ? 'action' : color;
            if (color === 'default') return theme.palette.action.hover;
            return `${theme.palette[colorKey as 'primary'].main}15`;
          },
          color: (theme) => {
            if (color === 'default') return theme.palette.text.primary;
            return theme.palette[color as 'primary'].main;
          },
          border: 'none',
          '&:hover': onClick
            ? {
                backgroundColor: (theme) => {
                  if (color === 'default') return theme.palette.action.selected;
                  return `${theme.palette[color as 'primary'].main}25`;
                },
              }
            : {},
        }),
        ...(selected && {
          ring: 2,
          borderColor: 'primary.main',
          borderWidth: 2,
          borderStyle: 'solid',
        }),
        ...(onClick && {
          cursor: 'pointer',
        }),
        transition: 'all 200ms',
      }}
    />
  );
};
