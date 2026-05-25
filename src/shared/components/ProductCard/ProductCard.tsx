import { useState } from 'react';

import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { IconButton } from '@/shared/components/IconButton';
import { Tag } from '@/shared/components/Tag';

export type ProductCardProps = {
  /** ID o slug del producto (para navegación). */
  id: string;
  /** Nombre del producto. */
  name: string;
  /** Categoría del producto (texto pequeño arriba del nombre). */
  category?: string;
  /** Precio actual en pesos (sin formatear). */
  price: number;
  /** Precio anterior si está en oferta (sin formatear). Se muestra tachado. */
  previousPrice?: number;
  /** URL de la imagen principal. */
  imageUrl: string;
  /** URL de la segunda imagen (se muestra al hacer hover en desktop). */
  imageHoverUrl?: string;
  /** Alt text para la imagen. Default: name. */
  imageAlt?: string;
  /** Si está marcado como favorito. */
  isFavorite?: boolean;
  /** Handler cuando se clickea el corazón de favoritos. */
  onFavoriteClick?: () => void;
  /** Stock total del producto. Si es menor a 3, muestra "Últimas unidades". */
  stock?: number;
  /** Si el producto está agotado (override de stock). */
  outOfStock?: boolean;
  /** Si es un producto nuevo (badge "Nuevo"). */
  isNew?: boolean;
  /** Handler de click en la card entera (para navegar al detalle). */
  onClick?: () => void;
};

/**
 * Card de producto para el catálogo, home y secciones de "destacados".
 *
 * Features:
 *  - Foto principal + foto al hover (cross-fade).
 *  - Corazón de favoritos en esquina superior derecha.
 *  - Badge de "Nuevo" o "Últimas unidades" según corresponda.
 *  - Precio con descuento (tachado el anterior si aplica).
 *  - Card entera clickeable (lleva al detalle).
 *
 * @example
 *   <ProductCard
 *     id="vestido-denim-1"
 *     name="Vestido denim reciclado con bordados"
 *     category="Vestidos"
 *     price={25000}
 *     previousPrice={30000}
 *     imageUrl="/productos/vestido-1.jpg"
 *     imageHoverUrl="/productos/vestido-1-alt.jpg"
 *     isFavorite={favorites.includes('vestido-denim-1')}
 *     onFavoriteClick={() => toggleFavorite('vestido-denim-1')}
 *     onClick={() => navigate('/producto/vestido-denim-1')}
 *     stock={2}
 *   />
 */
export const ProductCard = ({
  name,
  category,
  price,
  previousPrice,
  imageUrl,
  imageHoverUrl,
  imageAlt,
  isFavorite = false,
  onFavoriteClick,
  stock,
  outOfStock = false,
  isNew = false,
  onClick,
}: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const hasDiscount = previousPrice !== undefined && previousPrice > price && !outOfStock;
  const discountPercent = hasDiscount
    ? Math.round(((previousPrice - price) / previousPrice) * 100)
    : 0;

  const showLowStock = stock !== undefined && stock > 0 && stock < 3 && !outOfStock;

  // Formato de precio: $25.000 (con punto separador de miles)
  const formatPrice = (value: number) => `$${value.toLocaleString('es-AR')}`;

  // Evitar que el click en el corazón propague al click de la card
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.();
  };

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        transition: 'all 200ms',
        opacity: outOfStock ? 0.6 : 1,
      }}
    >
      {/* Contenedor de la imagen */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          borderRadius: 1,
          backgroundColor: 'action.hover',
          marginBottom: 1.5,
        }}
      >
        {/* Imagen principal */}
        <Box
          component="img"
          src={imageUrl}
          alt={imageAlt ?? name}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 600ms ease',
            // Zoom sutil al hover
            transform: isHovering ? 'scale(1.04)' : 'scale(1)',
            // Si hay segunda imagen, fade-out al hover
            opacity: isHovering && imageHoverUrl ? 0 : 1,
          }}
        />

        {/* Imagen al hover (fade-in) */}
        {imageHoverUrl && (
          <Box
            component="img"
            src={imageHoverUrl}
            alt={imageAlt ?? name}
            loading="lazy"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 600ms ease',
              transform: isHovering ? 'scale(1.04)' : 'scale(1)',
              opacity: isHovering ? 1 : 0,
            }}
          />
        )}

        {/* Badges en esquina superior izquierda */}
        <Stack
          spacing={0.5}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            alignItems: 'flex-start',
          }}
        >
          {isNew && <Tag label="Nuevo" color="primary" variant="solid" size="small" />}
          {hasDiscount && (
            <Tag label={`-${discountPercent}%`} color="error" variant="solid" size="small" />
          )}
          {outOfStock && <Tag label="Sin stock" color="default" variant="solid" size="small" />}
          {showLowStock && (
            <Tag label="Últimas unidades" color="warning" variant="solid" size="small" />
          )}
        </Stack>

        {/* Botón de favorito en esquina superior derecha */}
        {onFavoriteClick && (
          <Box
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <IconButton
              variant={isFavorite ? 'primary' : 'default'}
              size="small"
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Info del producto */}
      <Stack spacing={0.5} sx={{ paddingX: 0.5 }}>
        {category && (
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
            }}
          >
            {category}
          </Typography>
        )}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            lineHeight: 1.4,
            // Truncar a 2 líneas máximo
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.8em', // Reserva espacio fijo para no desalinear cards
          }}
        >
          {name}
        </Typography>

        {/* Precio */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: hasDiscount ? 'error.main' : 'text.primary',
            }}
          >
            {formatPrice(price)}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'line-through',
              }}
            >
              {formatPrice(previousPrice)}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
