import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../../services/product.service';
import { ProductCategory } from '../../../../../core/types/enums/product-category.enum';
import { AppRoutes } from '../../../../../core/types/routing/app-routes';
import { CreateProductDto, UpdateProductDto } from '../../../../../core/types/dtos/product.dto';
import { take } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { GenerateModalComponent } from '../../modals/generate-modal.component';

@Component({
  selector: 'app-product-form-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    DialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './product-form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormPageComponent implements OnInit {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(Dialog);

  readonly isSubmitting = signal(false);
  readonly isLoadingProduct = signal(false);
  readonly loadError = signal<string | null>(null);

  readonly productId = signal<string | null>(null);

  readonly categories = Object.values(ProductCategory);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    category: ['', [Validators.required]],
    image: ['', [Validators.required, Validators.maxLength(2048)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  readonly isEditMode = computed(() => this.productId() !== null);

  readonly productsOverviewLink = [
    '/',
    AppRoutes.Products.root,
    AppRoutes.Products.features.overview,
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.productId.set(id);
    this.loadProduct(id);
  }

  private loadProduct(id: string) {
    this.isLoadingProduct.set(true);
    this.loadError.set(null);

    this.productService
      .findOne(id)
      .pipe(take(1))
      .subscribe({
        next: (product) => {
          this.isLoadingProduct.set(false);

          this.form.patchValue({
            name: product.name,
            category: product.category,
            image: product.image,
            price: product.price,
            description: product.description,
          });
        },
        error: () => {
          this.isLoadingProduct.set(false);
          this.loadError.set('Failed to load product. Please try again.');
        },
      });
  }

  onSubmit() {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    if (this.isEditMode()) {
      this.editProduct();
      return;
    }
    this.createProduct();
  }

  protected onGenerate(): void {
    this.dialog.open(GenerateModalComponent, {
      height: '400px',
      width: '600px',
      disableClose: true,
    });
  }

  private editProduct(): void {
    const rawValue = this.form.getRawValue();
    const id = this.productId();

    if (!id) {
      this.isSubmitting.set(false);
      return;
    }

    const payload: UpdateProductDto = {
      name: rawValue.name,
      category: rawValue.category,
      image: rawValue.image,
      price: rawValue.price,
      description: rawValue.description,
    };

    this.productService
      .update(id, payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.snackBar.open('Product was updated', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.router.navigate(this.productsOverviewLink);
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
  }

  private createProduct(): void {
    const rawValue = this.form.getRawValue();
    const payload: CreateProductDto = {
      name: rawValue.name,
      category: rawValue.category,
      image: rawValue.image,
      price: rawValue.price,
      description: rawValue.description,
    };

    this.productService
      .create(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.snackBar.open('Product was created', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.router.navigate(this.productsOverviewLink);
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
  }
}
