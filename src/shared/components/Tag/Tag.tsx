import { type ReactNode } from 'react';

import { Box, type Theme, Typography } from '@mui/material';

export type TagColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type TagSize = 'small' | 'medium';

export type TagProps = {
  /** Texto o contenido del tag. */
  label: ReactNode;
  /** Color del tag. Default: 'default' (gris neutro). */
  color?: TagColor;
  /** Tamaño. Default: 'small'. */
  size?: TagSize;
  /** Ícono opcional al inicio. */
  icon?: ReactNode;
  /** Variante visual. Default: 'subtle' (fondo suave). */
  variant?: 'subtle' | 'solid' | 'outline';
};

/**
 * Tag estático (no interactivo) para mostrar estados, categorías o indicadores.
 *
 * Diferencia con Chip:
 *  - Tag: decorativo, informativo, no clickeable.
 *  - Chip: interactivo, para filtros o selecciones.
 *
 * @example
 *   // Estado de orden
 *   <Tag label="En preparación" color="info" />
 *   <Tag label="Entregado" color="success" />
 *
 *   // Indicador en producto
 *   <Tag label="Últimas unidades" color="warning" size="small" />
 *
 *   // Categoría
 *   <Tag label="Nuevo" color="primary" variant="solid" />
 */
export const Tag = ({
  label,
  color = 'default',
  size = 'small',
  icon,
  variant = 'subtle',
}: TagProps) => {
  const getColorStyles = (theme: Theme) => {
    if (color === 'default') {
      return {
        subtle: {
          backgroundColor: theme.palette.action.hover,
          color: theme.palette.text.primary,
          borderColor: 'transparent',
        },
        solid: {
          backgroundColor: theme.palette.grey[700],
          color: '#FFFFFF',
          borderColor: 'transparent',
        },
        outline: {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          borderColor: theme.palette.grey[400],
        },
      };
    }

    const palette = theme.palette[color];
    const mainColor = palette.main;
    const contrastText = palette.contrastText;

    return {
      subtle: {
        backgroundColor: `${mainColor}15`,
        color: mainColor,
        borderColor: 'transparent',
      },
      solid: {
        backgroundColor: mainColor,
        color: contrastText,
        borderColor: 'transparent',
      },
      outline: {
        backgroundColor: 'transparent',
        color: mainColor,
        borderColor: mainColor,
      },
    };
  };

  const fontSize = size === 'small' ? '0.7rem' : '0.8125rem';
  const padding = size === 'small' ? '2px 8px' : '4px 12px';

  return (
    <Box
      component="span"
      sx={(theme) => {
        const styles = getColorStyles(theme)[variant];
        return {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          padding,
          borderRadius: 0.5,
          border: 1,
          borderStyle: 'solid',
          fontFamily: theme.typography.fontFamily,
          fontSize,
          fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
          ...styles,
        };
      }}
    >
      {icon && (
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', fontSize }}>
          {icon}
        </Box>
      )}
      <Typography
        component="span"
        sx={{
          fontSize: 'inherit',
          fontWeight: 'inherit',
          color: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
