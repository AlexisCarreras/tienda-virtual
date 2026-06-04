import { Box, type BoxProps, Stack, Typography } from '@mui/material';

import FaviconSvg from '@/assets/logos/favicon.svg?react';
import LogoFullSvg from '@/assets/logos/logo-full.svg?react';
import LogoIconSvg from '@/assets/logos/logo-icon.svg?react';
import LogoTextSvg from '@/assets/logos/logo-text.svg?react';

export type LogoVariant = 'full' | 'icon' | 'text' | 'favicon';
export type LogoTaglineSize = 'small' | 'medium' | 'large';

export type LogoProps = {
  /** Variante del logo. Default: 'full' (ícono + nombre + tagline). */
  variant?: LogoVariant;
  /** Altura del logo en px. Para 'full' es la altura del bloque entero. Default: 40. */
  height?: number | string;
  /** Color del logo (acepta valores del theme como 'primary.main'). */
  color?: string;
  /** Si se muestra el tagline "diseño para armar". Solo aplica a variant='full'. Default: true. */
  showTagline?: boolean;
  /** Tamaño del tagline. Default: 'small'. */
  taglineSize?: LogoTaglineSize;
  /** Estilos custom. */
  sx?: BoxProps['sx'];
};

const variantMap = {
  full: LogoFullSvg,
  icon: LogoIconSvg,
  text: LogoTextSvg,
  favicon: FaviconSvg,
};

// Tamaños del tagline: fontSize, letterSpacing y peso.
const TAGLINE_SIZES: Record<
  LogoTaglineSize,
  { fontSize: string; letterSpacing: string; fontWeight: number }
> = {
  small: { fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 500 },
  medium: { fontSize: '0.85rem', letterSpacing: '0.22em', fontWeight: 500 },
  large: { fontSize: '1rem', letterSpacing: '0.25em', fontWeight: 500 },
};

/**
 * Componente del logo de la marca.
 *
 * Variantes:
 *  - `full`: ícono + nombre "DORA GALIANO" + tagline "diseño para armar" debajo.
 *  - `icon`: solo el cuadrado con la "L".
 *  - `text`: solo el texto del nombre.
 *  - `favicon`: variante chica para tab del navegador.
 *
 * Cuando `variant='full'`, el tagline vive como Typography (no en el SVG)
 * para tener control granular del tamaño y mejor legibilidad.
 *
 * @example
 *   <Logo />                                  // full con tagline, height=40
 *   <Logo height={64} taglineSize="large" />  // grande, para login/splash
 *   <Logo showTagline={false} />              // full sin tagline (espacios compactos)
 *   <Logo variant="icon" height={32} />       // solo ícono
 */
export const Logo = ({
  variant = 'full',
  height = 40,
  color,
  showTagline = true,
  taglineSize = 'small',
  sx,
}: LogoProps) => {
  // Para variant 'full': construimos el layout manualmente (ícono + columna texto)
  if (variant === 'full') {
    return (
      <LogoFullLayout
        height={height}
        color={color}
        showTagline={showTagline}
        taglineSize={taglineSize}
        sx={sx}
      />
    );
  }

  // Para las otras variantes: render simple del SVG correspondiente
  const SvgComponent = variantMap[variant];

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        color: color ?? 'text.primary',
        '& svg': {
          height: typeof height === 'number' ? `${height}px` : height,
          width: 'auto',
          display: 'block',
        },
        ...sx,
      }}
    >
      <SvgComponent />
    </Box>
  );
};

/**
 * Layout interno del variant='full': ícono a la izquierda + columna con
 * nombre arriba y tagline (opcional) abajo.
 */
type LogoFullLayoutProps = Pick<
  LogoProps,
  'height' | 'color' | 'showTagline' | 'taglineSize' | 'sx'
>;

const LogoFullLayout = ({
  height = 40,
  color,
  showTagline = true,
  taglineSize = 'small',
  sx,
}: LogoFullLayoutProps) => {
  const heightPx = typeof height === 'number' ? height : Number.parseFloat(height as string) || 40;

  // El ícono ocupa toda la altura. El nombre ocupa ~60% de la altura.
  // El tagline va debajo del nombre, no a la altura del ícono.
  const iconHeight = heightPx;
  const nameHeight = Math.round(heightPx * 0.6);

  const taglineStyle = TAGLINE_SIZES[taglineSize];

  return (
    <Stack
      direction="row"
      spacing={1.25}
      sx={{
        alignItems: 'center',
        color: color ?? 'text.primary',
        ...sx,
      }}
    >
      {/* Ícono */}
      <Box
        sx={{
          display: 'inline-flex',
          flexShrink: 0,
          '& svg': {
            height: `${iconHeight}px`,
            width: 'auto',
            display: 'block',
          },
        }}
      >
        <LogoIconSvg />
      </Box>

      {/* Columna: nombre arriba, tagline abajo */}
      <Stack
        spacing={0.25}
        sx={{
          justifyContent: 'center',
          minHeight: `${iconHeight}px`,
        }}
      >
        {/* Nombre (SVG con solo el texto "DORA GALIANO") */}
        <Box
          sx={{
            display: 'inline-flex',
            '& svg': {
              height: `${nameHeight}px`,
              width: 'auto',
              display: 'block',
            },
          }}
        >
          <LogoFullSvg />
        </Box>

        {/* Tagline */}
        {showTagline && (
          <Typography
            component="span"
            sx={{
              display: 'block',
              fontFamily: (theme) => theme.typography.body2.fontFamily,
              fontSize: taglineStyle.fontSize,
              letterSpacing: taglineStyle.letterSpacing,
              fontWeight: taglineStyle.fontWeight,
              color: 'text.secondary',
              textTransform: 'lowercase',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
            }}
          >
            diseño para armar
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
