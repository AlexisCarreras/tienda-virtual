import { Box, CircularProgress } from '@mui/material';

export type SpinnerSize = 'xsmall' | 'small' | 'medium' | 'large';
export type SpinnerColor = 'primary' | 'secondary' | 'inherit';

export type SpinnerProps = {
  /** Tamaño. Default: 'medium' */
  size?: SpinnerSize;
  /** Color. Default: 'primary' */
  color?: SpinnerColor;
  /** Si está centrado en su contenedor. */
  centered?: boolean;
  /** Label para accesibilidad. Default: 'Cargando'. */
  'aria-label'?: string;
};

const SIZE_MAP: Record<SpinnerSize, number> = {
  xsmall: 14,
  small: 20,
  medium: 32,
  large: 48,
};

const THICKNESS_MAP: Record<SpinnerSize, number> = {
  xsmall: 4,
  small: 4,
  medium: 3.5,
  large: 3,
};

/**
 * Indicador circular animado para estados de carga.
 *
 * Cuándo usar Spinner vs Skeleton:
 *  - Spinner: para acciones puntuales (botón cargando, área chica sin estructura clara).
 *  - Skeleton: para placeholders de contenido con estructura conocida (listas, cards).
 *
 * @example
 *   // Spinner en el medio de una sección
 *   <Spinner centered />
 *
 *   // Spinner chico dentro de un botón
 *   <Spinner size="small" color="inherit" />
 *
 *   // Spinner grande en pantalla completa
 *   <Spinner size="large" centered />
 */
export const Spinner = ({
  size = 'medium',
  color = 'primary',
  centered = false,
  'aria-label': ariaLabel = 'Cargando',
}: SpinnerProps) => {
  const sizeValue = SIZE_MAP[size];
  const thickness = THICKNESS_MAP[size];

  const spinner = (
    <CircularProgress
      size={sizeValue}
      thickness={thickness}
      color={color}
      aria-label={ariaLabel}
      role="status"
    />
  );

  if (centered) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          width: '100%',
        }}
      >
        {spinner}
      </Box>
    );
  }

  return spinner;
};
