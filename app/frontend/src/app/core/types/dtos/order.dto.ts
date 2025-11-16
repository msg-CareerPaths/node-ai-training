export interface OrderItemDto {
  id: string;
  product: {
    id: string;
    name: string;
    category: string;
    image: string;
    price: number;
    description: string;
  };
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderDto {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItemDto[];
}

export interface UpdateOrderStatusDto {
  status: string;
}
