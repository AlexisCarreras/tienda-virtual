import { type ReactNode } from 'react';

import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { Box, IconButton as MuiIconButton, Stack, Typography } from '@mui/material';

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';
export type AlertVariant = 'subtle' | 'solid' | 'outline';

export type AlertProps = {
  /** Severidad del mensaje. Define color e ícono. */
  severity?: AlertSeverity;
  /** Variante visual. Default: 'subtle' (fondo suave). */
  variant?: AlertVariant;
  /** Título corto y destacado (opcional). */
  title?: ReactNode;
  /** Mensaje principal. */
  children: ReactNode;
  /** Si se puede cerrar (muestra X). */
  closable?: boolean;
  /** Handler cuando se cierra. */
  onClose?: () => void;
  /** Ocultar ícono. Default: false. */
  hideIcon?: boolean;
  /** Acción adicional al final del alert (ej: botón "Ver más"). */
  action?: ReactNode;
};

const SEVERITY_ICONS: Record<AlertSeverity, ReactNode> = {
  success: <CheckCircleIcon fontSize="small" />,
  info: <InfoIcon fontSize="small" />,
  warning: <WarningIcon fontSize="small" />,
  error: <ErrorIcon fontSize="small" />,
};

/**
 * Mensaje contextual inline dentro de una página o formulario.
 *
 * Diferencia con Toast:
 *  - Alert: inline, persistente, ocupa espacio en el layout.
 *  - Toast: flotante, auto-dismiss, no ocupa espacio.
 *
 * @example
 *   // Alert básico
 *   <Alert severity="info">
 *     Estás comprando como invitado.
 *   </Alert>
 *
 *   // Con título y acción
 *   <Alert severity="warning" title="Atención" closable onClose={dismiss}>
 *     Estos cambios no se guardaron todavía.
 *   </Alert>
 *
 *   // Con acción
 *   <Alert
 *     severity="info"
 *     action={<Button size="small">Iniciar sesión</Button>}
 *   >
 *     ¿Tenés cuenta? Iniciá sesión para guardar tus datos.
 *   </Alert>
 */
export const Alert = ({
  severity = 'info',
  variant = 'subtle',
  title,
  children,
  closable = false,
  onClose,
  hideIcon = false,
  action,
}: AlertProps) => {
  return (
    <Box
      role="alert"
      sx={(theme) => {
        const mainColor = theme.palette[severity].main;
        const contrastText = theme.palette[severity].contrastText;

        const styles = {
          subtle: {
            backgroundColor: `${mainColor}15`,
            color: theme.palette.text.primary,
            borderColor: `${mainColor}30`,
            iconColor: mainColor,
          },
          solid: {
            backgroundColor: mainColor,
            color: contrastText,
            borderColor: mainColor,
            iconColor: contrastText,
          },
          outline: {
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            borderColor: mainColor,
            iconColor: mainColor,
          },
        }[variant];

        return {
          padding: 2,
          borderRadius: 1,
          border: 1,
          borderStyle: 'solid',
          backgroundColor: styles.backgroundColor,
          borderColor: styles.borderColor,
          color: styles.color,
          '& .alert-icon': {
            color: styles.iconColor,
          },
        };
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
        {!hideIcon && (
          <Box
            className="alert-icon"
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: title ? '2px' : 0,
              flexShrink: 0,
            }}
          >
            {SEVERITY_ICONS[severity]}
          </Box>
        )}

        <Stack spacing={0.5} sx={{ flexGrow: 1, minWidth: 0 }}>
          {title && (
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
              {title}
            </Typography>
          )}
          <Typography variant="body2" component="div" sx={{ lineHeight: 1.5 }}>
            {children}
          </Typography>
          {action && <Box sx={{ marginTop: 1 }}>{action}</Box>}
        </Stack>

        {closable && (
          <MuiIconButton
            size="small"
            onClick={onClose}
            aria-label="Cerrar alerta"
            sx={{
              color: 'inherit',
              opacity: 0.7,
              marginTop: '-4px',
              marginRight: '-4px',
              flexShrink: 0,
              '&:hover': { opacity: 1 },
            }}
          >
            <CloseIcon fontSize="small" />
          </MuiIconButton>
        )}
      </Stack>
    </Box>
  );
};
