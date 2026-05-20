import { type BaseDocument } from './common';

/**
 * Variante de un producto (talle/color disponible y su stock).
 * Ej: una remera tiene variantes [S/Negro, S/Blanco, M/Negro, ...].
 */
export type ProductVariant = {
  size: string; // 'S', 'M', 'L', '38', etc.
  color: string; // 'Negro', 'Crudo', etc.
  stock: number;
  sku?: string; // código interno opcional
};

/**
 * Producto del catálogo.
 */
export type Product = BaseDocument & {
  name: string;
  slug: string; // URL friendly: "campera-denim-creo-en-mi"
  description: string;
  price: number; // en ARS, sin decimales (centavos los manejamos aparte si hace falta)
  categoryId: string;
  images: string[]; // URLs públicas de Storage
  variants: ProductVariant[];
  isFeatured: boolean; // aparece destacado en home
  isActive: boolean; // visible en el catálogo (false = oculto/archivado)
  tags?: string[]; // ej: ['denim', 'reciclado', 'invierno']
};
