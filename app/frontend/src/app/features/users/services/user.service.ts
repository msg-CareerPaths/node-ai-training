import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '../../../core/types/providers/environment-config';
import { UserDto } from '../../../core/types/dtos/user.dto';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly environmentConfig = inject(EnvironmentConfig);

  readonly users = signal<UserDto[] | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  loadAll() {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.httpClient
      .get<UserDto[]>(`${this.environmentConfig.apiUrl}/users`)
      .pipe(take(1))
      .subscribe({
        next: (users) => {
          this.users.set(users);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load users. Please try again.');
          this.isLoading.set(false);
        },
      });
  }

  delete(id: string) {
    this.error.set(null);

    return this.httpClient.delete<void>(`${this.environmentConfig.apiUrl}/users/${id}`).pipe(
      tap(() => {
        this.users.update((current) => {
          if (!current) {
            return current;
          }

          const next = current.filter((user) => user.id !== id);

          return next.length ? next : null;
        });
      }),
    );
  }
}
