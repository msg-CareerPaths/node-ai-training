import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WalkthroughService } from '../../../services/walkthrough.service';

@Component({
  selector: 'app-walkthrough-overview',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './walkthrough-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalkthroughOverviewComponent implements OnInit {
  private readonly walkthroughService = inject(WalkthroughService);

  readonly files = this.walkthroughService.files.asReadonly();
  readonly isLoading = this.walkthroughService.isLoading.asReadonly();
  readonly error = this.walkthroughService.error.asReadonly();
  readonly downloadError = this.walkthroughService.downloadError.asReadonly();

  ngOnInit(): void {
    this.walkthroughService.loadFiles();
  }

  onReload() {
    this.walkthroughService.loadFiles();
  }

  onDownload(filename: string) {
    this.walkthroughService.downloadFile(filename);
  }
}
