import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { EnvironmentConfig } from '../../../core/types/providers/environment-config';
import { WalkthroughFileListDto } from '../../../core/types/dtos/walkthrough.dto';

@Injectable({
  providedIn: 'root',
})
export class WalkthroughService {
  private readonly httpClient = inject(HttpClient);
  private readonly environmentConfig = inject(EnvironmentConfig);

  readonly files = signal<string[] | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly downloadError = signal<string | null>(null);

  loadFiles() {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.httpClient
      .get<WalkthroughFileListDto>(`${this.environmentConfig.apiUrl}/walkthrough/files`)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          const sorted = [...response.files].sort((a, b) => a.localeCompare(b));
          this.files.set(sorted);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load walkthrough files. Please try again.');
          this.isLoading.set(false);
        },
      });
  }

  downloadFile(filename: string) {
    this.downloadError.set(null);

    this.httpClient
      .get(`${this.environmentConfig.apiUrl}/walkthrough/files/${encodeURIComponent(filename)}`, {
        responseType: 'blob',
      })
      .pipe(take(1))
      .subscribe({
        next: (blob) => this.saveBlobAsFile(blob, filename),
        error: () => {
          this.downloadError.set('Could not download the selected file. Please try again.');
        },
      });
  }

  private saveBlobAsFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
  }
}
