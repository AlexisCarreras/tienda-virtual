import { Box } from '@mui/material';

/**
 * Ilustración para "catálogo vacío" o "sin productos".
 * Percha minimalista con un hilo colgando.
 */
export const EmptyCatalog = ({ size = 120 }: { size?: number }) => (
  <Box
    component="svg"
    viewBox="0 0 120 120"
    sx={{
      width: size,
      height: size,
      color: 'primary.main',
    }}
  >
    {/* Percha */}
    <path
      d="M60 30 L60 22 C60 18 63 15 67 15 C71 15 74 18 74 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M30 55 L60 32 L90 55 L86 60 L60 42 L34 60 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Hilo colgando */}
    <path
      d="M60 60 Q58 75 62 90 Q57 100 60 110"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 3"
      opacity="0.6"
    />
    {/* Nudito al final */}
    <circle cx="60" cy="110" r="2" fill="currentColor" />
  </Box>
);
