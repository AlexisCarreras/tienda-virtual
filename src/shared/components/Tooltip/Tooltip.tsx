import { type ReactElement, type ReactNode } from 'react';

import { Box, Tooltip as MuiTooltip } from '@mui/material';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export type TooltipProps = {
  /** Texto o contenido a mostrar en el tooltip. */
  title: ReactNode;
  /** Elemento sobre el cual aparece el tooltip al hover. */
  children: ReactElement;
  /** Posición. Default: 'top' */
  placement?: TooltipPlacement;
  /** Si está deshabilitado (no muestra el tooltip). */
  disabled?: boolean;
  /** Delay antes de mostrar el tooltip en ms. Default: 200 */
  enterDelay?: number;
  /** Delay antes de ocultar el tooltip en ms. Default: 0 */
  leaveDelay?: number;
  /** Si tiene flecha apuntando al elemento. Default: false */
  arrow?: boolean;
  /** Forzar el estado (útil para controlarlo externamente). */
  open?: boolean;
};

/**
 * Info contextual al hover sobre un elemento.
 *
 * Usalo para:
 *  - Explicar qué hace un ícono sin texto (ej: botón de favorito).
 *  - Mostrar texto completo cuando está truncado.
 *  - Dar contexto sin ocupar espacio en la UI.
 *
 * NO lo uses para:
 *  - Información crítica que el usuario necesita ver.
 *  - Acciones (no se puede clickear un tooltip).
 *  - Mobile (no hay hover, mejor usá un texto visible).
 *
 * @example
 *   <Tooltip title="Agregar a favoritos">
 *     <IconButton aria-label="Favoritos">
 *       <FavoriteIcon />
 *     </IconButton>
 *   </Tooltip>
 *
 *   <Tooltip title="Producto destacado" placement="right" arrow>
 *     <StarIcon />
 *   </Tooltip>
 */
export const Tooltip = ({
  title,
  children,
  placement = 'top',
  disabled = false,
  enterDelay = 200,
  leaveDelay = 0,
  arrow = false,
  open,
}: TooltipProps) => {
  // Si está disabled o el title está vacío, no envolvemos en tooltip
  if (disabled || !title) {
    return children;
  }

  return (
    <MuiTooltip
      title={title}
      placement={placement}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      arrow={arrow}
      open={open}
      slotProps={{
        tooltip: {
          sx: {
            fontSize: '0.75rem',
            fontWeight: 400,
            paddingX: 1,
            paddingY: 0.75,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[800],
            color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#FFFFFF'),
          },
        },
        arrow: {
          sx: {
            color: (theme) =>
              theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[800],
          },
        },
      }}
    >
      <Box component="span" sx={{ display: 'inline-flex' }}>
        {children}
      </Box>
    </MuiTooltip>
  );
};
