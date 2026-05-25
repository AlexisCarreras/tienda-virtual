import { Skeleton as MuiSkeleton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export type SkeletonProps = {
  /** Forma del skeleton. Default: 'text'. */
  variant?: SkeletonVariant;
  /** Tipo de animación. Default: 'pulse'. */
  animation?: SkeletonAnimation;
  /** Ancho. Acepta número (px) o string (% o cualquier unidad CSS). */
  width?: number | string;
  /** Alto. Acepta número (px) o string. */
  height?: number | string;
  /** Estilos custom adicionales (útil para aspect-ratio, márgenes, etc). */
  sx?: SxProps<Theme>;
};

/**
 * Placeholder animado que se muestra mientras un contenido está cargando.
 *
 * Mejor que un spinner porque:
 *  - Muestra la estructura de lo que viene (menos sorpresa al cargar).
 *  - Mejor performance percibida.
 *  - Más profesional visualmente.
 *
 * Usar la misma forma y tamaño aproximado del contenido real.
 *
 * @example
 *   // Skeleton de texto (default)
 *   <Skeleton width="100%" />
 *   <Skeleton width="60%" />
 *
 *   // Skeleton de una imagen de producto
 *   <Skeleton variant="rounded" width="100%" height={400} />
 *
 *   // Skeleton con aspect-ratio (alto se calcula desde el ancho)
 *   <Skeleton variant="rounded" width="100%" sx={{ aspectRatio: '4 / 5' }} />
 *
 *   // Skeleton de un avatar
 *   <Skeleton variant="circular" width={40} height={40} />
 */
export const Skeleton = ({
  variant = 'text',
  animation = 'pulse',
  width,
  height,
  sx,
}: SkeletonProps) => {
  return (
    <MuiSkeleton
      variant={variant}
      animation={animation === 'none' ? false : animation}
      width={width}
      height={height}
      sx={[
        {
          // Color custom para que combine con el theme
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
          ...(variant === 'rounded' && { borderRadius: 1 }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};
