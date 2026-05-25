import { type ReactNode } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton as MuiIconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export type ModalSize = 'small' | 'medium' | 'large';

export type ModalProps = {
  /** Si está abierto. */
  open: boolean;
  /** Handler de cierre. */
  onClose: () => void;
  /** Título del modal. */
  title?: ReactNode;
  /** Descripción corta debajo del título. */
  description?: ReactNode;
  /** Contenido principal. */
  children?: ReactNode;
  /** Footer con acciones (botones). */
  actions?: ReactNode;
  /** Tamaño máximo del modal. Default: 'small'. */
  size?: ModalSize;
  /** Si tiene botón X para cerrar. Default: true. */
  showCloseButton?: boolean;
  /** Si click en backdrop cierra el modal. Default: true. */
  closeOnBackdropClick?: boolean;
  /** Si ESC cierra el modal. Default: true. */
  closeOnEsc?: boolean;
  /** Ícono opcional al lado del título. */
  icon?: ReactNode;
  /** En mobile, hacer el modal fullscreen. Default: false. */
  fullScreenOnMobile?: boolean;
};

const SIZE_MAP: Record<ModalSize, number> = {
  small: 420,
  medium: 600,
  large: 840,
};

/**
 * Ventana modal centrada con backdrop.
 *
 * Estructura: ícono (opcional) + título + descripción + contenido + acciones (footer).
 *
 * Use cases típicos:
 *  - Confirmar eliminación: "¿Seguro que querés eliminar?".
 *  - Pedir info al usuario: "Guardá tus favoritos" → form de registro.
 *  - Mostrar info contextual: detalles, guía de talles, etc.
 *  - Galerías de imágenes en lightbox.
 *
 * @example
 *   <Modal
 *     open={confirmOpen}
 *     onClose={() => setConfirmOpen(false)}
 *     title="¿Eliminar producto?"
 *     description="Esta acción no se puede deshacer."
 *     icon={<DeleteIcon color="error" />}
 *     actions={
 *       <>
 *         <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
 *         <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
 *       </>
 *     }
 *   />
 */
export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = 'small',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  icon,
  fullScreenOnMobile = false,
}: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (_event: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && !closeOnBackdropClick) return;
    if (reason === 'escapeKeyDown' && !closeOnEsc) return;
    onClose();
  };

  const isFullScreen = fullScreenOnMobile && isMobile;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isFullScreen}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: isFullScreen ? '100%' : '100%',
            maxWidth: isFullScreen ? '100%' : SIZE_MAP[size],
            margin: { xs: 2, sm: 3 },
            borderRadius: isFullScreen ? 0 : 1.5,
            overflow: 'hidden',
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
      {/* Header con título, descripción y botón cerrar */}
      {(title || description || icon || showCloseButton) && (
        <Box
          sx={{
            padding: 3,
            paddingBottom: children || actions ? 2 : 3,
            position: 'relative',
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
            {icon && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'action.hover',
                }}
              >
                {icon}
              </Box>
            )}
            <Stack
              spacing={0.5}
              sx={{ flexGrow: 1, minWidth: 0, paddingRight: showCloseButton ? 4 : 0 }}
            >
              {title && (
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                  {description}
                </Typography>
              )}
            </Stack>
          </Stack>

          {showCloseButton && (
            <MuiIconButton
              size="small"
              onClick={onClose}
              aria-label="Cerrar modal"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
              }}
            >
              <CloseIcon fontSize="small" />
            </MuiIconButton>
          )}
        </Box>
      )}

      {/* Contenido principal */}
      {children && (
        <DialogContent
          sx={{
            padding: 3,
            paddingTop: title || description || icon ? 0 : 3,
            paddingBottom: actions ? 2 : 3,
          }}
        >
          {children}
        </DialogContent>
      )}

      {/* Footer con acciones */}
      {actions && (
        <DialogActions
          sx={{
            padding: 3,
            paddingTop: 1,
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            flexDirection: { xs: 'column', sm: 'row' },
            '& > button': {
              width: { xs: '100%', sm: 'auto' },
            },
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};
