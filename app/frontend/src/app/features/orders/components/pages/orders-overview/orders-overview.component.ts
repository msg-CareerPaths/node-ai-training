import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderService } from '../../../services/order.service';
import { AppRoutes } from '../../../../../core/types/routing/app-routes';
import { AuthService } from '../../../../auth/services/auth.service';
import { UserRole } from '../../../../../core/types/enums/user-roles.enum';
import { take } from 'rxjs';

@Component({
  selector: 'app-orders-overview',
  imports: [
    DatePipe,
    CurrencyPipe,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './orders-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersOverviewComponent implements OnInit {
  readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  readonly isAdmin = signal(false);

  readonly orders = this.orderService.orders.asReadonly();
  readonly isLoading = this.orderService.isLoading.asReadonly();
  readonly error = this.orderService.error.asReadonly();

  readonly displayedColumns = ['id', 'createdAt', 'totalPrice', 'status', 'actions'];

  ngOnInit(): void {
    this.authService
      .loadProfileIfNeeded()
      .pipe(take(1))
      .subscribe((user) => {
        const isAdmin = !!user?.roles?.includes(UserRole.Admin);
        this.isAdmin.set(isAdmin);

        if (isAdmin) {
          this.orderService.loadAll();
        } else {
          this.orderService.loadMy();
        }
      });
  }

  onReload() {
    if (this.isAdmin()) {
      this.orderService.loadAll();
    } else {
      this.orderService.loadMy();
    }
  }

  getDetailsLink(orderId: string) {
    return ['/', AppRoutes.Orders.root, AppRoutes.Orders.features.details, orderId];
  }
}
