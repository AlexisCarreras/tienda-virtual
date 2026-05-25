import { useState } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { Box, IconButton as MuiIconButton, Popper, Stack, Typography } from '@mui/material';

import { Button } from '@/shared/components/Button';

export type CoachmarkPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export type CoachmarkProps = {
  /** Si se muestra (controlado). */
  open: boolean;
  /** Elemento DOM al que apunta. */
  anchorEl: HTMLElement | null;
  /** Handler cuando se cierra (por X o por "Entendido"). */
  onClose: () => void;
  /** Título corto y destacado. */
  title: string;
  /** Mensaje principal. */
  description: string;
  /** Texto del botón principal. Default: "Entendido". */
  actionLabel?: string;
  /** Handler del botón principal. Si no se pasa, solo cierra. */
  onAction?: () => void;
  /** Texto del botón secundario opcional (ej: "Recordarme después"). */
  secondaryActionLabel?: string;
  /** Handler del botón secundario. */
  onSecondaryAction?: () => void;
  /** Dónde aparece relativo al anchorEl. Default: 'bottom'. */
  placement?: CoachmarkPlacement;
  /** Si tiene flecha apuntando al elemento. Default: true. */
  showArrow?: boolean;
  /** Clave única para persistir si ya se mostró (en localStorage). Si se pasa, el coachmark solo se ve una vez por navegador. */
  persistKey?: string;
};

/**
 * Burbuja con flecha que destaca una feature nueva o explica un elemento de la UI.
 *
 * Se ancla a un elemento del DOM (anchorEl) y aparece al lado.
 * Si pasás `persistKey`, se guarda en localStorage que ya se mostró y no
 * vuelve a aparecer en ese navegador.
 *
 * Casos típicos:
 *  - Resaltar una feature nueva: "¡Ahora podés guardar favoritos!".
 *  - Explicar un cambio en el admin: "Movimos esto acá para que lo encuentres más rápido".
 *  - Onboarding paso a paso (combinable con un tour).
 *
 * @example
 *   const ref = useRef<HTMLButtonElement>(null)
 *   const [open, setOpen] = useState(true)
 *
 *   <>
 *     <Button ref={ref}>Favoritos</Button>
 *     <Coachmark
 *       open={open}
 *       anchorEl={ref.current}
 *       onClose={() => setOpen(false)}
 *       title="¡Nuevo!"
 *       description="Ahora podés guardar productos como favoritos."
 *       persistKey="favorites-coachmark-v1"
 *     />
 *   </>
 */
export const Coachmark = ({
  open,
  anchorEl,
  onClose,
  title,
  description,
  actionLabel = 'Entendido',
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  placement = 'bottom',
  showArrow = true,
  persistKey,
}: CoachmarkProps) => {
  const [alreadyShown] = useState(() => {
    if (!persistKey) return false;
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(`coachmark_${persistKey}`) === 'true';
  });

  const handleClose = () => {
    if (persistKey) {
      localStorage.setItem(`coachmark_${persistKey}`, 'true');
    }
    onClose();
  };

  const handleAction = () => {
    onAction?.();
    handleClose();
  };

  // No mostrar si ya se vio antes
  if (alreadyShown) return null;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      modifiers={[
        { name: 'offset', options: { offset: [0, 12] } },
        { name: 'flip', enabled: true },
        { name: 'preventOverflow', enabled: true },
      ]}
      sx={{
        zIndex: (theme) => theme.zIndex.tooltip,
      }}
    >
      <Box
        sx={(theme) => ({
          position: 'relative',
          maxWidth: 320,
          minWidth: 260,
          padding: 2,
          borderRadius: 1.5,
          backgroundColor: theme.palette.background.paper,
          border: 1,
          borderColor: 'divider',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 4px 12px rgba(0, 0, 0, 0.4), 0 16px 32px rgba(0, 0, 0, 0.3)'
              : '0 4px 12px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.08)',
          borderTop: 3,
          borderTopColor: 'primary.main',
        })}
      >
        {/* Flecha apuntando al elemento */}
        {showArrow && (
          <Box
            sx={(theme) => {
              const arrowSize = 8;
              const baseStyle = {
                position: 'absolute' as const,
                width: 0,
                height: 0,
                borderStyle: 'solid',
              };
              if (placement.startsWith('bottom')) {
                return {
                  ...baseStyle,
                  top: -arrowSize,
                  left:
                    placement === 'bottom-start' ? 16 : placement === 'bottom-end' ? 'auto' : '50%',
                  right: placement === 'bottom-end' ? 16 : 'auto',
                  transform: placement === 'bottom' ? 'translateX(-50%)' : 'none',
                  borderWidth: `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
                  borderColor: `transparent transparent ${theme.palette.primary.main} transparent`,
                };
              }
              if (placement.startsWith('top')) {
                return {
                  ...baseStyle,
                  bottom: -arrowSize,
                  left: placement === 'top-start' ? 16 : placement === 'top-end' ? 'auto' : '50%',
                  right: placement === 'top-end' ? 16 : 'auto',
                  transform: placement === 'top' ? 'translateX(-50%)' : 'none',
                  borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
                  borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
                };
              }
              if (placement === 'left') {
                return {
                  ...baseStyle,
                  right: -arrowSize,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`,
                  borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
                };
              }
              // right
              return {
                ...baseStyle,
                left: -arrowSize,
                top: '50%',
                transform: 'translateY(-50%)',
                borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`,
                borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
              };
            }}
          />
        )}

        {/* Botón cerrar */}
        <MuiIconButton
          size="small"
          onClick={handleClose}
          aria-label="Cerrar"
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            color: 'text.secondary',
            opacity: 0.6,
            '&:hover': { opacity: 1, backgroundColor: 'transparent' },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </MuiIconButton>

        {/* Contenido */}
        <Stack spacing={0.5} sx={{ paddingRight: 3 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
            }}
          >
            Nuevo
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.5,
              marginTop: '4px !important',
            }}
          >
            {description}
          </Typography>
        </Stack>

        {/* Acciones */}
        <Stack direction="row" spacing={1} sx={{ marginTop: 2, justifyContent: 'flex-end' }}>
          {secondaryActionLabel && (
            <Button
              size="small"
              variant="ghost"
              onClick={() => {
                onSecondaryAction?.();
                handleClose();
              }}
            >
              {secondaryActionLabel}
            </Button>
          )}
          <Button size="small" onClick={handleAction}>
            {actionLabel}
          </Button>
        </Stack>
      </Box>
    </Popper>
  );
};
