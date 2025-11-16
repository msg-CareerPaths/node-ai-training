import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { ReportService } from '../../../services/report.service';
import { ReportType } from '../../../../../core/types/enums/report-type.enum';
import { ReportKind } from '../../../../../core/types/enums/report-kind.enum';
import { AppRoutes } from '../../../../../core/types/routing/app-routes';
import { take } from 'rxjs';
import {
  extractFilenameFromDisposition,
  triggerFileDownloadFromBlob,
} from '../../../utils/download-report.util';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report-generate',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './report-generate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportGenerateComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly reportService = inject(ReportService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly isSubmitting = signal(false);
  readonly error = signal<string | null>(null);

  readonly formats = Object.values(ReportType);
  readonly kinds = Object.values(ReportKind);

  readonly form = this.formBuilder.group({
    format: [ReportType.Pdf, [Validators.required]],
    reportType: [ReportKind.Revenue, [Validators.required]],
  });

  readonly reportsOverviewLink = ['/', AppRoutes.Reports.root, AppRoutes.Reports.features.overview];

  onSubmit() {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);

    const payload = this.form.getRawValue();

    const request$ = this.reportService.generate({
      format: payload.format,
      reportType: payload.reportType,
    });

    if (!request$) {
      this.isSubmitting.set(false);
      return;
    }

    request$.pipe(take(1)).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);

        const disposition = response.headers.get('Content-Disposition');
        const filename = extractFilenameFromDisposition(disposition, `report.${payload.format}`);

        const blob = response.body ?? new Blob();
        triggerFileDownloadFromBlob(blob, filename);
        this.snackBar.open('Report was generated', undefined, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigate(this.reportsOverviewLink);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.error.set('Failed to generate report. Please try again.');
      },
    });
  }
}
