import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppRoutes } from '../../../core/types/routing/app-routes';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  const router = inject(Router);

  return router.createUrlTree(['/', AppRoutes.Auth.root, AppRoutes.Auth.features.login]);
};
