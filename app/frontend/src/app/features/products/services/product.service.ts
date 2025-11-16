import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '../../../core/types/providers/environment-config';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from '../../../core/types/dtos/product.dto';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  private readonly environmentConfig = inject(EnvironmentConfig);

  readonly products = signal<ProductDto[] | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll() {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.httpClient
      .get<ProductDto[]>(`${this.environmentConfig.apiUrl}/products`)
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this.products.set(products);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load products. Please try again.');
          this.isLoading.set(false);
        },
      });
  }

  findOne(id: string) {
    return this.httpClient.get<ProductDto>(`${this.environmentConfig.apiUrl}/products/${id}`);
  }

  create(payload: CreateProductDto) {
    this.error.set(null);

    return this.httpClient
      .post<ProductDto>(`${this.environmentConfig.apiUrl}/products`, payload)
      .pipe(
        tap((created) => {
          this.products.update((current) => {
            if (!current) {
              return [created];
            }

            return [...current, created];
          });
        }),
      );
  }

  update(id: string, payload: UpdateProductDto) {
    this.error.set(null);

    return this.httpClient
      .patch<ProductDto>(`${this.environmentConfig.apiUrl}/products/${id}`, payload)
      .pipe(
        take(1),
        tap((updated) => {
          this.products.update((current) => {
            if (!current) {
              return [updated];
            }

            return current.map((product) => (product.id === updated.id ? updated : product));
          });
        }),
      );
  }

  delete(id: string) {
    this.error.set(null);

    return this.httpClient.delete<void>(`${this.environmentConfig.apiUrl}/products/${id}`).pipe(
      take(1),
      tap(() => {
        this.products.update((current) => {
          if (!current) {
            return current;
          }

          const next = current.filter((product) => product.id !== id);

          return next.length ? next : [];
        });
      }),
    );
  }
}
