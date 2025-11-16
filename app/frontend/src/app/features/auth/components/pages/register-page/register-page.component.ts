import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { AppRoutes } from '../../../../../core/types/routing/app-routes';
import { take } from 'rxjs';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.formBuilder.group({
    fullname: ['', [Validators.required, Validators.minLength(1)]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  readonly loginLink = ['/', AppRoutes.Auth.root, AppRoutes.Auth.features.login];

  onSubmit() {
    this.errorMessage.set(null);

    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const payload = this.form.getRawValue();

    this.authService
      .register(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
        },
        error: () => {
          this.isSubmitting.set(false);
          this.errorMessage.set('Unable to create account. Please try again.');
        },
      });
  }
}
