import { Navigate, type RouteObject } from 'react-router';

import { AdminLayout } from '@/app/layouts/AdminLayout';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import { AdminRoute } from '@/app/router/guards/AdminRoute';
import { ProtectedRoute } from '@/app/router/guards/ProtectedRoute';
import { PublicOnlyRoute } from '@/app/router/guards/PublicOnlyRoute';
import {
  AdminCategoriesPage,
  AdminDashboardPage,
  AdminOrdersPage,
  AdminProductsPage,
  AdminSettingsPage,
} from '@/app/router/lazyPages';

import { AccountPage } from '@/pages/AccountPage';
import { CartPage } from '@/pages/CartPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { ComponentsPage } from '@/pages/dev/ComponentsPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { HomePage } from '@/pages/HomePage';
import { PrivacyPage, ReturnsPage, ShippingPage, TermsPage, WithdrawalPage } from '@/pages/legal';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductPage } from '@/pages/ProductPage';

/**
 * Determina si la página interna `/dev/components` debe ser visible.
 *
 * Visible en:
 *  - Desarrollo local (npm run dev).
 *  - Staging (dora-galiano-develop.web.app).
 *
 * Oculta en:
 *  - Producción (dora-galiano.web.app) → redirige a home.
 *
 * Usamos hostname en runtime porque el build es el mismo para staging y prod
 * (la única diferencia es a qué Firebase Hosting se deploya).
 */
const isDevPageVisible = (): boolean => {
  if (import.meta.env.DEV) return true;
  if (typeof window === 'undefined') return false;
  return !window.location.hostname.includes('dora-galiano.web.app');
};

export const routes: RouteObject[] = [
  // Sitio público
  {
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/catalogo', element: <CatalogPage /> },
      { path: '/producto/:slug', element: <ProductPage /> },
      { path: '/carrito', element: <CartPage /> },

      // Páginas legales
      { path: '/terminos', element: <TermsPage /> },
      { path: '/privacidad', element: <PrivacyPage /> },
      { path: '/envios', element: <ShippingPage /> },
      { path: '/cambios', element: <ReturnsPage /> },
      { path: '/arrepentimiento', element: <WithdrawalPage /> },

      // Página interna del design system (oculta en producción)
      {
        path: '/dev/components',
        element: isDevPageVisible() ? <ComponentsPage /> : <Navigate to="/" replace />,
      },
      // Rutas solo para no-logueados
      {
        element: <PublicOnlyRoute />,
        children: [{ path: '/login', element: <LoginPage /> }],
      },
      // Rutas que requieren login
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/checkout', element: <CheckoutPage /> },
          { path: '/cuenta', element: <AccountPage /> },
        ],
      },
      // 404 dentro del layout público (mantiene header/footer)
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  // Admin
  {
    path: '/admin',
    element: <AdminRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'productos', element: <AdminProductsPage /> },
          { path: 'categorias', element: <AdminCategoriesPage /> },
          { path: 'ordenes', element: <AdminOrdersPage /> },
          { path: 'configuracion', element: <AdminSettingsPage /> },
        ],
      },
    ],
  },
];
