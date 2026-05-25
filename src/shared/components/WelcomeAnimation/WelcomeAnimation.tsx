import { useEffect } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { Logo } from '@/shared/components/Logo';

import { type WelcomeAnimationThread } from './generateWelcomeThreads';

export type WelcomeAnimationProps = {
  /** Si se reproduce la animación. */
  open: boolean;
  /** Configuración de los hilos. El padre los genera con `generateWelcomeThreads`. */
  threads: WelcomeAnimationThread[];
  /** Handler cuando termina la animación (cuando el último hilo terminó de caer). */
  onComplete?: () => void;
  /** Texto de bienvenida arriba del nombre. Default: "Bienvenida a". */
  greeting?: string;
  /** Nombre de la marca a mostrar grande. Default: "Dora Galiano". */
  brandName?: string;
  /** Tagline debajo del nombre. Default: "diseño para armar". */
  tagline?: string;
};

/**
 * Animación de inauguración: hilos cayendo desde arriba con un mensaje
 * de bienvenida centrado que se "arma" frente al usuario.
 *
 * Composición:
 *  - Lluvia de hilos terracota y mostaza con vaivén sutil.
 *  - Mensaje central con logo + "Bienvenida a" + nombre + tagline + línea bordada.
 *  - Fade in del mensaje al iniciar, fade out cerca del final.
 *
 * Es no-bloqueante: el usuario puede navegar mientras pasa (pointerEvents: none).
 *
 * @example
 *   const [threads, setThreads] = useState<WelcomeAnimationThread[]>([])
 *   const [open, setOpen] = useState(false)
 *
 *   const handlePlay = () => {
 *     setThreads(generateWelcomeThreads(28))
 *     setOpen(true)
 *   }
 *
 *   <WelcomeAnimation
 *     open={open}
 *     threads={threads}
 *     onComplete={() => setOpen(false)}
 *   />
 */
export const WelcomeAnimation = ({
  open,
  threads,
  onComplete,
  greeting = 'Bienvenido a',

  brandName = 'Dora Galiano',
  tagline = 'diseño para armar',
}: WelcomeAnimationProps) => {
  useEffect(() => {
    if (!open || threads.length === 0) return;

    const lastThreadEnd = Math.max(...threads.map((t) => t.delay + t.duration)) + 200;

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, lastThreadEnd);

    return () => clearTimeout(completeTimer);
  }, [open, threads, onComplete]);

  if (!open || threads.length === 0) return null;

  // Tiempo total estimado para coordinar fade in/out del mensaje central.
  const totalDuration = Math.max(...threads.map((t) => t.delay + t.duration)) + 200;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: (theme) => theme.zIndex.snackbar - 1,
      }}
    >
      {/* Keyframes globales */}
      <Box
        component="style"
        dangerouslySetInnerHTML={{
          __html: `
      @keyframes welcomeThreadFall {
        0% {
          transform: translateY(-200px) translateX(0);
          opacity: 0;
        }
        8% {
          opacity: var(--thread-opacity, 0.5);
        }
        92% {
          opacity: var(--thread-opacity, 0.5);
        }
        100% {
          transform: translateY(calc(100vh + 200px)) translateX(var(--sway-x, 0));
          opacity: 0;
        }
      }

      @keyframes welcomeBackdropFade {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      @keyframes welcomeMessageFadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      @keyframes welcomeMessageFadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }

      @keyframes welcomeStitchDraw {
        0% {
          stroke-dashoffset: 200;
          opacity: 0;
        }
        30% {
          opacity: 1;
        }
        100% {
          stroke-dashoffset: 0;
          opacity: 1;
        }
      }
    `,
        }}
      />

      {/* Hilos cayendo (capa de fondo) */}
      {threads.map((thread) => (
        <Box
          key={thread.id}
          sx={(theme) => ({
            position: 'absolute',
            top: 0,
            left: `${thread.left}%`,
            width: `${thread.thickness}px`,
            height: `${thread.length}px`,
            backgroundColor:
              thread.color === 'primary'
                ? theme.palette.primary.main
                : theme.palette.secondary.main,
            opacity: 0,
            transform: 'translateY(-200px)',
            animation: `welcomeThreadFall ${thread.duration}ms ${thread.delay}ms ease-in forwards`,
            '--sway-x': `${thread.swayDirection * thread.swayAmount}px`,
            '--thread-opacity': thread.opacity,
            borderRadius: '1px',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${thread.thickness * 2.5}px`,
              height: `${thread.thickness * 2.5}px`,
              borderRadius: '50%',
              backgroundColor:
                thread.color === 'primary'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
            },
          })}
        />
      ))}

      {/* Backdrop sutil para mejorar legibilidad del mensaje */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(20, 18, 16, 0.35)' : 'rgba(250, 247, 242, 0.55)',
          backdropFilter: 'blur(2px)',
          animation: `welcomeBackdropFade 600ms ease-out backwards`,
        }}
      />

      {/* Mensaje central (capa de frente) */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          textAlign: 'center',
          paddingX: 3,
          maxWidth: { xs: '90vw', sm: 560 },
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Stack
          spacing={{ xs: 2, sm: 3 }}
          sx={{
            alignItems: 'center',
            animation: `
        welcomeMessageFadeIn 800ms 400ms ease-out backwards,
        welcomeMessageFadeOut 600ms ${totalDuration - 800}ms ease-in forwards
      `,
          }}
        >
          {/* Logo */}
          <Box sx={{ marginBottom: 1 }}>
            <Logo variant="icon" />
          </Box>

          {/* "Bienvenida a" */}
          <Typography
            variant="overline"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.3em',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              fontWeight: 500,
            }}
          >
            {greeting}
          </Typography>

          {/* Nombre de la marca */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 400,
              lineHeight: 1,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              letterSpacing: '-0.02em',
              color: 'text.primary',
            }}
          >
            {brandName}
          </Typography>

          {/* Línea decorativa (puntada bordada) */}
          <Box
            component="svg"
            viewBox="0 0 200 12"
            sx={{
              width: { xs: 120, sm: 200 },
              height: 12,
              color: 'primary.main',
            }}
          >
            <path
              d="M 5 6 Q 25 0 45 6 T 85 6 T 125 6 T 165 6 T 195 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset="200"
              style={{
                animation: 'welcomeStitchDraw 1400ms 800ms ease-out forwards',
              }}
            />
          </Box>

          {/* Tagline */}
          <Typography
            variant="body1"
            sx={{
              color: 'secondary.dark',
              fontStyle: 'italic',
              fontFamily: (theme) => theme.typography.h1.fontFamily,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              letterSpacing: '0.02em',
              fontWeight: 400,
            }}
          >
            {tagline}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
