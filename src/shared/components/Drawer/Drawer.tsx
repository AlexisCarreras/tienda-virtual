import { type ReactNode } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import {
  Box,
  Divider as MuiDivider,
  Drawer as MuiDrawer,
  IconButton as MuiIconButton,
  Stack,
  Typography,
} from '@mui/material';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'small' | 'medium' | 'large' | 'full';

export type DrawerProps = {
  /** Si está abierto. */
  open: boolean;
  /** Handler de cierre. */
  onClose: () => void;
  /** Desde qué lado se desliza. Default: 'right'. */
  side?: DrawerSide;
  /** Ancho (para left/right) o alto (para top/bottom). Default: 'medium'. */
  size?: DrawerSize;
  /** Título visible en el header. */
  title?: ReactNode;
  /** Descripción debajo del título. */
  description?: ReactNode;
  /** Contenido scrollable. */
  children?: ReactNode;
  /** Footer fijo abajo (no scrolla con el contenido). */
  footer?: ReactNode;
  /** Si tiene botón X. Default: true. */
  showCloseButton?: boolean;
  /** Ícono opcional al lado del título. */
  icon?: ReactNode;
};

const SIZE_MAP_HORIZONTAL: Record<DrawerSize, number | string> = {
  small: 320,
  medium: 420,
  large: 560,
  full: '100%',
};

const SIZE_MAP_VERTICAL: Record<DrawerSize, number | string> = {
  small: 240,
  medium: 360,
  large: 480,
  full: '100%',
};

/**
 * Panel lateral que se desliza desde un borde de la pantalla.
 *
 * Use cases típicos:
 *  - Drawer del carrito (right): items + total + checkout.
 *  - Drawer de filtros del catálogo (left): checkboxes + slider de precio.
 *  - Menú mobile (left): navegación del sitio.
 *  - Sidebar de detalle (right): info expandida de un item de listado.
 *
 * Diferencia con Modal:
 *  - Modal: centrado, para decisiones puntuales (confirmar, info).
 *  - Drawer: lateral, para flujos largos o tareas que requieren contexto.
 *
 * @example
 *   <Drawer
 *     open={cartOpen}
 *     onClose={closeCart}
 *     side="right"
 *     title="Tu carrito"
 *     description="3 productos"
 *     footer={
 *       <Stack spacing={1}>
 *         <Typography variant="h6">Total: $50.000</Typography>
 *         <Button fullWidth>Iniciar compra</Button>
 *       </Stack>
 *     }
 *   >
 *     {items.map(item => <CartItem key={item.id} {...item} />)}
 *   </Drawer>
 */
export const Drawer = ({
  open,
  onClose,
  side = 'right',
  size = 'medium',
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  icon,
}: DrawerProps) => {
  const isHorizontal = side === 'left' || side === 'right';
  const sizeMap = isHorizontal ? SIZE_MAP_HORIZONTAL : SIZE_MAP_VERTICAL;
  const sizeValue = sizeMap[size];

  return (
    <MuiDrawer
      anchor={side}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: isHorizontal ? sizeValue : '100%',
            maxWidth: isHorizontal ? { xs: '100%', sm: sizeValue } : '100%',
            height: isHorizontal ? '100%' : sizeValue,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
          },
        },
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
          },
        },
      }}
    >
      {/* Header */}
      {(title || description || icon || showCloseButton) && (
        <>
          <Box sx={{ padding: 2.5, flexShrink: 0 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              {icon && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'action.hover',
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </Box>
              )}
              <Stack spacing={0.25} sx={{ flexGrow: 1, minWidth: 0 }}>
                {title && (
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
                    {title}
                  </Typography>
                )}
                {description && (
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    {description}
                  </Typography>
                )}
              </Stack>
              {showCloseButton && (
                <MuiIconButton
                  size="small"
                  onClick={onClose}
                  aria-label="Cerrar"
                  sx={{
                    color: 'text.secondary',
                    flexShrink: 0,
                    '&:hover': { color: 'text.primary' },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </MuiIconButton>
              )}
            </Stack>
          </Box>
          <MuiDivider />
        </>
      )}

      {/* Contenido scrollable */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2.5,
        }}
      >
        {children}
      </Box>

      {/* Footer fijo */}
      {footer && (
        <>
          <MuiDivider />
          <Box sx={{ padding: 2.5, flexShrink: 0, backgroundColor: 'background.paper' }}>
            {footer}
          </Box>
        </>
      )}
    </MuiDrawer>
  );
};
