/**
 * Claves de React Query centralizadas.
 *
 * Convención: cada feature es una key con sus variantes.
 *  - `products.all`            → todos los productos (sin filtros)
 *  - `products.byId('abc')`    → un producto específico
 *  - `products.byCategory(id)` → productos filtrados por categoría
 *
 * Cuando hagamos una mutación (crear/editar producto), invalidamos
 * las keys relacionadas para refrescar automáticamente las vistas.
 */
export const queryKeys = {
  // Productos
  products: {
    all: ['products'] as const,
    byId: (id: string) => ['products', id] as const,
    byCategory: (categoryId: string) => ['products', 'category', categoryId] as const,
    featured: ['products', 'featured'] as const,
  },

  // Categorías
  categories: {
    all: ['categories'] as const,
    byId: (id: string) => ['categories', id] as const,
  },

  // Órdenes
  orders: {
    all: ['orders'] as const,
    byId: (id: string) => ['orders', id] as const,
    byUser: (userId: string) => ['orders', 'user', userId] as const,
  },

  // Usuarios
  users: {
    byId: (id: string) => ['users', id] as const,
  },

  // Configuración del sitio
  siteConfig: ['siteConfig'] as const,
} as const;
