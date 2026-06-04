/**
 * Configuración central del sitio.
 *
 * Acá viven los datos de marca, contacto y enlaces que se usan en múltiples
 * lugares (header, footer, legales, metadata). Cambiás un valor acá y se
 * actualiza en todo el sitio.
 */

export const siteConfig = {
  // Identidad de marca
  brand: {
    name: 'Dora Galiano',
    tagline: 'diseño para armar',
    description: 'Indumentaria.',
  },

  // Datos de contacto
  contact: {
    whatsapp: '+5491136121394',
    whatsappDisplay: '+54 9 11 3612-1394',
    email: 'galianodindumentaria@gmail.com',
  },

  // Redes sociales
  social: {
    instagram: 'dora__galiano',
    instagramUrl: 'https://www.instagram.com/dora__galiano/',
  },

  // Datos legales (para legales y schema.org)
  legal: {
    razonSocial: 'Dora Galiano Indumentaria',
    cuit: '[CUIT a completar]',
    localidad: 'Merlo',
    provincia: 'Buenos Aires',
    pais: 'Argentina',
  },

  // URLs externas / rutas internas
  links: {
    arrepentimiento: '/arrepentimiento',
    terminos: '/terminos',
    privacidad: '/privacidad',
    envios: '/envios',
    cambios: '/cambios',
  },

  // Horarios de atención (string libre, se muestra en footer y página de contacto)
  schedule: {
    days: 'lunes a viernes',
    hours: 'de 10 a 18 hs',
  },
} as const;

/**
 * Construye una URL de WhatsApp con mensaje predefinido opcional.
 *
 * @example
 *   const url = buildWhatsAppUrl('Hola, consulta sobre el vestido denim')
 *   // → https://wa.me/5491136121394?text=Hola%2C%20consulta...
 */
export const buildWhatsAppUrl = (message?: string): string => {
  const phone = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');
  const baseUrl = `https://wa.me/${phone}`;
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};

/**
 * Categorías del catálogo. En el módulo 6 esto va a venir de Firestore.
 */
export const catalogCategories = [
  { slug: 'camperas-y-abrigos', label: 'Camperas y abrigos' },
  { slug: 'vestidos', label: 'Vestidos' },
  { slug: 'tops-y-blusas', label: 'Tops y blusas' },
  { slug: 'pantalones-y-shorts', label: 'Pantalones y shorts' },
  { slug: 'accesorios', label: 'Accesorios' },
  { slug: 'edicion-especial', label: 'Edición especial' },
] as const;

export type CatalogCategory = (typeof catalogCategories)[number];
