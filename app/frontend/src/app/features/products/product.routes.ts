import { Routes } from '@angular/router';
import { RootLayoutComponent } from '../../core/components/containers/root-layout/root-layout.component';
import { authGuard } from '../auth/guards/auth.guard';
import { AppRoutes } from '../../core/types/routing/app-routes';
import { rolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../../core/types/enums/user-roles.enum';

export const ProductRoutes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: AppRoutes.Products.features.overview,
        loadComponent: () =>
          import('./components/pages/products-overview/products-overview.component').then(
            (mod) => mod.ProductsOverviewComponent,
          ),
      },
      {
        path: AppRoutes.Products.features.create,
        canActivate: [rolesGuard],
        loadComponent: () =>
          import('./components/pages/product-form-page/product-form-page.component').then(
            (mod) => mod.ProductFormPageComponent,
          ),
        data: {
          roles: [UserRole.Admin],
        },
      },
      {
        path: `${AppRoutes.Products.features.update}/:id`,
        canActivate: [rolesGuard],
        loadComponent: () =>
          import('./components/pages/product-form-page/product-form-page.component').then(
            (mod) => mod.ProductFormPageComponent,
          ),
        data: {
          roles: [UserRole.Admin],
        },
      },
    ],
  },
];
