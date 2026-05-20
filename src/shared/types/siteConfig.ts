import { type BaseDocument } from './common';

/**
 * Configuración editable del sitio.
 * Se edita desde el admin: textos del home, logo, datos de contacto, etc.
 */
export type SiteConfig = BaseDocument & {
  // Marca
  brandName: string;
  tagline: string;
  description: string;

  // Contacto
  email: string;
  phone?: string;
  whatsapp?: string;

  // Redes
  instagram?: string;
  facebook?: string;

  // Hero del home
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string; // URL de Storage

  // Secciones del home (todas opcionales, configurables)
  aboutTitle?: string;
  aboutText?: string;
  aboutImage?: string;

  // Configuración de tienda
  shippingZones: Array<{
    name: string; // ej: "CABA", "GBA Norte"
    cost: number;
  }>;
};
