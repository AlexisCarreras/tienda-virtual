import { Box } from '@mui/material';

/**
 * Ilustración para "carrito vacío".
 * Bolsa de tela con costuras visibles.
 */
export const EmptyCart = ({ size = 120 }: { size?: number }) => (
  <Box
    component="svg"
    viewBox="0 0 120 120"
    sx={{
      width: size,
      height: size,
      color: 'primary.main',
    }}
  >
    {/* Asas */}
    <path
      d="M40 35 C40 22 48 18 60 18 C72 18 80 22 80 35"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Cuerpo de la bolsa */}
    <path
      d="M28 35 L92 35 L88 100 L32 100 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Costuras decorativas (puntadas) */}
    <line
      x1="28"
      y1="42"
      x2="92"
      y2="42"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 3"
      opacity="0.5"
    />
    <line
      x1="40"
      y1="35"
      x2="40"
      y2="100"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 3"
      opacity="0.4"
    />
    <line
      x1="80"
      y1="35"
      x2="80"
      y2="100"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 3"
      opacity="0.4"
    />
  </Box>
);
