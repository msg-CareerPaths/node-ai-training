import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ReportService } from '../../../services/report.service';
import { AppRoutes } from '../../../../../core/types/routing/app-routes';
import {
  extractFilenameFromDisposition,
  triggerFileDownloadFromBlob,
} from '../../../utils/download-report.util';
import { take } from 'rxjs';

@Component({
  selector: 'app-reports-overview',
  imports: [
    DatePipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ],
  templateUrl: './reports-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsOverviewComponent implements OnInit {
  readonly reportService = inject(ReportService);

  readonly reports = this.reportService.reports.asReadonly();
  readonly isLoading = this.reportService.isLoading.asReadonly();
  readonly error = this.reportService.error.asReadonly();

  readonly displayedColumns = ['filename', 'type', 'reportKind', 'createdAt', 'actions'];

  readonly generateLink = ['/', AppRoutes.Reports.root, AppRoutes.Reports.features.generate];

  ngOnInit(): void {
    this.reportService.loadAll();
  }

  onReload() {
    this.reportService.loadAll();
  }

  onDownload(reportId: string, filename: string) {
    this.reportService
      .download(reportId)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          const disposition = response.headers.get('Content-Disposition');
          const resolvedFilename = extractFilenameFromDisposition(disposition, filename);

          const blob = response.body ?? new Blob();
          triggerFileDownloadFromBlob(blob, resolvedFilename);
        },
      });
  }
}
