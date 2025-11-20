import { Routes } from '@angular/router';
import { RootLayoutComponent } from '../../core/components/containers/root-layout/root-layout.component';
import { authGuard } from '../auth/guards/auth.guard';
import { AppRoutes } from '../../core/types/routing/app-routes';

export const WalkthroughRoutes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: AppRoutes.Walkthrough.features.overview,
        loadComponent: () =>
          import('./components/pages/walkthrough-overview/walkthrough-overview.component').then(
            (mod) => mod.WalkthroughOverviewComponent,
          ),
      },
    ],
  },
];
