import { SupplierDto } from './supplier.dto';

export interface ProductDto {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  supplierId: string;
  supplier: SupplierDto;
}

export interface CreateProductDto {
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  supplierId: string;
}

export interface UpdateProductDto {
  name?: string;
  category?: string;
  image?: string;
  price?: number;
  description?: string;
  supplierId?: string;
}
