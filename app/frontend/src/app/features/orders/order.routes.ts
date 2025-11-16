import { Routes } from '@angular/router';
import { RootLayoutComponent } from '../../core/components/containers/root-layout/root-layout.component';
import { authGuard } from '../auth/guards/auth.guard';
import { AppRoutes } from '../../core/types/routing/app-routes';

export const OrderRoutes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: AppRoutes.Orders.features.overview,
        loadComponent: () =>
          import('./components/pages/orders-overview/orders-overview.component').then(
            (mod) => mod.OrdersOverviewComponent,
          ),
      },
      {
        path: `${AppRoutes.Orders.features.details}/:id`,
        loadComponent: () =>
          import('./components/pages/order-details/order-details.component').then(
            (mod) => mod.OrderDetailsComponent,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.Orders.features.overview,
      },
    ],
  },
];
