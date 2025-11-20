import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-modal',
  imports: [
    DialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './generate-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateModalComponent {
  private readonly dialogRef = inject(DialogRef<string | null>);
  readonly description = signal('');

  protected updateDescription(value: string): void {
    this.description.set(value);
  }

  protected close(): void {
    this.dialogRef.close(null);
  }

  protected submit(): void {
    // submission logic will be added later
    this.dialogRef.close(this.description());
  }
}
