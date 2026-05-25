import { Box } from '@mui/material';

/**
 * Ilustración para "sin resultados con filtros".
 * Lupa con hilos sueltos atrás.
 */
export const EmptySearch = ({ size = 120 }: { size?: number }) => (
  <Box
    component="svg"
    viewBox="0 0 120 120"
    sx={{
      width: size,
      height: size,
      color: 'primary.main',
    }}
  >
    {/* Hilos sueltos atrás */}
    <path
      d="M20 95 Q40 75 25 55"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.4"
      strokeDasharray="2 3"
    />
    <path
      d="M100 95 Q85 75 95 55"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.4"
      strokeDasharray="2 3"
    />
    {/* Lupa */}
    <circle cx="54" cy="54" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
    <line
      x1="71"
      y1="71"
      x2="88"
      y2="88"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Brillito sutil dentro de la lupa */}
    <path
      d="M44 46 C44 42 48 38 52 38"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
  </Box>
);
