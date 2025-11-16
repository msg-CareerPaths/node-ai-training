import { Routes } from '@angular/router';
import { RootLayoutComponent } from '../../core/components/containers/root-layout/root-layout.component';
import { authGuard } from '../auth/guards/auth.guard';
import { rolesGuard } from '../auth/guards/roles.guard';
import { AppRoutes } from '../../core/types/routing/app-routes';
import { UserRole } from '../../core/types/enums/user-roles.enum';

export const UserRoutes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: AppRoutes.Users.features.overview,
        canActivate: [rolesGuard],
        data: { roles: [UserRole.Admin] },
        loadComponent: () =>
          import('./components/pages/users-overview/users-overview.component').then(
            (mod) => mod.UsersOverviewComponent,
          ),
      },
    ],
  },
];
