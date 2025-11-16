import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CartItemDto {
    @ApiProperty({ description: 'Product identifier', format: 'uuid' })
    @IsUUID()
    productId: string;

    @ApiProperty({
        description: 'Quantity of the product',
        minimum: 1,
        type: Number
    })
    @IsInt()
    @IsPositive()
    quantity: number;
}
