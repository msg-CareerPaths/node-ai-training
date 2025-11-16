import { Routes } from '@angular/router';
import { AppRoutes } from '../../core/types/routing/app-routes';
import { guestGuard } from './guards/guest.guard';

export const AuthRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: AppRoutes.Auth.features.login,
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./components/pages/login-page/login-page.component').then(
            (mod) => mod.LoginPageComponent,
          ),
      },
      {
        path: AppRoutes.Auth.features.register,
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./components/pages/register-page/register-page.component').then(
            (mod) => mod.RegisterPageComponent,
          ),
      },
    ],
  },
];
