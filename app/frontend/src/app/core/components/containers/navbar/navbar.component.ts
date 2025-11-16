import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { AppRoutes } from '../../../types/routing/app-routes';
import { HasRoleDirective } from '../../../../features/auth/directives/has-role.directive';
import { UserRole } from '../../../types/enums/user-roles.enum';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    HasRoleDirective,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  protected readonly UserRole = UserRole;

  readonly currentUser = computed(() => this.authService.getUser());

  readonly productsLink = ['/', AppRoutes.Products.root, AppRoutes.Products.features.overview];
  readonly cartLink = ['/', AppRoutes.Cart.root, AppRoutes.Cart.features.overview];
  readonly ordersLink = ['/', AppRoutes.Orders.root, AppRoutes.Orders.features.overview];
  readonly usersLink = ['/', AppRoutes.Users.root, AppRoutes.Users.features.overview];
  readonly reportsLink = ['/', AppRoutes.Reports.root, AppRoutes.Reports.features.overview];

  onLogout() {
    this.authService.logout();
  }
}
