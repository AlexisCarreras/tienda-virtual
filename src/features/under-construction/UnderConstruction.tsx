import { useEffect, useState } from 'react';

import { Box, Container, Stack, Typography, useTheme } from '@mui/material';

/**
 * Fecha objetivo de lanzamiento del Inicio.
 * Cuando llegue el 5 de junio 2026 (00:00 ART), el contador se congela en ceros.
 */
const LAUNCH_DATE = new Date('2026-06-05T23:59:00-03:00');

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (): TimeLeft => {
  const now = new Date().getTime();
  const target = LAUNCH_DATE.getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

/**
 * SVG decorativo: hilo y aguja estilizados.
 * Usa currentColor para respetar dark mode.
 */
const ThreadAndNeedle = () => (
  <svg
    viewBox="0 0 240 240"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', maxWidth: 220 }}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="60" y1="180" x2="170" y2="70" strokeWidth="2.5" />

    <ellipse cx="165" cy="75" rx="6" ry="3" transform="rotate(-45 165 75)" strokeWidth="2" />

    <line x1="55" y1="185" x2="48" y2="192" strokeWidth="2.5" />

    <path
      d="M 168 72 Q 200 60, 210 90 Q 220 120, 195 130 Q 170 140, 175 165 Q 180 195, 150 200"
      strokeWidth="1.5"
      strokeDasharray="2 3"
    />

    <g strokeWidth="1.5" opacity="0.6">
      <line x1="40" y1="60" x2="60" y2="80" />
      <line x1="60" y1="60" x2="40" y2="80" />
    </g>

    <g strokeWidth="1.5" opacity="0.6">
      <line x1="195" y1="40" x2="215" y2="60" />
      <line x1="215" y1="40" x2="195" y2="60" />
    </g>

    <circle cx="80" cy="130" r="1.5" fill="currentColor" stroke="none" opacity="0.5" />
    <circle cx="95" cy="145" r="1.5" fill="currentColor" stroke="none" opacity="0.5" />
    <circle cx="110" cy="160" r="1.5" fill="currentColor" stroke="none" opacity="0.5" />
  </svg>
);

/**
 * Unidad del contador: número grande arriba, label abajo.
 */
type CountdownUnitProps = {
  value: number;
  label: string;
};

const CountdownUnit = ({ value, label }: CountdownUnitProps) => {
  const theme = useTheme();

  return (
    <Stack sx={{ alignItems: 'center' }} spacing={0.5}>
      <Box
        sx={{
          minWidth: { xs: 60, sm: 80 },
          py: { xs: 1.5, sm: 2 },
          px: { xs: 1, sm: 2 },
          borderRadius: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
          border: `1px solid ${theme.palette.divider}`,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          component="span"
          sx={{
            fontFamily: theme.typography.h1.fontFamily,
            fontWeight: 500,
            fontSize: { xs: '1.75rem', sm: '2.5rem' },
            color: 'text.primary',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, '0')}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'text.secondary',
          fontSize: '0.7rem',
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

export const UnderConstruction = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container maxWidth="md">
      <Stack
        spacing={{ xs: 3, md: 5 }}
        sx={{
          minHeight: { xs: '60vh', md: '65vh' },
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: { xs: 3, md: 5 },
        }}
      >
        <Box
          sx={{
            color: 'primary.main',
            width: { xs: 130, sm: 160 },
            opacity: 0.85,
          }}
        >
          <ThreadAndNeedle />
        </Box>

        <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              letterSpacing: '0.25em',
              fontSize: '0.75rem',
            }}
          >
            En desarrollo
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              maxWidth: 600,
            }}
          >
            Sitio en construcción
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 480,
            color: 'text.secondary',
            lineHeight: 1.65,
          }}
        >
          Estamos preparando con cuidado nuestro espacio en línea. El próximo{' '}
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>
            5 de junio
          </Box>{' '}
          podrás conocer la marca y sus colecciones.
        </Typography>

        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ alignItems: 'center' }}>
          <CountdownUnit value={timeLeft.days} label="días" />
          <Typography variant="h4" sx={{ color: 'text.secondary', fontWeight: 300 }}>
            :
          </Typography>
          <CountdownUnit value={timeLeft.hours} label="horas" />
          <Typography variant="h4" sx={{ color: 'text.secondary', fontWeight: 300 }}>
            :
          </Typography>
          <CountdownUnit value={timeLeft.minutes} label="minutos" />
          <Typography variant="h4" sx={{ color: 'text.secondary', fontWeight: 300 }}>
            :
          </Typography>
          <CountdownUnit value={timeLeft.seconds} label="segundos" />
        </Stack>

        <Box
          sx={{
            mt: 1.5,
            pt: 2.5,
            borderTop: 1,
            borderColor: 'divider',
            maxWidth: 480,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              lineHeight: 1.55,
            }}
          >
            El catálogo completo, cuenta personal y compras
            <br />
            estarán disponibles más adelante.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};
