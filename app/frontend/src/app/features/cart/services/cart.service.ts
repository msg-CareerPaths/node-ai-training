import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '../../../core/types/providers/environment-config';
import {
  CartItemDto,
  CartTotalRequestDto,
  CartTotalResponseDto,
} from '../../../core/types/dtos/cart.dto';
import { ProductDto } from '../../../core/types/dtos/product.dto';
import { OrderDto } from '../../../core/types/dtos/order.dto';
import { take } from 'rxjs';

export interface CartItemView {
  product: ProductDto;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly environmentConfig = inject(EnvironmentConfig);

  readonly items = signal<CartItemView[]>([]);
  readonly total = signal<number>(0);

  readonly isCalculating = signal(false);
  readonly calculateError = signal<string | null>(null);

  readonly isCheckingOut = signal(false);
  readonly checkoutError = signal<string | null>(null);

  addProduct(product: ProductDto, quantity = 1) {
    this.items.update((current) => {
      const existingIndex = current.findIndex((item) => item.product.id === product.id);

      if (existingIndex === -1) {
        return [...current, { product, quantity }];
      }

      const next = [...current];
      next[existingIndex] = {
        product: next[existingIndex].product,
        quantity: next[existingIndex].quantity + quantity,
      };

      return next;
    });

    this.recalculateLocalTotal();
  }

  removeProduct(productId: string) {
    this.items.update((current) => current.filter((item) => item.product.id !== productId));
    this.recalculateLocalTotal();
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }

    this.items.update((current) => {
      return current.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
    });

    this.recalculateLocalTotal();
  }

  clear() {
    this.items.set([]);
    this.total.set(0);
    this.calculateError.set(null);
    this.checkoutError.set(null);
  }

  private buildCartPayload(): CartTotalRequestDto {
    const items: CartItemDto[] = this.items().map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    return { items };
  }

  calculateTotal() {
    if (this.isCalculating()) {
      return;
    }

    this.isCalculating.set(true);
    this.calculateError.set(null);

    const payload = this.buildCartPayload();

    this.httpClient
      .post<CartTotalResponseDto>(`${this.environmentConfig.apiUrl}/cart/total`, payload)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.total.set(response.total);
          this.isCalculating.set(false);
        },
        error: () => {
          this.calculateError.set('Failed to calculate cart total. Please try again.');
          this.isCalculating.set(false);
        },
      });
  }

  checkout() {
    if (this.isCheckingOut()) {
      return;
    }

    this.isCheckingOut.set(true);
    this.checkoutError.set(null);

    const payload = this.buildCartPayload();

    return this.httpClient
      .post<OrderDto>(`${this.environmentConfig.apiUrl}/cart/checkout`, payload)
      .pipe(take(1));
  }

  private recalculateLocalTotal() {
    const nextTotal = this.items().reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    this.total.set(nextTotal);
  }
}
