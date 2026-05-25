import { Box } from '@mui/material';

/**
 * Ilustración para "sin favoritos".
 * Corazón hecho con hilo, bordado.
 */
export const EmptyFavorites = ({ size = 120 }: { size?: number }) => (
  <Box
    component="svg"
    viewBox="0 0 120 120"
    sx={{
      width: size,
      height: size,
      color: 'primary.main',
    }}
  >
    {/* Corazón con línea punteada (bordado) */}
    <path
      d="M60 92 C40 78 22 62 22 45 C22 35 30 28 40 28 C48 28 55 32 60 38 C65 32 72 28 80 28 C90 28 98 35 98 45 C98 62 80 78 60 92 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeDasharray="4 3"
    />
    {/* Aguja que entra al corazón */}
    <line
      x1="75"
      y1="20"
      x2="65"
      y2="38"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Ojo de la aguja */}
    <circle cx="76" cy="19" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    {/* Hilo desde la aguja */}
    <path
      d="M76 19 Q85 15 90 22 Q95 28 100 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.5"
    />
  </Box>
);
