import { Box, type BoxProps } from '@mui/material';

import FaviconSvg from '@/assets/logos/favicon.svg?react';
import LogoFullSvg from '@/assets/logos/logo-full.svg?react';
import LogoIconSvg from '@/assets/logos/logo-icon.svg?react';
import LogoTextSvg from '@/assets/logos/logo-text.svg?react';

type LogoVariant = 'full' | 'icon' | 'text' | 'favicon';

type LogoProps = {
  variant?: LogoVariant;
  height?: number | string;
  color?: string;
  sx?: BoxProps['sx'];
};

const variantMap = {
  full: LogoFullSvg,
  icon: LogoIconSvg,
  text: LogoTextSvg,
  favicon: FaviconSvg,
};

/**
 * Componente del logo de la marca.
 * Como los SVGs usan `fill="currentColor"`, el color se hereda del CSS
 * (por default, el text color del theme).
 *
 * @example
 * <Logo />                          // logo completo, altura default
 * <Logo variant="icon" height={32}/> // solo el ícono, 32px de alto
 * <Logo color="primary.main" />     // forzar un color del theme
 */
export const Logo = ({ variant = 'full', height = 40, color, sx }: LogoProps) => {
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
