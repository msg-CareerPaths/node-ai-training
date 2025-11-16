import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from '../../../core/types/providers/environment-config';
import { GenerateReportDto, ReportSummaryDto } from '../../../core/types/dtos/report.dto';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly httpClient = inject(HttpClient);
  private readonly environmentConfig = inject(EnvironmentConfig);

  readonly reports = signal<ReportSummaryDto[] | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly isGenerating = signal(false);
  readonly generateError = signal<string | null>(null);

  loadAll() {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.httpClient
      .get<ReportSummaryDto[]>(`${this.environmentConfig.apiUrl}/reports`)
      .pipe(take(1))
      .subscribe({
        next: (reports) => {
          this.reports.set(reports);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load reports. Please try again.');
          this.isLoading.set(false);
        },
      });
  }

  generate(payload: GenerateReportDto) {
    if (this.isGenerating()) {
      return;
    }

    this.isGenerating.set(true);
    this.generateError.set(null);

    return this.httpClient
      .post(`${this.environmentConfig.apiUrl}/reports`, payload, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(take(1));
  }

  download(id: string) {
    return this.httpClient.get(`${this.environmentConfig.apiUrl}/reports/${id}/download`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
