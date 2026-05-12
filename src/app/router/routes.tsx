import { type RouteObject } from 'react-router';

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
import { ErrorPage } from '@/pages/ErrorPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductPage } from '@/pages/ProductPage';

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
