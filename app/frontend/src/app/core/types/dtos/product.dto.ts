export interface ProductDto {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

export interface CreateProductDto {
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

export interface UpdateProductDto {
  name?: string;
  category?: string;
  image?: string;
  price?: number;
  description?: string;
}
