import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OrderService } from '../../../services/order.service';
import { OrderDto } from '../../../../../core/types/dtos/order.dto';
import { OrderStatus } from '../../../../../core/types/enums/order-status.enum';
import { HasRoleDirective } from '../../../../auth/directives/has-role.directive';
import { UserRole } from '../../../../../core/types/enums/user-roles.enum';
import { take } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-details',
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    HasRoleDirective,
  ],
  templateUrl: './order-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly snackBar = inject(MatSnackBar);

  readonly orders = this.orderService.orders.asReadonly();
  readonly isUpdatingStatus = this.orderService.isUpdatingStatus.asReadonly();
  readonly updateStatusError = this.orderService.updateStatusError.asReadonly();

  readonly UserRole = UserRole;

  readonly order = signal<OrderDto | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly availableStatuses = Object.values(OrderStatus);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Invalid order id.');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const existing = this.orders()?.find((o) => o.id === id) ?? null;

    if (existing) {
      this.order.set(existing);
      this.isLoading.set(false);
      return;
    }

    this.orderService
      .findOne(id)
      .pipe(take(1))
      .subscribe({
        next: (order) => {
          this.order.set(order);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load order. Please try again.');
          this.isLoading.set(false);
        },
      });
  }

  onStatusChange(status: OrderStatus | string) {
    const current = this.order();

    if (!current) {
      return;
    }

    const normalizedStatus = status as OrderStatus;

    this.orderService
      .updateStatus(current.id, { status: normalizedStatus })
      ?.pipe(take(1))
      .subscribe({
        next: (updated) => {
          this.order.set(updated);
          this.snackBar.open('Order status was updated', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        },
      });
  }
}
