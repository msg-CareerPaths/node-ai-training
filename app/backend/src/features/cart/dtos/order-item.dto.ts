import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../products/dtos/product.dto';

export class OrderItemDto {
    @ApiProperty({ description: 'Order item identifier', format: 'uuid' })
    id: string;

    @ApiProperty({
        description: 'Product included in this order item',
        type: ProductDto
    })
    product: ProductDto;

    @ApiProperty({
        description: 'Quantity ordered for this product',
        type: Number
    })
    quantity: number;

    @ApiProperty({
        description: 'Product price at the time of purchase',
        type: Number
    })
    priceAtPurchase: number;
}
