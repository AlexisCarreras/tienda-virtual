import { Box } from '@mui/material';

/**
 * Ilustración para listados vacíos del admin (sin pedidos, sin productos, etc).
 * Caja vacía con un broche/pin de coser arriba.
 */
export const EmptyAdmin = ({ size = 120 }: { size?: number }) => (
  <Box
    component="svg"
    viewBox="0 0 120 120"
    sx={{
      width: size,
      height: size,
      color: 'primary.main',
    }}
  >
    {/* Caja - tapa */}
    <path
      d="M25 50 L60 38 L95 50 L60 62 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Caja - cuerpo */}
    <path
      d="M25 50 L25 92 L60 105 L95 92 L95 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Línea central */}
    <line
      x1="60"
      y1="62"
      x2="60"
      y2="105"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
      opacity="0.5"
    />
    {/* Alfiler con hilo arriba */}
    <line
      x1="85"
      y1="20"
      x2="78"
      y2="42"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="86" cy="19" r="3" fill="currentColor" />
    <path
      d="M86 19 Q95 25 90 35"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.5"
    />
  </Box>
);
