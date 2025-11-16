import { Routes } from '@angular/router';
import { RootLayoutComponent } from '../../core/components/containers/root-layout/root-layout.component';
import { authGuard } from '../auth/guards/auth.guard';
import { AppRoutes } from '../../core/types/routing/app-routes';

export const CartRoutes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: AppRoutes.Cart.features.overview,
        loadComponent: () =>
          import('./components/pages/cart-overview/cart-overview.component').then(
            (mod) => mod.CartOverviewComponent,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.Cart.features.overview,
      },
    ],
  },
];
