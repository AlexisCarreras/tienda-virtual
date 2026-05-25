import { useMemo } from 'react';

import { Avatar as MuiAvatar } from '@mui/material';

export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarShape = 'circle' | 'square' | 'rounded';

export type AvatarProps = {
  /** Nombre completo del usuario (se usa para iniciales y color). */
  name?: string;
  /** URL de la imagen. Si falla o no existe, muestra iniciales. */
  src?: string;
  /** Alt text para la imagen. Default: name. */
  alt?: string;
  /** Tamaño. Default: 'medium' */
  size?: AvatarSize;
  /** Forma. Default: 'circle' */
  shape?: AvatarShape;
  /** Color de fondo. Si no se pasa, se genera desde el name. */
  bgColor?: string;
  /** Click handler (lo hace clickeable). */
  onClick?: () => void;
};

// Tamaños en píxeles
const SIZE_MAP: Record<AvatarSize, number> = {
  xsmall: 24,
  small: 32,
  medium: 40,
  large: 56,
  xlarge: 80,
};

// Tamaños de fuente para las iniciales
const FONT_SIZE_MAP: Record<AvatarSize, string> = {
  xsmall: '0.625rem', // 10px
  small: '0.75rem', // 12px
  medium: '0.875rem', // 14px
  large: '1.125rem', // 18px
  xlarge: '1.5rem', // 24px
};

/**
 * Avatar circular o cuadrado con foto o iniciales.
 *
 * Si la imagen falla en cargar (o no se pasa), automáticamente muestra
 * las iniciales del nombre con un color de fondo derivado del mismo nombre
 * (siempre la misma persona tiene siempre el mismo color).
 *
 * @example
 *   // Con foto
 *   <Avatar src="/foto.jpg" name="María Pérez" />
 *
 *   // Solo iniciales (deriva color del nombre)
 *   <Avatar name="Dora Galiano" size="large" />
 *
 *   // Sin nombre (genérico)
 *   <Avatar />
 *
 *   // Cuadrado redondeado (útil para logos)
 *   <Avatar src="/logo.jpg" shape="rounded" size="small" />
 */
export const Avatar = ({
  name,
  src,
  alt,
  size = 'medium',
  shape = 'circle',
  bgColor,
  onClick,
}: AvatarProps) => {
  const sizeValue = SIZE_MAP[size];
  const fontSize = FONT_SIZE_MAP[size];

  // Calcular iniciales del nombre
  const initials = useMemo(() => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [name]);

  // Generar color desde el nombre.
  // Misma persona = mismo color siempre (no aleatorio).
  const generatedColor = useMemo(() => {
    if (bgColor) return bgColor;
    if (!name) return undefined;

    // Hash simple del nombre
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Paleta de colores agradables que combinan con el design system
    const colors = [
      '#B4521E', // terracota
      '#D4A04C', // mostaza
      '#2B4865', // denim
      '#5A7AA8', // denim claro
      '#8C3D14', // terracota oscuro
      '#A87E36', // mostaza oscuro
    ];
    return colors[Math.abs(hash) % colors.length];
  }, [name, bgColor]);

  // Border radius según la forma
  const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? 1 : 0;

  return (
    <MuiAvatar
      src={src}
      alt={alt ?? name}
      onClick={onClick}
      sx={{
        width: sizeValue,
        height: sizeValue,
        fontSize,
        fontWeight: 500,
        borderRadius,
        backgroundColor: src ? undefined : generatedColor,
        color: '#FFFFFF',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 200ms',
        ...(onClick && {
          '&:hover': {
            opacity: 0.85,
          },
        }),
      }}
    >
      {initials}
    </MuiAvatar>
  );
};
