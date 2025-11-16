import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { HasRoleDirective } from '../../../../auth/directives/has-role.directive';
import { UserRole } from '../../../../../core/types/enums/user-roles.enum';
import { AppRoutes } from '../../../../../core/types/routing/app-routes';
import { CartService } from '../../../../cart/services/cart.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-products-overview',
  imports: [
    CurrencyPipe,
    RouterLink,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HasRoleDirective,
  ],
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsOverviewComponent implements OnInit {
  readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);

  readonly products = this.productService.products.asReadonly();
  readonly isLoading = this.productService.isLoading.asReadonly();
  readonly error = this.productService.error.asReadonly();
  readonly UserRole = UserRole;

  readonly createLink = ['/', AppRoutes.Products.root, AppRoutes.Products.features.create];

  getEditLink(productId: string) {
    return ['/', AppRoutes.Products.root, AppRoutes.Products.features.update, productId];
  }

  onBuy(productId: string) {
    const currentProducts = this.products();
    const product = currentProducts?.find((p) => p.id === productId);

    if (!product) {
      return;
    }

    this.cartService.addProduct(product, 1);

    this.snackBar.open('Product added to cart', undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  onDelete(productId: string) {
    this.productService
      .delete(productId)
      .pipe(take(1))
      .subscribe(() => {
        this.snackBar.open('Product was removed', undefined, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      });
  }

  ngOnInit(): void {
    this.productService.loadAll();
  }
}
