import type { Timestamp } from 'firebase/firestore';

import { type BaseDocument } from './common';
import { type ProductVariant } from './product';

/**
 * Estado del envío de una orden.
 * Cada vez que la admin cambia el estado, se actualiza el documento.
 */
export type OrderStatus =
  | 'pending_payment' // creada, esperando confirmación de MP
  | 'paid' // MP confirmó el pago
  | 'preparing' // admin está preparando el envío
  | 'shipped' // ya despachado
  | 'delivered' // recibido por el cliente
  | 'cancelled'; // cancelada (refund, error, etc)

/**
 * Item dentro de una orden: snapshot del producto al momento de la compra.
 * Importante: NO referenciamos el producto por id, sino que guardamos sus datos.
 * Si después el precio cambia o el producto se elimina, la orden sigue intacta.
 */
export type OrderItem = {
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number; // precio al momento de la compra
  subtotal: number; // unitPrice * quantity
};

/**
 * Datos de envío del cliente.
 */
export type ShippingInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
};

/**
 * Orden completa.
 */
export type Order = BaseDocument & {
  userId: string; // UID del usuario que compró
  items: OrderItem[];
  shipping: ShippingInfo;
  shippingCost: number;
  subtotal: number; // suma de los items
  total: number; // subtotal + shippingCost
  status: OrderStatus;
  paymentId?: string; // ID de Mercado Pago cuando se confirme
  paidAt?: Timestamp; // cuándo se pagó
  trackingNumber?: string; // si la admin agrega tracking del envío
  notes?: string; // notas internas del admin
};
