import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '../../../core/types/providers/environment-config';
import { OrderDto, UpdateOrderStatusDto } from '../../../core/types/dtos/order.dto';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly httpClient = inject(HttpClient);
  private readonly environmentConfig = inject(EnvironmentConfig);

  readonly orders = signal<OrderDto[] | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly isUpdatingStatus = signal(false);
  readonly updateStatusError = signal<string | null>(null);

  loadAll() {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.httpClient
      .get<OrderDto[]>(`${this.environmentConfig.apiUrl}/orders`)
      .pipe(take(1))
      .subscribe({
        next: (orders) => {
          this.orders.set(orders);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load orders. Please try again.');
          this.isLoading.set(false);
        },
      });
  }

  loadMy() {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.httpClient
      .get<OrderDto[]>(`${this.environmentConfig.apiUrl}/orders/my`)
      .pipe(take(1))
      .subscribe({
        next: (orders) => {
          this.orders.set(orders);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load orders. Please try again.');
          this.isLoading.set(false);
        },
      });
  }

  findOne(id: string) {
    return this.httpClient.get<OrderDto>(`${this.environmentConfig.apiUrl}/orders/${id}`).pipe(
      take(1),
      tap((order) => {
        this.orders.update((current) => {
          if (!current) {
            return [order];
          }

          const existingIndex = current.findIndex((o) => o.id === order.id);

          if (existingIndex === -1) {
            return [...current, order];
          }

          const next = [...current];
          next[existingIndex] = order;

          return next;
        });
      }),
    );
  }

  updateStatus(id: string, payload: UpdateOrderStatusDto) {
    if (this.isUpdatingStatus()) {
      return;
    }

    this.isUpdatingStatus.set(true);
    this.updateStatusError.set(null);

    return this.httpClient
      .patch<OrderDto>(`${this.environmentConfig.apiUrl}/orders/${id}/status`, payload)
      .pipe(
        take(1),
        tap({
          next: (updated) => {
            this.orders.update((current) => {
              if (!current) {
                return [updated];
              }

              return current.map((order) => (order.id === updated.id ? updated : order));
            });
            this.isUpdatingStatus.set(false);
          },
          error: () => {
            this.updateStatusError.set('Failed to update order status. Please try again.');
            this.isUpdatingStatus.set(false);
          },
        }),
      );
  }
}
