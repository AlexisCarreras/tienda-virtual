import { type ReactNode } from 'react';

import { Badge as MuiBadge, type BadgeProps as MuiBadgeProps } from '@mui/material';

export type BadgeColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export type BadgeProps = {
  /** Contenido sobre el cual aparece el badge (un ícono, un avatar). */
  children: ReactNode;
  /** Número o contenido del badge. */
  content?: ReactNode;
  /** Si true, muestra solo un puntito sin contenido. */
  dot?: boolean;
  /** Color del badge. Default: 'primary' */
  color?: BadgeColor;
  /** Cuando ocultar el badge (ej: cuando content es 0). */
  invisible?: boolean;
  /** Máximo antes de mostrar "99+". Default: 99 */
  max?: number;
  /** Posición. Default: 'top-right' */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};

/**
 * Badge: indicador chiquito que aparece sobre otro elemento.
 *
 * Casos típicos:
 *  - Contador del carrito sobre el ícono.
 *  - Notificaciones del admin sobre la campanita.
 *  - Indicador de "nuevo" sobre un avatar.
 *
 * Diferencia con Tag/Chip:
 *  - Badge SIEMPRE acompaña a otro elemento (ícono, avatar). Va "encima".
 *  - Tag/Chip son independientes.
 *
 * @example
 *   // Contador del carrito
 *   <Badge content={cartItemsCount} color="primary">
 *     <IconButton aria-label="Carrito">
 *       <ShoppingCartIcon />
 *     </IconButton>
 *   </Badge>
 *
 *   // Puntito de notificación
 *   <Badge dot color="error">
 *     <NotificationsIcon />
 *   </Badge>
 *
 *   // Solo se ve cuando hay items
 *   <Badge content={count} invisible={count === 0}>
 *     <IconButton><CartIcon /></IconButton>
 *   </Badge>
 */
export const Badge = ({
  children,
  content,
  dot = false,
  color = 'primary',
  invisible = false,
  max = 99,
  position = 'top-right',
}: BadgeProps) => {
  // Mapeo de posición nuestra a la de MUI
  const anchorOrigin: MuiBadgeProps['anchorOrigin'] = (() => {
    switch (position) {
      case 'top-right':
        return { vertical: 'top', horizontal: 'right' };
      case 'top-left':
        return { vertical: 'top', horizontal: 'left' };
      case 'bottom-right':
        return { vertical: 'bottom', horizontal: 'right' };
      case 'bottom-left':
        return { vertical: 'bottom', horizontal: 'left' };
    }
  })();

  return (
    <MuiBadge
      badgeContent={dot ? undefined : content}
      variant={dot ? 'dot' : 'standard'}
      color={color === 'default' ? 'default' : color}
      invisible={invisible}
      max={max}
      anchorOrigin={anchorOrigin}
      sx={{
        '& .MuiBadge-badge': {
          fontWeight: 600,
          fontSize: '0.7rem',
          minWidth: dot ? 8 : 18,
          height: dot ? 8 : 18,
          padding: dot ? 0 : '0 5px',
        },
      }}
    >
      {children}
    </MuiBadge>
  );
};
