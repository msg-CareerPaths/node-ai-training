export interface CartItemDto {
  productId: string;
  quantity: number;
}

export interface CartTotalRequestDto {
  items: CartItemDto[];
}

export interface CartTotalResponseDto {
  total: number;
}
