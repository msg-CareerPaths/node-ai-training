import { Routes } from '@angular/router';
import { RootLayoutComponent } from '../../core/components/containers/root-layout/root-layout.component';
import { authGuard } from '../auth/guards/auth.guard';
import { rolesGuard } from '../auth/guards/roles.guard';
import { AppRoutes } from '../../core/types/routing/app-routes';
import { UserRole } from '../../core/types/enums/user-roles.enum';

export const ReportRoutes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: AppRoutes.Reports.features.overview,
        canActivate: [rolesGuard],
        data: { roles: [UserRole.Admin] },
        loadComponent: () =>
          import('./components/pages/reports-overview/reports-overview.component').then(
            (mod) => mod.ReportsOverviewComponent,
          ),
      },
      {
        path: AppRoutes.Reports.features.generate,
        canActivate: [rolesGuard],
        data: { roles: [UserRole.Admin] },
        loadComponent: () =>
          import('./components/pages/report-generate/report-generate.component').then(
            (mod) => mod.ReportGenerateComponent,
          ),
      },
    ],
  },
];
