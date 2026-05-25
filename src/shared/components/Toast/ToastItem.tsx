import { useEffect, useRef } from 'react';

import {
  CheckCircleRounded as CheckCircleIcon,
  Close as CloseIcon,
  ErrorRounded as ErrorIcon,
  InfoRounded as InfoIcon,
  WarningRounded as WarningIcon,
} from '@mui/icons-material';
import { Box, IconButton, Slide, Stack, Typography } from '@mui/material';

import { type ToastItem as ToastItemType, type ToastSeverity, toastStore } from './toastStore';

const SEVERITY_ICONS: Record<ToastSeverity, React.ReactNode> = {
  success: <CheckCircleIcon sx={{ fontSize: 18 }} />,
  info: <InfoIcon sx={{ fontSize: 18 }} />,
  warning: <WarningIcon sx={{ fontSize: 18 }} />,
  error: <ErrorIcon sx={{ fontSize: 18 }} />,
};

type ToastItemViewProps = {
  toast: ToastItemType;
};

export const ToastItemView = ({ toast }: ToastItemViewProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (toast.duration > 0) {
      timerRef.current = setTimeout(() => {
        toastStore.remove(toast.id);
      }, toast.duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, toast.duration]);

  const handleClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    toastStore.remove(toast.id);
  };

  return (
    <Slide in direction="left" mountOnEnter unmountOnExit>
      <Box
        role="status"
        aria-live="polite"
        sx={(theme) => ({
          minWidth: 320,
          maxWidth: 400,
          padding: '14px 16px',
          borderRadius: 1.5,
          backgroundColor: theme.palette.background.paper,
          border: 1,
          borderColor:
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 4px 12px rgba(0, 0, 0, 0.4), 0 16px 32px rgba(0, 0, 0, 0.3)'
              : '0 4px 12px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.08)',
        })}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              color: theme.palette[toast.severity].main,
              paddingTop: toast.title ? '2px' : '1px',
              flexShrink: 0,
            })}
          >
            {SEVERITY_ICONS[toast.severity]}
          </Box>

          <Stack spacing={0.25} sx={{ flexGrow: 1, minWidth: 0 }}>
            {toast.title && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.4,
                  letterSpacing: '-0.005em',
                }}
              >
                {toast.title}
              </Typography>
            )}
            <Typography
              variant="body2"
              component="div"
              sx={{
                lineHeight: 1.5,
                color: toast.title ? 'text.secondary' : 'text.primary',
                fontSize: '0.875rem',
              }}
            >
              {toast.message}
            </Typography>
            {toast.action && <Box sx={{ marginTop: 1 }}>{toast.action}</Box>}
          </Stack>

          <IconButton
            size="small"
            onClick={handleClose}
            aria-label="Cerrar notificación"
            sx={{
              color: 'text.secondary',
              padding: '2px',
              marginTop: '-2px',
              marginRight: '-4px',
              flexShrink: 0,
              opacity: 0.6,
              transition: 'opacity 150ms',
              '&:hover': {
                opacity: 1,
                backgroundColor: 'transparent',
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>
      </Box>
    </Slide>
  );
};
