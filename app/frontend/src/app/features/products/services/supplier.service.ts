import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '../../../core/types/providers/environment-config';
import { SupplierDto } from '../../../core/types/dtos/supplier.dto';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly httpClient = inject(HttpClient);
  private readonly environmentConfig = inject(EnvironmentConfig);

  readonly suppliers = signal<SupplierDto[] | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll() {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.httpClient
      .get<SupplierDto[]>(`${this.environmentConfig.apiUrl}/products/suppliers`)
      .pipe(take(1))
      .subscribe({
        next: (suppliers) => {
          this.suppliers.set(suppliers);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load suppliers. Please try again.');
          this.isLoading.set(false);
        },
      });
  }
}
