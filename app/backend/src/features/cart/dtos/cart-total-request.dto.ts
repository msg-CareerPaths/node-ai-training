import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CartItemDto } from './cart-item.dto';

export class CartTotalRequestDto {
    @ApiProperty({
        description: 'List of items in the cart',
        type: CartItemDto,
        isArray: true
    })
    @ValidateNested({ each: true })
    @Type(() => CartItemDto)
    items: CartItemDto[];
}
