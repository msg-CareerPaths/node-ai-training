import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { AppRoutes } from '../../../../../core/types/routing/app-routes';
import { take } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  readonly registerLink = ['/', AppRoutes.Auth.root, AppRoutes.Auth.features.register];

  readonly productsOverviewLink = [
    '/',
    AppRoutes.Products.root,
    AppRoutes.Products.features.overview,
  ];

  onSubmit() {
    this.errorMessage.set(null);

    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const credentials = this.form.getRawValue();

    this.authService
      .login(credentials)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.router.navigate(this.productsOverviewLink);
        },
        error: () => {
          this.isSubmitting.set(false);
          this.errorMessage.set('Invalid username or password.');
        },
      });
  }
}
