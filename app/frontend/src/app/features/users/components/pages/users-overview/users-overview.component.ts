import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../services/user.service';
import { take } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-overview',
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersOverviewComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);

  readonly users = this.userService.users.asReadonly();
  readonly isLoading = this.userService.isLoading.asReadonly();
  readonly error = this.userService.error.asReadonly();

  readonly displayedColumns = ['username', 'fullname', 'roles', 'actions'];

  ngOnInit(): void {
    this.userService.loadAll();
  }

  onReload() {
    this.userService.loadAll();
  }

  onDelete(userId: string) {
    this.userService
      .delete(userId)
      .pipe(take(1))
      .subscribe(() => {
        this.snackBar.open('User was removed', undefined, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      });
  }
}
