import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { AppRoutes } from '../../../../../core/types/routing/app-routes';
import { take } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-overview',
  imports: [
    CurrencyPipe,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './cart-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartOverviewComponent {
  private readonly cartService = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);

  readonly items = this.cartService.items.asReadonly();
  readonly total = this.cartService.total.asReadonly();

  readonly isCalculating = this.cartService.isCalculating.asReadonly();
  readonly calculateError = this.cartService.calculateError.asReadonly();

  readonly isCheckingOut = this.cartService.isCheckingOut.asReadonly();
  readonly checkoutError = this.cartService.checkoutError.asReadonly();

  readonly displayedColumns = ['product', 'price', 'quantity', 'subtotal', 'actions'];

  readonly productsLink = ['/', AppRoutes.Products.root, AppRoutes.Products.features.overview];

  onIncreaseQuantity(productId: string) {
    const current = this.items().find((item) => item.product.id === productId);
    if (!current) {
      return;
    }

    this.cartService.updateQuantity(productId, current.quantity + 1);
  }

  onDecreaseQuantity(productId: string) {
    const current = this.items().find((item) => item.product.id === productId);
    if (!current) {
      return;
    }

    this.cartService.updateQuantity(productId, current.quantity - 1);
  }

  onRemove(productId: string) {
    this.cartService.removeProduct(productId);
  }

  onCalculateTotal() {
    this.cartService.calculateTotal();
  }

  onCheckout() {
    const checkout$ = this.cartService.checkout();

    if (!checkout$) {
      return;
    }

    checkout$.pipe(take(1)).subscribe({
      next: () => {
        this.cartService.clear();

        this.snackBar.open('Order was created', undefined, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      error: () => {
        this.cartService.checkoutError.set('Failed to checkout cart. Please try again.');
        this.cartService.isCheckingOut.set(false);
      },
    });
  }
}
