import { type BaseDocument } from './common';

export type Category = BaseDocument & {
  name: string;
  slug: string;
  description?: string;
  image?: string; // URL de imagen representativa (opcional)
  order: number; // para ordenar manualmente en el menú
  isActive: boolean;
};
