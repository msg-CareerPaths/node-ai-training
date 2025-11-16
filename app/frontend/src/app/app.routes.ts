import { Routes } from '@angular/router';
import { AppRoutes } from './core/types/routing/app-routes';

export const routes: Routes = [
  {
    path: AppRoutes.Auth.root,
    loadChildren: () => import('./features/auth/auth.routes').then((mod) => mod.AuthRoutes),
  },
  {
    path: AppRoutes.Products.root,
    loadChildren: () =>
      import('./features/products/product.routes').then((mod) => mod.ProductRoutes),
  },
  {
    path: AppRoutes.Cart.root,
    loadChildren: () => import('./features/cart/cart.routes').then((mod) => mod.CartRoutes),
  },
  {
    path: AppRoutes.Orders.root,
    loadChildren: () => import('./features/orders/order.routes').then((mod) => mod.OrderRoutes),
  },
  {
    path: AppRoutes.Users.root,
    loadChildren: () => import('./features/users/user.routes').then((mod) => mod.UserRoutes),
  },
  {
    path: AppRoutes.Reports.root,
    loadChildren: () => import('./features/reports/report.routes').then((mod) => mod.ReportRoutes),
  },
  {
    path: '**',
    redirectTo: `${AppRoutes.Products.root}/${AppRoutes.Products.features.overview}`,
  },
];
